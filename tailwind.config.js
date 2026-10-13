/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#16130F",
        surface: {DEFAULT: "#1F1B16", raised: "#2A241D"},
        line: "#3a3228",
        bone: { DEFAULT: "#F1EADB", muted: "#A89C88"},
        brass: { DEFAULT: "#C8963E", pressed: "#A87B2C"},
        oxblood: "#8C2F2B",
        "pole-navy": "#27405E",
        success: "#7A8B4A",
        warning: "#D9822B",
        danger: "#E06A5F",
      },
      fontFamily: {
        display: ["Domine_400Regular"],
        body: ["PublicSans_400Regular"],
        "body-medium": ["PublicSans_500Medium"],
        "body-semibold": ["PublicSans_600SemiBold"],
        "body-bold": ["PublicSans_700Bold"],
      },
      borderRadius: {
        card: "12px",
        control: "10px",
      },
    },
  },
  plugins: [],
}