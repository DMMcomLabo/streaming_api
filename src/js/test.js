require('../../public/css/epoch/epoch.css');

require('d3');
require('epoch');
// var _ = require('lodash');

var stamp = ((new Date()).getTime() / 1000) | 0;
var lineChartData = [
  {
    label: '指標1',
    values: [
        {time: stamp, y: 100},
        {time: stamp, y: 80}
    ]
  },
  {
    label: '指標2',
    values: [
        {time: stamp, y: 78},
        {time: stamp, y: 98}
    ]
  }
];

var areaChartInstance = $('#myChart').epoch({
    type: 'time.line',
    data: lineChartData,
    fps: 60,
    axes: ['left', 'right', 'bottom']
});

var nextData;

(function addData() {
    stamp = ((new Date()).getTime() / 1000) | 0;
    nextData = [
        {time: stamp, y: Math.random() * 100},
        {time: stamp, y: Math.random() * 100}
    ];
    areaChartInstance.push(nextData);
    console.log(nextData);

    setTimeout(function() {
        addData();
    },1000);
})();
