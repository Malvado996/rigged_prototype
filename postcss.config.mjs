/** @type {import('postcss').PostCSSConfig} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {}, // Keep this if you want autoprefixer (optional but recommended)
  },
};

export default config;