import { evaluate } from 'mathjs'

/* ----------------

  * inputVariables is a matrix (array of arrays) of objects used to generate 'random' gameplay for players:
  inputVariables: [
        
    * array of arrays of sets:
        [
          * these are three arrays of 'input' variable sets (just one random array will be used):
          {varX: 210000, varY: 21}, // one set of game 'input' variables
          {varX: 22000, varY: 22}, // another set of game input variables
          {varX: 'randomInt(1,25)', varY: 15} // set of variables with a variable defined as random number
        ], [
          * this is just one set of variables=constants (one set = one set will be used):
          { constA: 15, constB: 15, percentageDownAgain: 12 }
        ], [
          * one random set of these sets will be used:
          {familyNameA: '"Novák"', familyNameB: '"Dvořák"'},
          {familyNameA: '"Lindström"', familyNameB: '"Bergström"'},
        ]
      ],
    * note:
        * the first array level is used in order to have as many sets of values as you wish (all items from inputVariables array will be used)
        * the second level is used as a source for random selection of this set (just one random item of inputVariables[i] is used)
        * all key value pairs from the third level (the object) will be used, all from: inputVariables[i][random]

  * helpers are used one by one in order to provide 'helper' variables for the gameplay
  helpers: [
        {helper1: `varX / 1000`}, // some 'helper' variable which has access to all inputVariables
        {helper2: `varY * helper1`}, // another 'helper' variable which has access to all previously defined helpers or inputVariables
        {hlpWithSpecName: `varX / varY`}
      ],

      ...

  ----------------*/

export default function parse(data) {

    // replace {variables} with the variables provided
    const parseText = function(txt, variables) {
      return txt.replace(new RegExp("{([^{]+)}", "g"), function(_, varName){
          return variables[varName]
      })
    }

    // method to fill assignmentContext object by key/value pairs
    const assignKeyValuePairs = (keyValuePairs, assignmentContext) => {
      for (const property in keyValuePairs) {
        assignmentContext[property] = evaluate(
          keyValuePairs[property],
          assignmentContext
        )
      }
    }

    const generateOptionsArray = (options, assignmentContext, numberOfOptions = 2) => {
      const optionsArray = []
      let i = 0
      // console.log(options, 'options')
      // iterate this while loop until the array is full of items or until two more times
      while (optionsArray.length < numberOfOptions && i < numberOfOptions + 2) {
        const option = evaluate(
          options, // options should contain randInt function in order to generate different values in each while loop
          assignmentContext
        )
        if (!optionsArray.includes(option)) {
          optionsArray.push(option)
        }
      }
      // console.log(optionsArray, 'optionsArray')
      return optionsArray
    }

    // to parse ONE gameRound
    const parseGameRound = gameRound => {

          // all variables comming to this big object:
          const assignmentContext = {}
          
          // to parse input variables
          gameRound.inputVariables.forEach(value => {
            const randomIndex = Math.floor(Math.random() * value.length)
            assignKeyValuePairs(value[randomIndex], assignmentContext)
          })

          // to parse helpers
          gameRound.helpers.forEach(value => {
            assignKeyValuePairs(value, assignmentContext)
          })

          // to parse solution
          assignmentContext['solution'] = evaluate(
            gameRound.solution, assignmentContext
          )

          const options = generateOptionsArray(
            gameRound.options, assignmentContext
          )
          // insert correct option into random positions of the array:
          options.splice(Math.floor(Math.random() * (options.length + 1)), 0, assignmentContext.solution)
          assignmentContext['options'] = options

          // to parse texts
          assignmentContext['assignmentText'] = parseText(
            gameRound.assignmentText, assignmentContext
          )
          assignmentContext['adviseText'] = parseText(
            gameRound.adviseText, assignmentContext
          )
          assignmentContext['solutionText'] = parseText(
            gameRound.solutionText, assignmentContext
          )

          return assignmentContext
    }

    try {

          const gameRounds = []

          // to parse ALL game rounds
          data.forEach(gameRound => {
            gameRounds.push(
              parseGameRound(gameRound)
            )
          })

          return gameRounds

    } catch (err) {

          // @todo handle error
          console.log(err)
          
    }
    
  }