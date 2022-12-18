import { initializeApp } from 'firebase/app';
import { 
   getFirestore, collection, getDocs, onSnapshot,
   addDoc, deleteDoc, doc,
   query, where,
   orderBy,
   getDoc,
   updateDoc
} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAZSGbD28li62ZkAL7Dq3aer0SH7Yktddw",
    authDomain: "fir-dojo-a1e15.firebaseapp.com",
    projectId: "fir-dojo-a1e15",
    storageBucket: "fir-dojo-a1e15.appspot.com",
    messagingSenderId: "719627692061",
    appId: "1:719627692061:web:9ca0282bec71d8e55b7ef4"
};



//init firebase
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

//collection ref to a particular collection
const collectRef = collection(db, 'books')


//queries

const q = query(collectRef)

//get collection data not real time
// getDocs(collectRef)
//    .then((snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({
//             ...doc.data(), id: doc.id
//         })
//     })
//     console.log(books)
//    }).catch(err => {
//     console.log(err)
//    })

//get collection data real-time

onSnapshot(q, (snapshot) => {
   let books = []
   snapshot.docs.forEach((doc) => {
    books.push({
        ...doc.data(),
        id: doc.id
    })
   })
   console.log(books)
})

//get realtime snapshot when a particular query is fired

// onSnapshot(q, (snapshot) => {
//     const books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({
//            ...doc.data(),
//            id: doc.id
//         })
//     })
//     console.log(books)
// })


//getting a single document
const docRef = doc(db, 'books', 'HWMUbjvZ5haLMTNB4IfH')
// getDoc(docRef)
//    .then(doc => {
//     console.log(doc.data(), doc.id)
//    })

//subscribing to a single document
onSnapshot(docRef, (doc) => {
   console.log(doc.data(), doc.id)
})

//adding documents
const addBooksForm = document.querySelector(".add")
addBooksForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(collectRef, {
        title: addBooksForm.title.value,
        author: addBooksForm.author.value
    }).then(() => {
        addBooksForm.reset()
    })
})


//deleting books
const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", e => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
       .then(() => {
        deleteBookForm.reset()
       })
})


//updating documents
const updateForm = document.querySelector(".update")
updateForm.addEventListener("submit", e => {
    e.preventDefault()

    const docRef = doc(db, "books", updateForm.id.value)

    updateDoc(docRef, {
        title: "gokul karki"
    })
    .then(() => {
        updateForm.reset()
    })

})


//signup users

const singupForm = document.querySelector(".signup")
singupForm.addEventListener("submit", e => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, singupForm.email.value, singupForm.password.value)
      .then((cred) => {
        console.log('user created', cred.user)
        singupForm.reset()
      }).catch(err => {
        console.log(err)
      })
})

//login
const loginForm = document.querySelector(".login")
loginForm.addEventListener("submit", e => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, loginForm.email.value, loginForm.password.value)
      .then((cred) => {
        // console.log(cred.user)
      }).catch(err => {
        console.log(err)
      })
})


//logout
const logout = document.querySelector(".logout")
logout.addEventListener("click", e => {
   signOut(auth)
     .then(() => {
        // console.log("user signed out")
     }).catch(err => {
        console.log(err.message)
     })
})



//subscribe to auth changes
onAuthStateChanged(auth, (user) => {
   console.log('user status changed', user)
})

//unsubscribe
const unsub = document.querySelector(".unsub")
unsub.addEventListener("clicl", e => {
    
})