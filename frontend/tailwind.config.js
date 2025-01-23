module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    extend: {
      colors: {
        pblue: "#3b82f6", 
        dblue: "#004080",
        secondary: "#EFF6FF", 
        white2: "#fcfcfc", 
        black2:"#070F2B"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
