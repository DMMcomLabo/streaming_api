require('jquery');
require('d3');
require('epoch');
var _ = require('lodash');

// var socket = io( 'localhost:3000' );
var socket = io( 'http://202.6.245.47' );
socket.on( 'connect', function() {
  console.log( 'connected' );
} );

// 表示に使えそうな値を手動で設定
var keys = [
    'member_pv',
    'member_uu'
    // 'unmember_pv',
    // 'unmember_uu',
    // 'view_member_pv',
    // 'view_member_uu',
    // 'view_unmember_pv',
    // 'view_unmember_uu'
];

var nextData = [];
(function() {
    // データを成型（初期設定）
     _.each(keys, function(value, key) {
         nextData.push({
             label: value,
             values: [
                //  {'time': nowDate, 'y': data[value]},
             ]
         })
    });
    // console.log(nextData);
})();

socket.on( 'data', function(data) {
  // console.log(data);

  // var nowDate = parseInt(data['spark-time'], 10);
  var nowDate = (new Date()).getTime()/1000;
  _.each(keys, function(value, key) {
      nextData[key].values.push({
          time: nowDate,
          y: parseInt(data[value], 10)
      })
  });
  console.log(nextData[0].values, nowDate);

  var areaChartInstance = $('#myChart').epoch({
      type: 'time.line',
      data: nextData,
      axes: ['left', 'right', 'bottom']
  });
  areaChartInstance.push(nextData);


  // // グラフ成形
  // $('#my-chart').epoch({
  //   type: 'time.line',
  //   pixelRatio: 1
  // });
} );
