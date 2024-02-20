import React from "react"



export default function Notifications({ amount, size = "base" }) {
    const breakpoints = {
        xs: "w-6 h-6",
        sm: "w-7 h-7",
        base: "w-8 h-8",
        lg: "w-9 h-9",
        xl: "w-10 h-10",
        "2xl": "w-12 h-12",
        "3xl": "w-[3.75rem] h-[3.75rem]",
        "4xl": "w-[4.5rem] h-[4.5rem]",
        "5xl": "w-24 h-24",
        "6xl": "w-[7.5rem] h-[7.5rem]",
    }
    const textBreakpoints = {
        xs: "text-[0.75rem] [line-height:1rem]",
        sm: "text-[0.875rem] [line-height:1.25rem]",
        base: "text-[1rem] [line-height:1.5rem]",
        lg: "text-[1.125rem] [line-height:1.75rem]",
        xl: "text-[1.25rem] [line-height:1.75rem]",
        "2xl": "text-[1.5rem] [line-height:2rem]",
        "3xl": "text-[1.875rem] [line-height:2.25rem]",
        "4xl": "text-[2.25rem] [line-height:2.5rem]",
        "5xl": "text-[4rem] [line-height:1]",
        "6xl": "text-[3.75rem] [line-height:1]",
    }
    if (!Object.keys(breakpoints).includes(size)) size = "base"
    if (amount > 0) return (
        <>
            <div className={`bg-red-600 flex items-center justify-center ${breakpoints[size]} rounded-full`}>
                <p className={`text-white font-normal ${textBreakpoints[size]}`}>
                    {amount > 9 ? "9+" : amount}
                </p>
            </div>
        </>
    )
}