
module.exports = {
  port: 9000,
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ],
  libraries: [
    'react', 'react-dom', 'redux', // default
    'angular',
    'vue',
    {name: 'backbone', alias: ['Backbone'], bundle: 'dll'},
    {name: 'lodash', type: 'npm', alias: ['_'], bundle: 'dll'},
    {name: 'tools', type: 'custom', path: 'src/utils', bundle: 'utility'},
    {name: 'jquery', alias: ['$', 'jQuery', 'jquery']},
    {name: 'chartjs', alias: ['ChartJs', 'chart.js'], type: 'cdn', url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
  ],
};
