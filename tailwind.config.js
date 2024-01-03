/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}", 'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: {
      screens: {
        'ssm': '250px',
      },
      boxShadow: {
        'envolve': '0 5px 15px 13px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'envolve-xl': '0 5px 15px 25px rgb(0 0 0 / 0.1), 0 10px 10px 0px rgb(0 0 0 / 0.1)'
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-super-slow': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}