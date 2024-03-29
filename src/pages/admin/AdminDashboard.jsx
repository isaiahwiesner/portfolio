import React from "react"
import { Navigate } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"

import { useAuth } from "../../contexts/AuthContext"
import AdminPageWrapper from "../../components/admin/AdminPageWrapper"



export default function AdminDashboard() {
    const { currentUser } = useAuth()



    if (!currentUser) return (
        <Navigate to="/admin/login" />
    )

    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    Admin Dashboard - Isaiah Wiesner
                </title>
            </Helmet>
            <div className="page flex flex-col items-center">
                <AdminPageWrapper active="dashboard">
                    <p>
                        Some random text.
                    </p>
                </AdminPageWrapper>
            </div>
        </HelmetProvider>
    )
}