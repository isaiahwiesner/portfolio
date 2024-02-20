import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link, Navigate, useParams } from "react-router-dom"

import Spinner from "./Spinner"
import regex from "../functions/regex"



export default function RedirectPage() {
    var { link } = useParams()
    link = link ? decodeURIComponent(link) : null

    useEffect(() => {
        const unsubscribe = () => {
            if (link && regex.LINK.test(link)) window.location = link
        }
        return unsubscribe
    }, [])

    const siteName = !link ? null
        : (link.includes("://") ? link.split("://")[1] : link)
            .split("/")[0]



    if (!link || !regex.LINK.test(link)) return (
        <Navigate to="/" />
    )

    return (
        <HelmetProvider>
            <Helmet>
                {/* {meta?.title && <title>{meta.title}</title>} */}
                <title>Redirect Page - Isaiah Wiesner</title>
            </Helmet>
            <div className="page">
                <div className="flex flex-col items-center gap-4 mt-20">
                    <h3 className="text-center">You are being redirected to {siteName}...</h3>
                    <Spinner size="xl" />
                    <p className="text-center">
                        Click <Link to={link} className="link">here</Link> to be redirected manually.
                    </p>
                </div>
            </div>
        </HelmetProvider>
    )
}