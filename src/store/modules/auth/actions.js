import firebase from 'firebase'

export default {
  updateUserIsLogged(context) {
    context.commit('setUserIsLogged', {
      userIsLogged: firebase.auth().currentUser ? true : false
    })
  },

  login(context, payload) {
    // note: user does not provide e-mail adrress, he/she actually uses password only and e-mail address is hardcoded for all users (kind of anonymous authentication)
    // after user logged in user is asked for selecting his/her name from the list of users
    const emailHardcoded = 'anonymous@unikovka-a5751.web.app' // password for all users hardcoded
    const password = payload.password; // coming from login form

    return new Promise ((resolve, reject) => {
      firebase.auth()
        .signInWithEmailAndPassword(emailHardcoded, password)
        .then(() => {
          context.commit('setUserIsLogged', {
            userIsLogged: true
          })
          resolve()
        })
        .catch((err) => {
          if (err.message && err.message === 'The password is invalid or the user does not have a password.') {
            err.message = 'Nesprávné heslo.'
          } else if (err.message) {
            err.message = 'Chyba při přihlášení. Zkuste to prosím za chvíli. Popis chyby: ' + err.message
          }
          reject(err)        
        })
    });
  },

  setActiveUser(context, payload) {
    context.commit('setActiveUser', payload)
    // console.log(payload, 'active user')
    // @todo: set local storage for future quick selection
  },

  resetActiveUser(context) {
    context.commit('setActiveUser', null)
  },

  // get list of users (which user then can select his/her choice from)
  getListOfUsers(context) {
    return new Promise ((resolve) => {
      firebase.database().ref('classes').once('value', (snapshot) => {
        const data = snapshot.val()

        // to parse data
        const formData = [];
        for (const classId in data) {
            const formDataItem = {
                id: classId,
                className: data[classId].className,
                teacher: data[classId].teacher,
                students: []
            };
            const studentsData = [];
            for (const studentId in data[classId].students) {
                studentsData.push({
                    id: studentId,
                    firstName: data[classId].students[studentId]['first-name'],
                    gender: data[classId].students[studentId].gender,
                    greeting: data[classId].students[studentId].greeting,
                    lastName: data[classId].students[studentId].lastname,
                    className: data[classId].className
                })
            }
            formDataItem.students = studentsData.sort((a, b) => {
                if(a.firstName < b.firstName) { return -1 }
                if(a.firstName > b.firstName) { return 1 }
                return 0
            })
            formData.push(formDataItem)
        }

        context.commit('setListOfUsers', {
            schoolClasses: formData.sort((a, b) => {
                if(a.className < b.className) { return -1 }
                if(a.className > b.className) { return 1 }
                return 0
            })
        })

        resolve()
      })
    })
  },

  // @todo logout
  logout(context) {
    return new Promise ((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        context.commit('userIsLogged', {
          userIsLogged: false
        })
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
};
