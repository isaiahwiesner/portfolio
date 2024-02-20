import React, { useContext, useEffect, useState } from "react"
import { auth, GoogleAuthProvider, FacebookAuthProvider, database } from "../functions/firebase"
import User from "../models/User"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user == null) {
                setCurrentUser(null)
                setLoading(false)
            }
            else {
                console.log(user)
                setCurrentUser({
                    uid: user.uid
                })
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    function signInWithGoogle() {
        return auth.signInWithPopup(GoogleAuthProvider)
    }

    function signInWithFacebook() {
        return auth.signInWithPopup(FacebookAuthProvider)
    }

    function signUpWithEmailAndPassword(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logInWithEmailAndPassword(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    async function logInWithUsernameAndPassword(username, password) {
        const q = database.users.where("username", "==", username.toLowerCase())
        const snap = await q.get()
        if (snap.size === 0) throw new Error("Invalid username or password.")
        const user = new User(snap.docs[0].data())
        return logInWithEmailAndPassword(user.email, password) 
    }

    function logOut() {
        return auth.signOut()
    }

    function sendEmailVerification() {
        return auth.currentUser.sendEmailVerification()
    }

    function sendPasswordReset(email) {
        return auth.sendPasswordResetEmail(email)
    }

    const value = {
        loading,
        currentUser,
        signInWithGoogle,
        signInWithFacebook,
        signUpWithEmailAndPassword,
        logInWithEmailAndPassword,
        logInWithUsernameAndPassword,
        logOut,
        sendEmailVerification,
        sendPasswordReset
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? null : children && children}
        </AuthContext.Provider>
    )
}