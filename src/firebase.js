// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCbHOq7Yny1RLhM_sj0VvKqEyxFtg2jUbw",
    authDomain: "instagram-clone-ba380.firebaseapp.com",
    projectId: "instagram-clone-ba380",
    storageBucket: "instagram-clone-ba380.appspot.com",
    messagingSenderId: "267800718141",
    appId: "1:267800718141:web:d7ab2fcb05d679cfc43354",
    measurementId: "G-DDJ5BJZGRN"
})
const db = firebaseApp.firestore()

const auth = firebaseApp.auth()


export { db, auth }