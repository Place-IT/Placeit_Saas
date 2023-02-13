
module.exports = {
  content: [
       "./src/**/*.{js,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  // purge: ['./templates/React_frontend/React_index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]

}
