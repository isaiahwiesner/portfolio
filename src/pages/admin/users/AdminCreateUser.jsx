import React, { useRef, useState } from "react"

import regex from "../../../functions/regex"
import { useAuth } from "../../../contexts/AuthContext"
import User from "../../../models/User"



export default function AdminCreateUser() {
    const [error, setError] = useState("")
    const [errorFields, setErrorFields] = useState(null)
    const { signUpWithEmailAndPassword } = useAuth()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {}
        if (!usernameRef.current.value) errors.username = "A username must be provided."
        else if (!regex.USERNAME.test(usernameRef.current.value.trim())) errors.username = "The username can only contain letters, numbers, and underscores."
        else if (usernameRef.current.value.trim().length < 3 || usernameRef.current.value.trim().length > 32) errors.username = "The username must be between 3 and 32 characters."
        if (!emailRef.current.value) errors.email = "An email address must be provided."
        else if (!regex.EMAIL.test(emailRef.current.value.trim())) errors.email = "Invalid email address."
        if (Object.keys(errors).length > 0) {
            setError("The following fields must be fixed:")
            setErrorFields(errors)
            return
        }
        setError("")
        setErrorFields(null)
        try {
            const newUser = await signUpWithEmailAndPassword(emailRef.current.value.toLowerCase(), passwordRef.current.value)
            await User.createUser({
                username: usernameRef.current.value.toLowerCase(),
                email: emailRef.current.value.toLowerCase(),
                password: passwordRef.current.value,
                uid: newUser.user.uid
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        placeholder="Username"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        placeholder="Email"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        placeholder="Password"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        placeholder="Password"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
                {error && <>
                    <p className="text-red-500">{error}</p>
                    <pre>{JSON.stringify(errorFields, "\n", 2)}</pre>
                </>}
                <button className="btn btn-primary-transparent w-full py-0">
                    Create
                </button>
            </form>
        </>
    )
}