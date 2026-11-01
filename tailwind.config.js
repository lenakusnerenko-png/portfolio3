/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vault: {
          black: '#070a08',
          graphite: '#0e1511',
          graphiteLight: '#162018',
          lime: '#b4f000',
          limeBright: '#ccff33',
          limeDeep: '#7da600',
          limeDark: '#5c7d00',
          green: '#22c55e',
          greenDeep: '#15803d',
          teal: '#2dd4bf',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 25px rgba(180, 240, 0, 0.45), 0 0 60px rgba(180, 240, 0, 0.25)',
        'lime-glow-lg': '0 0 45px rgba(180, 240, 0, 0.6), 0 0 100px rgba(180, 240, 0, 0.35)',
        'inner-lime': 'inset 0 0 20px rgba(180, 240, 0, 0.35)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 25px rgba(180, 240, 0, 0.4), 0 0 60px rgba(180, 240, 0, 0.2)' },
          '50%': { boxShadow: '0 0 45px rgba(180, 240, 0, 0.7), 0 0 110px rgba(180, 240, 0, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'spin-dial': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'door-open': {
          '0%': { transform: 'perspective(900px) rotateY(0deg)' },
          '100%': { transform: 'perspective(900px) rotateY(-78deg)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        'ember-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '20%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(0.2)', opacity: '0' },
        },
        'radar': {
          '0%': { transform: 'scale(0.6)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'live-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
        'ray-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.5' },
          '50%': { opacity: '0.9' },
          '100%': { transform: 'rotate(360deg) scale(1)', opacity: '0.5' },
        },
        'trophy-bounce': {
          '0%': { transform: 'scale(0) rotate(-20deg)', opacity: '0' },
          '60%': { transform: 'scale(1.3) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'number-flash': {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '25%': { transform: 'scale(1.08)', filter: 'brightness(1.5)' },
          '50%': { transform: 'scale(0.96)', filter: 'brightness(1.2)' },
          '75%': { transform: 'scale(1.05)', filter: 'brightness(1.4)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0) rotate(-15deg)', opacity: '0' },
          '70%': { transform: 'scale(1.15) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'ring-expand': {
          '0%': { transform: 'scale(0.3)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'vault-bob': {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        float: 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-dial': 'spin-dial 1.5s ease-in-out infinite',
        'door-open': 'door-open 1.4s cubic-bezier(0.5, 0, 0.3, 1) forwards',
        shake: 'shake 0.5s ease-in-out',
        'count-up': 'count-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'confetti-fall': 'confetti-fall linear forwards',
        'ember-rise': 'ember-rise linear infinite',
        radar: 'radar 2s ease-out infinite',
        'live-pulse': 'live-pulse 1.5s ease-in-out infinite',
        'ray-spin': 'ray-spin 6s linear infinite',
        'trophy-bounce': 'trophy-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'number-flash': 'number-flash 1.2s ease-in-out infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'ring-expand': 'ring-expand 1.5s ease-out infinite',
        'star-twinkle': 'star-twinkle 1.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
        'vault-bob': 'vault-bob 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
