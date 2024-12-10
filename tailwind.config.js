/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "pastel-purple": "#B5A5D1",
        "pastel-pink": "#F6D1D1",
        "pastel-blue": "#A3D9FF",
        "pastel-green": "#A8E6CF",
        "pastel-yellow": "#FFF8B5",
        "pastel-gray": "#9A8C98", // Original color
        "dark-gray": "#4A4E69", // Darker color
      },
      animation: {
        "color-change": "colorChange 2s ease-in-out infinite",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": { color: "#9A8C98" }, // Original color
          "50%": { color: "#6B705C" }, // Darker color at halfway point
        },
      },
    },
  },
  plugins: [],
};
