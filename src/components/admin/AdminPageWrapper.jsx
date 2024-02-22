import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { getCurrentPath } from "../../functions/misc"



export default function AdminPageWrapper({ children, active }) {
    const { currentUser } = useAuth()
    const [sideNav, setSideNav] = useState(false)
    const openSideNav = () => setSideNav(true)
    const closeSideNav = () => setSideNav(false)
    const { darkMode, toggleDarkMode } = useTheme()

    return (
        <>
            {/* Sidenav */}
            <section className={`${sideNav ? "block" : "hidden"} fixed top-0 left-0 right-0 bottom-0 z-10 bg-primary-100 dark:bg-primary-900 bg-opacity-50 dark:bg-opacity-50`} onClick={closeSideNav} />
            <section className={`sidenav ${sideNav ? "translate-x-0" : "translate-x-[110%]"}`}>
                <div className="flex justify-between items-center h-16 px-8">
                    <button className="icon-button" onClick={closeSideNav}>
                        <FontAwesomeIcon icon={faXmark} size="3x" />
                    </button>
                </div>
                <div className="sidenav-items">
                    <AdminNavItem name="Dashboard" path="/admin" id="dashboard" />
                    <AdminNavItem name="Users" path="/admin/users" id="users" />
                    <AdminNavItem name="Projects" path="/admin/projects" id="projects" />
                    <AdminNavItem name="Profile" path="/admin/profile" id="profile" />
                    <AdminNavItem name="Exit" path="/" id="exit" />
                    <DarkMode />
                    <AdminNavItem name="Log Out" path="/admin/logout" id="logout" />
                </div>
            </section>

            <div className="w-full max-w-[50rem] flex flex-col rounded-md overflow-hidden">
                <div className="w-full grid grid-cols-[auto,1fr] gap-8 px-4 h-12 bg-primary-500 bg-opacity-20">
                    <div className="flex h-full items-center text-nowrap">
                        <h4>
                            <Link to="/admin" className="font-normal">Admin Dashboard</Link>
                        </h4>
                    </div>
                    <div className="h-full w-full grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6">
                        <h5 className="hidden md:block truncate secondary-text text-end self-center">
                            {currentUser.username}
                        </h5>
                        <Link to={`/admin/logout` + (
                            getCurrentPath() === "admin"
                                ? ""
                                : getCurrentPath() === "admin/logout"
                                    ? window.location.search
                                    : `?back=${encodeURIComponent(getCurrentPath())}`
                        )} className="hidden md:block self-center">
                            <button className="hidden md:block btn btn-error h-min py-0 self-center">
                                Log Out
                            </button>
                        </Link>
                        <div className="flex md:hidden h-full w-full items-center justify-end">
                            <button className="icon-button" onClick={openSideNav}>
                                <FontAwesomeIcon icon={faBars} size="2x" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="admin-nav">
                    <AdminNavItem name="Dashboard" path="/admin" id="dashboard" />
                    <AdminNavItem name="Users" path="/admin/users" id="users" />
                    <AdminNavItem name="Projects" path="/admin/projects" id="projects" />
                    <AdminNavItem name="Profile" path="/admin/profile" id="profile" />
                    <AdminNavItem name="Exit" path="/" id="exit" />
                    <div className="flex w-full h-full items-center justify-end">
                        <DarkMode />
                    </div>
                </div>
                <div className="flex flex-col p-4 scroll-x max-h-[calc(100vh-7rem)] md:max-h-[calc(100vh-10rem)] bg-primary-500 bg-opacity-10">
                    {children && children}
                </div>
            </div>
        </>
    )

    function AdminNavItem({ name, path, id }) {
        return (
            <Link className={`nav-item ${active === id ? "active" : ""}`} to={path}>
                {name}
            </Link>
        )
    }

    function DarkMode() {
        const handleSwitch = () => toggleDarkMode()
        return (
            <button className="nav-item md:text-nowrap" onClick={handleSwitch}>
                Theme: {darkMode ? "Dark" : "Light"}
            </button>
        )
    }
}