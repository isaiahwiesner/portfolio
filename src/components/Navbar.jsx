import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

import { useTheme } from "../contexts/ThemeContext"

import Logo from "./Logo"



export default function Navbar({ active = null }) {
    const [sideNav, setSideNav] = useState(false)
    const openSideNav = () => setSideNav(true)
    const closeSideNav = () => setSideNav(false)
    const { darkMode, toggleDarkMode } = useTheme()

    const pages = [
        [
            {
                title: "Portfolio",
                id: "portfolio",
                type: "link",
                path: "/portfolio"
            },
            {
                title: "Contact",
                id: "contact",
                type: "link",
                path: "/contact"
            },
            {
                title: "Github",
                id: "github",
                type: "external",
                path: "/redirect/" + encodeURIComponent("https://github.com/isaiahwiesner")
            }
        ],
        [
            {
                id: "darkMode",
                type: "component",
                Component: DarkMode
            }
        ]
    ]

    function DarkMode() {
        const handleSwitch = () => toggleDarkMode()
        return (
            <button className="nav-item" onClick={handleSwitch}>
                Theme: {darkMode ? "Dark" : "Light"}
            </button>
        )
    }



    return (
        <>
            {/* Sidenav */}
            <section className={`${sideNav ? "block" : "hidden"} fixed top-0 left-0 right-0 bottom-0 z-10 bg-primary-100 dark:bg-primary-900 bg-opacity-50 dark:bg-opacity-50`} onClick={closeSideNav} />
            <section className={`sidenav ${sideNav ? "translate-x-0" : "translate-x-[110%]"}`}>
                <div className="flex justify-between items-center h-16 px-8">
                    <button className="icon-button" onClick={closeSideNav}>
                        <FontAwesomeIcon icon={faXmark} size="3x" />
                    </button>
                    <Logo className="h-12 w-auto" />
                </div>
                <div className="sidenav-items">
                    {pages[0].map((page) => {
                        return <NavItem key={page.id} page={page} />
                    })}
                    {pages[1].map((page) => {
                        return <NavItem key={page.id} page={page} />
                    })}
                </div>
            </section>

            <nav className="navbar">
                {/* Desktop */}
                <div className="hidden md:flex items-center h-full gap-4 md:gap-8">
                    <Link to="/">
                        <Logo className="h-12 w-auto" />
                    </Link>
                    <div className="flex items-center h-full">
                        {pages[0].map((page) => {
                            return <NavItem key={page.id} page={page} />
                        })}
                    </div>
                </div>
                <div className="hidden md:flex items-center h-full">
                    {pages[1].map((page) => {
                        return <NavItem key={page.id} page={page} />
                    })}
                </div>
                <div className="flex md:hidden items-center h-full">
                    <Link to="/">
                        <Logo className="h-12 w-auto" />
                    </Link>
                </div>
                <div className="flex md:hidden items-center h-full">
                    <button className="icon-button" onClick={openSideNav}>
                        <FontAwesomeIcon icon={faBars} size="3x" />
                    </button>
                </div>
            </nav>
        </>
    )

    function NavItem({ page }) {
        if (page.type === "link") return (
            <Link key={page.id} to={page.path} className={`nav-item ${active === page.id ? "active" : ""}`}>
                {page.title}
            </Link>
        )
        if (page.type === "external") return (
            <Link key={page.id} to={page.path} target="_blank" className="nav-item">
                {page.title}
            </Link>
        )
        if (page.type === "component") return (
            <page.Component key={page.id} />
        )
        return null
    }
}