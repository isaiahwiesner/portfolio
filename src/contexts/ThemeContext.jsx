import React, { useContext, useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const toggleDarkMode = () => {
        if (darkMode) {
            localStorage.darkMode = false
            document.documentElement.classList.remove("dark")
        }
        else {
            localStorage.darkMode = true
            document.documentElement.classList.add("dark")
        }
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        const unsubscribe = () => {
            if (!loading) return
            if (!localStorage.darkMode) {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    localStorage.darkMode = true
                    document.documentElement.classList.add("dark")
                    setDarkMode(true)
                }
                else {
                    localStorage.darkMode = false
                    document.documentElement.classList.remove("dark")
                    setDarkMode(false)
                }
            }
            else if (localStorage.darkMode === "false") {
                localStorage.darkMode = false
                document.documentElement.classList.remove("dark")
                setDarkMode(false)
            }
            else {
                localStorage.darkMode = true
                document.documentElement.classList.add("dark")
                setDarkMode(true)
            }
            setLoading(false)
        }
        unsubscribe()
    }, [loading])

    const value = {
        darkMode, setDarkMode, toggleDarkMode
    }

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="icon" type="favicon/ico" href={darkMode ? "/imgs/favicon-dark.ico" : "/imgs/favicon.ico"} />
            </Helmet>
            <ThemeContext.Provider value={value}>
                {children && children}
            </ThemeContext.Provider>
        </HelmetProvider>
    )
}