/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#263238',
        secondary: '#777',
        accent: '#60a5fa',
        danger: '#dc2626',
      },
    },
  },
  plugins: [],
};
