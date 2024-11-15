module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 18s linear infinite',
        marquee2: 'marquee2 18s linear infinite',
        marqueeLeft: 'marqueeLeft 18s linear infinite',
        marqueeLeft2: 'marqueeLeft2 18s linear infinite',
        pulse: 'pulse 3s ease-in-out infinite', // Adding pulse animation
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        marqueeLeft2: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        // Adding custom pulse keyframes
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}
