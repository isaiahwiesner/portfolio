import React from "react"
import { Navigate } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"

import { useAuth } from "../../contexts/AuthContext"
import AdminPageWrapper from "../../components/admin/AdminPageWrapper"
import { getCurrentPath } from "../../functions/misc"



export default function AdminNotFound() {
    const { currentUser } = useAuth()



    if (!currentUser) return (
        <Navigate to={`/admin/login?redirect=${encodeURIComponent(getCurrentPath())}`} />
    )

    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    Page not found | Admin Dashboard - Isaiah Wiesner
                </title>
            </Helmet>
            <div className="page flex flex-col items-center">
                <AdminPageWrapper>
                    <h4 className="text-center">
                        Page Not Found
                    </h4>
                    <p className="text-center">
                        The page you are looking for does not exist. Please check the URL and try again.
                    </p>
                </AdminPageWrapper>
            </div>
        </HelmetProvider>
    )
}