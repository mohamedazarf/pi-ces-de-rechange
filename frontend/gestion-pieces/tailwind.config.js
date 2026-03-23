// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         industrial: {
//           950: '#0a0a0f',
//           900: '#12121a',
//           800: '#1a1a26',
//           700: '#252532',
//           600: '#32323f',
//         }
//       }
//     },
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         industrial: {
//           950: "#0a0a0f",
//           900: "#12121a",
//           800: "#1a1a26",
//           700: "#252532",
//           600: "#32323f",
//         },
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "azure-primary": "#0078d4",
        "azure-deep": "#004e8c",
        "azure-light": "#50e6ff",
        navy: "#1b2631",
      },
      fontFamily: {
        display: ["Crimson Pro", "serif"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
