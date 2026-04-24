/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
        accent: ['"Tenor Sans"', 'sans-serif'],
      },
      colors: {
        cream:   { DEFAULT: '#fdf6e3', dark: '#f5e9c8', deeper: '#ede0b0' },
        gold:    { light: '#e8c97a', DEFAULT: '#c9971c', dark: '#9a7210', deep: '#6b4f0c' },
        maroon:  { light: '#7a2a2a', DEFAULT: '#4a1010', dark: '#2d0808' },
        navy:    { light: '#1e2a4a', DEFAULT: '#141e36', dark: '#0a1020' },
        ivory:   '#faf5ec',
        parchment: '#f7edd8',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #9a7210 0%, #e8c97a 40%, #c9971c 60%, #9a7210 100%)',
        'hero-dark':    'linear-gradient(135deg, #2d0808 0%, #4a1010 50%, #7a2a2a 100%)',
        'hero-navy':    'linear-gradient(135deg, #0a1020 0%, #141e36 60%, #1e2a4a 100%)',
        'cream-gradient':'linear-gradient(180deg, #fdf6e3 0%, #f5e9c8 100%)',
      },
      boxShadow: {
        'gold':    '0 4px 20px rgba(201,151,28,0.3)',
        'gold-lg': '0 8px 40px rgba(201,151,28,0.4)',
        'card':    '0 2px 16px rgba(74,16,16,0.08)',
        'card-hover': '0 12px 40px rgba(74,16,16,0.16)',
      },
      animation: {
        'fade-in':  'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'shimmer':  'shimmer 3s linear infinite',
        'float':    'float 4s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        slideUp: { from:{ opacity:'0', transform:'translateY(28px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        shimmer: { '0%':{ backgroundPosition:'-200% 0' }, '100%':{ backgroundPosition:'200% 0' } },
        float:   { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-10px)' } },
        scaleIn: { from:{ opacity:'0', transform:'scale(0.9)' }, to:{ opacity:'1', transform:'scale(1)' } },
      },
    },
  },
  plugins: [],
}
