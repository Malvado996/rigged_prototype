import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Camel Trophy palette
                primary: {
                    DEFAULT: "#2d5016", // dark green
                    50: "#f0f7e8",
                    100: "#dcecc9",
                    200: "#bad995",
                    300: "#8ec05a",
                    400: "#6ca32f",
                    500: "#4d8418",
                    600: "#396611",
                    700: "#2d5016",
                    800: "#233f14",
                    900: "#1b3210",
                },
                accent: {
                    DEFAULT: "#d9b98a", // sand beige
                    50: "#fdf9f2",
                    100: "#f9edde",
                    200: "#f2d9b9",
                    300: "#e8bf8d",
                    400: "#d9b98a",
                    500: "#c89c61",
                    600: "#b07f4d",
                    700: "#8f663d",
                    800: "#755133",
                    900: "#5f422b",
                },
            },
        },
    },
    plugins: [],
};

export default config;