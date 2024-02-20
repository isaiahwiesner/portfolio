import React from "react"
import { Navigate } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"

import { useAuth } from "../../contexts/AuthContext"



export default function AdminDashboard() {
    const { currentUser, logOut } = useAuth()

    const handleLogOut = async () => {
        try {
            await logOut()
        } catch (e) {
            console.log(e)
        }
    }



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
                <div className="w-full max-w-[50rem] flex flex-col gap-4">
                    <h1>Admin Dashboard</h1>
                    <button className="btn btn-primary" onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </HelmetProvider>
    )
}