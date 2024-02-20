import React, { useRef, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

import Navbar from "../components/Navbar"
import regex from "../functions/regex"
import Message from "../models/Message"
import { v4 as uuid } from "../functions/uuid"
import { prettifyError } from "../functions/firebase"



export default function Contact() {
    const nameRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [errorFields, setErrorFields] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {}
        if (nameRef.current.value.trim() === "") errors.name = "The name cannot be empty."
        if (!regex.EMAIL.test(emailRef.current.value.trim())) errors.email = "Invalid email address."
        if (messageRef.current.value.trim() === "") errors.message = "The message cannot be empty."
        if (Object.keys(errors).length > 0) {
            setError("The following errors must be fixed:")
            setErrorFields(errors)
            return    
        }
        setLoading(true)
        setError("")
        setErrorFields(null)
        const messageId = uuid()
        try {
            await Message.createMessage({
                name: nameRef.current.value.trim(),
                email: emailRef.current.value.trim(),
                password: messageRef.current.value.trim(),
                messageId: messageId
            })
            setLoading(false)
        } catch (e) {
            setError(prettifyError(e.message))
            setLoading(false)
        }
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Contact - Isaiah Wiesner</title>
            </Helmet>
            <Navbar active="contact" />
            <div className="page">
                <h1>Contact</h1>
            </div>
        </HelmetProvider>
    )
}