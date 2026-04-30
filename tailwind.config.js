/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        'px': '1px',
        '0.5': '2px',
        '90': '22.5rem',   // 360px
        '95': '23.75rem',  // 380px
        '120': '30rem',    // 480px
        '130': '32.5rem',  // 520px
        '140': '35rem',    // 560px
        '150': '37.5rem',  // 600px
        '8.5': '34px',     // 34px
        '13': '52px',      // 52px
      },
      keyframes: {
        'mesh-1': {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(30px, -50px)' },
          '50%': { transform: 'translate(-20px, 20px)' },
          '75%': { transform: 'translate(50px, 50px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        'mesh-2': {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(-40px, 30px)' },
          '50%': { transform: 'translate(30px, -40px)' },
          '75%': { transform: 'translate(-30px, -20px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        'mesh-3': {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(40px, 40px)' },
          '50%': { transform: 'translate(-50px, -30px)' },
          '75%': { transform: 'translate(20px, -50px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        'mesh-4': {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(-30px, 40px)' },
          '50%': { transform: 'translate(40px, 30px)' },
          '75%': { transform: 'translate(-40px, -30px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
      },
      animation: {
        'mesh-1': 'mesh-1 20s ease-in-out infinite',
        'mesh-2': 'mesh-2 24s ease-in-out infinite',
        'mesh-3': 'mesh-3 28s ease-in-out infinite',
        'mesh-4': 'mesh-4 32s ease-in-out infinite',
      },
    },
  },
}
