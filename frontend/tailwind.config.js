/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        "brand-color": "var(--brand-primary-color)",
        "color-black": "var(--color-black)",
      },
      textColor: {
        "brand-color": "var(--brand-primary-color)",
        "color-black": "var(--color-black)",
      },
      backgroundColor: {
        "brand-color": "var(--brand-primary-color)",
        "secondary-white": "var(--color-secondary-white)",
      },
      screens: {
        "500px": "500px",
        "980px": "980px",
      },
      backgroundImage: {
        "hero-bannar-1":
          "url('https://themepanthers.com/wp/nest/d1/wp-content/uploads/2022/05/slider-2-min.png')",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
};
