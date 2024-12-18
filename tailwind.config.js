/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue"],
  prefix: "tw-",
  theme: {
    extend: {
      fontSize: {
        t1: ["16px", "20.8px"],
        t2: ["14px", "18.2px"],
        t3: ["12px", "15.6px"],
        t4: ["10px", "13px"],
        h1: ["20px", "25px"],
        h2: ["18px", "23.4px"],
      },
      spacing: {
        4.5: "1.125rem",
        7.5: "1.875rem",
      },
      zIndex: {
        3000: 3000,
      },
    },

    colors: {
      white: "#fff",
      black: "#000",
      "gray-black": "#C4C4C4",
      gray: "#CBCDD9",
      "gray-light": "#F5F5FA",
      border: "#DFDFE1",
      card: "#F6F6F6",
      "card-descr": "#6B6B6B",
      base: "#252525",
      purple: "#D8D8F7",
      blue: "#3857F6",
      el: "#181818",
      negative: "#ED1C24",
      "yellow-brown": "#EDE7DC",
      brown: "#C9A870",
      tab: "#6E6E8E",
      bg: "#F1EFEB",
      transparent: "transparent",
    },
    fontFamily: {
      manrope: "manrope",
    },
    backdropBlur: {
      10: "10px",
    },
    boxShadow: {
      blur: "0px -10px 10px white",
      tab: "0px 0px 40px 0px #00000026",
      card: " 0px 0px 20px 4px #E8E8E8",
    },
    borderRadius: {
      6: "6px",
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      20: "20px",
      24: "24px",
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          padding: "0 20px",
        },
      });
    },
  ],
};
