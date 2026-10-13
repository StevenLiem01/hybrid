/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F6",
        card: "#FFFFFF",
        muted: "#F1EFEA",
        border: "#E4E1DA",
        ink: {
          DEFAULT: "#1A1917",
          muted: "#6B675F",
          faint: "#8A857B",
        },
        pole: {
          DEFAULT: "#25405F",
          pressed: "#1B3049",
          soft: "#E3E9F1",
        },
        success: {
          DEFAULT: "#3F6B3A",
          soft: "#E4EEDF",
        },
        warning: {
          DEFAULT: "#9A5B0F",
          soft: "#F6E8D2",
        },
        danger: {
          DEFAULT: "#B3261E",
          soft: "#F6E0DE",
        },
      },
      fontFamily: {
        display: ["Domine_400Regular"],
        body: ["PublicSans_400Regular"],
        "body-medium": ["PublicSans_500Medium"],
        "body-semibold": ["PublicSans_600SemiBold"],
        "body-bold": ["PublicSans_700Bold"],
      },
      borderRadius: {
        control: "10px",
        card: "12px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
}