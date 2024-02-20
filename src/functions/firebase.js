import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

// Firestore (Database) Variables
export const firestore = app.firestore()
export const database = {
    users: firestore.collection("users"),
    projects: firestore.collection("projects"),
    messages: firestore.collection("messages"),
}

// Storage
export const storage = app.storage()

// Auth
export const auth = app.auth()
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider()

// Pretty Errors
export function prettifyError(e) {
    if (!e.includes("Firebase:")) return e
    const error = e.split("(")[1].split(")")[0]
    console.log(error)
    switch (error) {
        case "auth/email-already-exists":
            return "Email already in use."
        case "auth/insufficient-permission":
            return "You do not have access to this resource."
        case "auth/invalid-credential":
            return "Invalid username or password."
        case "auth/invalid-password":
            return "Password too weak."
        case "auth/too-many-requests":
            return "This account has been temporarily disabled. Please change your password or try again later."
        default:
            return e
    }
}