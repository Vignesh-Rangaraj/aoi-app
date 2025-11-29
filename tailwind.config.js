export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Figma Colors
        figma: {
          sidebar: "#1A1A1A",
          sidebarHover: "#2D2D2D",
          sidebarActive: "#3A3A3A",

          beige: "#F7EEDC",
          textHeader: "#C06A2B",

          iconInactive: "#A8A8A8",
          iconActive: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
