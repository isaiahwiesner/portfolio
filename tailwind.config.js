/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#ecfdff",
                    100: "#d0f7fd",
                    200: "#a7edfa",
                    300: "#6bdef5",
                    400: "#27c5e9",
                    500: "#0ba8cf",
                    600: "#0c86ae",
                    700: "#116c8d",
                    800: "#175873",
                    900: "#184961",
                    950: "#051923",
                },
                
            }
        },
    },
    plugins: [],
}