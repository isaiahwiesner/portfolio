import React from "react"
import { useTheme } from "../contexts/ThemeContext"
import lightLogo from "../assets/logo-light.svg"
import darkLogo from "../assets/logo-dark.svg"



export default function Logo({ className }) {
    const { darkMode } = useTheme()
    return (
        <img className={className&&className} src={darkMode ? darkLogo : lightLogo} alt="Isaiah Wiesner" />
    )
}