import React from "react"



export default function Spinner({ variant = "normal", size = "base" }) {
    const variants = {
        normal: "spinner ",
        alt: "spinner-alt "
    }
    const breakpoints = {
        xs: "[--spinner-size:24px]",
        sm: "[--spinner-size:28px]",
        base: "[--spinner-size:32px]",
        lg: "[--spinner-size:36px]",
        xl: "[--spinner-size:40px]",
        "2xl": "[--spinner-size:48px]",
        "3xl": "[--spinner-size:60px]",
        "4xl": "[--spinner-size:72px]",
        "5xl": "[--spinner-size:96px]",
        "6xl": "[--spinner-size:120px]",
    }
    if (!Object.keys(breakpoints).includes(size)) size = "base"
    if (!Object.keys(variants).includes(variant)) variant = "normal"
    return (
        <div className={variants[variant] + breakpoints[size]} />
    )
}