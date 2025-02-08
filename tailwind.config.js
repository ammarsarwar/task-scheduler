/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Include all files in the `app` directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Include all files in the `components` directory
  ],
  theme: {
    extend: {}, // Customize the default theme here if needed
  },
  plugins: [],
};
