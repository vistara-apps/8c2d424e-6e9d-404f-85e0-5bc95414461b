/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(225 8% 98%)',
        surface: 'hsl(225 8% 100%)',
        accent: 'hsl(170 70% 50%)',
        primary: 'hsl(220 70% 50%)',
        'text-primary': 'hsl(220 20% 15%)',
        'text-secondary': 'hsl(220 20% 35%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 1px 3px hsla(0,0%,0%,0.12), 0 1px 2px hsla(0,0%,0%,0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        '100': '100ms',
        '200': '200ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
