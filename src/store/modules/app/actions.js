import firebase from 'firebase'

// @todo avoid hardcoded sample data
import sampleData from './sample-data.js'
import parse from './sample-data-parser.js'
import {GOOD_TIME_LIMIT} from './const.js'

// @todo refactor / split this code into smaller pieces/functions

export default {
  getGameSettings(context) {
    return new Promise (resolve => {

      // if game settings is already set, just resolve the promise
      if (context.getters.gameSettings && context.getters.gameSettings.activeGameId) {
        resolve()
      }

      // get active game id for this week
      firebase.database().ref('settings').once('value', (snapshot) => {
        const data = snapshot.val()
        context.commit('setGameSettings', data)
        resolve()
      })

    })
  },

  getGameData(context) {
    return new Promise ((resolve, reject) => {

      // get game settings first, then process get game data
      context.dispatch('getGameSettings')
        .then(() => {
          firebase.database().ref('games/' + context.getters.gameSettings.activeGameId).once('value', (snapshot) => {
            const dataGame = snapshot.val()
            
            dataGame.gameId = context.getters.gameSettings.activeGameId
            dataGame.gameRounds = parse( sampleData.gameRounds )

            context.commit('setGameData', dataGame)
            resolve()
          })
        })
        .catch(err => reject(err))
    })
  },

  saveGameResults(context, payload) {
    return new Promise ((resolve, reject) => {

      const gameId = context.getters.gameSettings.activeGameId // active game

      const newGameResultKey = firebase.database().ref().child('game-tesults/' + gameId).push().key
      const newDetailResultKey = firebase.database().ref().child('game-result-details').push().key

      const resultPayload = {
        userName: context.getters.userName,
        className: context.getters.userClassName,
        totalTime: payload.totalTime,
        userId: context.getters.activeUser.id,
        [newDetailResultKey]: true
      }

      const detailResultPayload = {
        ...payload, // @todo split, verify
        user: context.getters.activeUser, // active user
        timestamp: Date.now() // timestamp @todo sure, manage on server
      }

      const updates = {}
      updates['/game-results/' + gameId + '/' + newGameResultKey] = resultPayload
      updates['/game-result-details/' + newDetailResultKey] = detailResultPayload

      firebase.database().ref().update(updates, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })

    })
  },

  getGameResults(context) {
    return new Promise ((resolve, reject) => {

      // get game settings first, then process get game results
      context.dispatch('getGameSettings')
        .then(() => {
          firebase.database().ref('game-results/' + context.getters.gameSettings.activeGameId)
            .orderByChild('totalTime')
            .once('value', (snapshot) => {

              const goodGameResults = []
              const badGameResults = []
              const userIdsParsed = [] // list of user IDs whose result item is already included in the result list

              snapshot.forEach(function(childSnapshot) {
                  const key = childSnapshot.key;
                  const childData = childSnapshot.val();

                  // parse the snapshot only if no other user's snapshot exists yet
                  if (!userIdsParsed.includes(childData.userId)) {
                    if (childData.totalTime && childData.totalTime < GOOD_TIME_LIMIT) {
                      goodGameResults.push({
                        ...childData,
                        id: key,
                        order: goodGameResults.length+1
                      })                
                    } else {
                      badGameResults.splice(
                        Math.floor(Math.random() * (badGameResults.length + 1)),
                        0, {
                          ...childData,
                          id: key
                        }
                      )
                    }
                    userIdsParsed.push(childData.userId)
                  }
              })

              context.commit('setGoodGameResults', goodGameResults)
              context.commit('setBadGameResults', badGameResults)
              
              resolve()
            })
        })
        .catch(err => reject(err))
    })
  },
};
