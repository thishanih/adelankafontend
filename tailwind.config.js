const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero_pattern: "url('../src/assets/image/orange.jpg')",
      },
      colors: {
        pending: "#4361ee",
        partly: "#f7b801",
        paid: "#06d6a0",
        cancelled: "#ff595e",
        mainHeader: "#2b2d42",
        sideBarBlackFrom: "#211f2f",
        sideBarBlackTo: "#918ca9",
        addInvoice: "#2b2d42",
        sidebar: "#232526",
      },
      fontSize: {
        profileSm: ["14px", "16px"],
        titleSm: ["13px", "16px"],
        tableSm: ["12.5px", "16px"],
        headerTitle: ["20px", "14px"],
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
});
