module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'flicker': 'flicker 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

