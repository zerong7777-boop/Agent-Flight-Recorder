/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cockpit: {
          950: "#070b12",
          900: "#0d1420",
          800: "#121c2b",
          700: "#1b2a3d"
        },
        signal: {
          cyan: "#38d5ff",
          blue: "#5b8cff",
          amber: "#f5b84b",
          green: "#65d88d",
          red: "#ff6b6b"
        }
      },
      boxShadow: {
        panel: "0 18px 60px rgba(0, 0, 0, 0.36)"
      }
    }
  },
  plugins: []
};
