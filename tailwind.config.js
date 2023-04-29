/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '0px', // Extra small devices (portrait phones)
        'sm': '640px', // Small devices (landscape phones)
        'md': '768px', // Medium devices (tablets)
        'lg': '1024px', // Large devices (desktops)
        'xl': '1280px', // Extra large devices (large desktops)
        '2xl': '1536px', // 2XL devices
        '3xl': '2048px', // 3XL devices
        '4xl': '2560px', // 4XL devices
        '5xl': '3072px', // 5XL devices
        '6xl': '4096px', // 6XL devices
      },
    },
  },
  plugins: [],
}
