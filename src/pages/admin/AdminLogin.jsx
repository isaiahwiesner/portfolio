import React, { useRef, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../contexts/AuthContext"
import { prettifyError } from "../../functions/firebase"



export default function Login() {
    const { currentUser, logInWithUsernameAndPassword } = useAuth()
    const [params] = useSearchParams()
    const [redirect, back] = [params.get("redirect"), params.get("back")]

    const usernameRef = useRef()
    const passwordRef = useRef()
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const toggleShowPass = () => {
        setShowPass(!showPass)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await logInWithUsernameAndPassword(usernameRef.current.value, passwordRef.current.value)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(prettifyError(e.message))
        }
    }



    if (currentUser && redirect) return (
        <Navigate to={`/${decodeURIComponent(redirect)}`} />
    )

    if (currentUser) return (
        <Navigate to="/admin" />
    )

    return (
        <HelmetProvider>
            <Helmet>
                <title>Log In | Admin Dashboard - Isaiah Wiesner</title>
            </Helmet>
            <div className="page flex justify-center">
                <div className="w-full max-w-[30rem] mt-12">
                    <div className="card w-full flex flex-col gap-4">
                        <h3>Log In</h3>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    ref={usernameRef}
                                    disabled={loading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type={showPass ? "text" : "password"}
                                    id="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                    ref={passwordRef}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="end-icon"
                                    tabIndex={-1}
                                    onClick={toggleShowPass}
                                    disabled={loading}
                                >
                                    {showPass ? (
                                        <FontAwesomeIcon icon={faEye} size="sm" />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                                    )}
                                </button>
                            </div>
                            <button
                                className="btn btn-primary py-0 w-fit"
                                type="submit"
                                disabled={loading}
                            >
                                Log In
                            </button>
                            {error && (
                                <div className="dialog error">
                                    <p>{error}</p>
                                </div>
                            )}
                        </form>
                        <p>
                            <Link
                                className="link"
                                to={back ? `/${decodeURIComponent(back)}` : "/"}
                            >Back</Link>
                        </p>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}