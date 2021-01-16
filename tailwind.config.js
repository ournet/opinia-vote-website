module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#93C5FD",
          DEFAULT: "#2563EB",
          dark: "#1E40AF"
        },
        success: {
          light: "#34D399",
          DEFAULT: "#059669",
          dark: "#065F46"
        },
        danger: {
          light: "#F87171",
          DEFAULT: "#DC2626",
          dark: "#991B1B"
        }
      }
    }
  },
  variants: {
    extend: {
      opacity: ["disabled"]
    }
  },
  plugins: []
};
