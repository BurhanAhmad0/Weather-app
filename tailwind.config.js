/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'slg' : '942px',
      'mlg' : '836px',
      'md' : '768px',
      'smd' : '582px',
      'ssm' : '527px',
      'xsm' : '400px'
    },
  },
  plugins: [],
  mode: 'jit',
}