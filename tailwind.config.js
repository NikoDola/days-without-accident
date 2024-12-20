/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // This ensures Tailwind's classes have priority
  theme: {
    extend: {},
  },
  plugins: [],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ClientComponents/**/*.{js,ts,jsx,tsx,mdx}", // Add this line
  ],
  theme: {
    extend: {
      backgroundImage: {
        fontFamily:{
          title:['roboto', 'sans-serif'],
        },
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
