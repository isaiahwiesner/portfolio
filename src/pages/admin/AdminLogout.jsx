import React, { useState } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"

import AdminPageWrapper from "../../components/admin/AdminPageWrapper"

import { useAuth } from "../../contexts/AuthContext"



export default function AdminLogout() {
    const [params] = useSearchParams()
    const { currentUser, logOut } = useAuth()
    const [back] = [params.get("back")]
    const [loading, setLoading] = useState(false)

    const handleLogOut = async () => {
        setLoading(true)
        try {
            await logOut()
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }



    if (!currentUser && back) return (
        <Navigate to={`/admin/login?redirect=${encodeURIComponent(back)}`} />
    )

    if (!currentUser) return (
        <Navigate to="/admin" />
    )

    return (
        <HelmetProvider>
            <Helmet>
                <title>Log Out | Admin Dashboard - Isaiah Wiesner</title>
            </Helmet>
            <div className="page flex flex-col items-center">
                <AdminPageWrapper active="logout">
                    <div className="w-full flex flex-col gap-8 items-center">
                        <h3 className="text-center">
                            Are you sure you want to log out?
                        </h3>
                        <div className="w-full max-w-[20rem] flex flex-col gap-4 items-center">
                            <Link to={back ? `/${decodeURIComponent(back)}` : "/admin"} className="w-full">
                                <button className="w-full btn btn-primary">
                                    No
                                </button>
                            </Link>
                            <button className="w-full btn btn-error" onClick={handleLogOut} disabled={loading}>
                                Yes
                            </button>
                        </div>
                    </div>

                </AdminPageWrapper>
            </div>
        </HelmetProvider>
    )
}