import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                camelGreen: '#004225',
                camelSand: '#D9C2A7',
                camelCream: '#F5F0E6',
                camelDark: '#1E1E1E',
            },
        },
    },
    plugins: [],
};
export default config;