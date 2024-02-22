import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"




export default function NotFound() {

    return (
        <HelmetProvider>
            <Helmet>
                <title>Page not found - Isaiah Wiesner</title>
            </Helmet>
            <Navbar />
            <div className="page">
                <div className="flex flex-col items-center gap-4 mt-20">
                    <h1 className="text-center">Page Not Found</h1>
                    <p className="text-center">
                        The page you are looking for does not exist. Please check the URL and try again.
                    </p>
                    <div className="flex flex-col items-center">
                        <p className="text-center">
                            <Link to="/" className="link">Home</Link>
                        </p>
                        <p className="text-center">
                            <Link to="/portfolio" className="link">Portfolio</Link>
                        </p>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}