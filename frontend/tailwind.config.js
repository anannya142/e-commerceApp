// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
    
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsla(0, 16%, 92%, 1.00)',   
        'background-footer': 'hsla(0, 2%, 25%, 1.00)',
        primary: 'hsl(340, 80%, 85%)',       // Light pink
        'primary-foreground': 'hsl(340, 60%, 20%)', // Darker pink/contrast for text
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        prata: ['Prata', 'serif'],
      },
    },
  },
  plugins: [],
}
