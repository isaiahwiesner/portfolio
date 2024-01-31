import React, { useContext, useEffect, useState } from "react"
import { auth, GoogleAuthProvider, FacebookAuthProvider } from "../functions/firebase"

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
        logOut,
        sendEmailVerification,
        sendPasswordReset
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}