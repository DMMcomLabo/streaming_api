require('../../public/css/epoch/epoch.css');
require('../../public/css/font-awesome.css');
require("font-awesome-webpack");
require('d3');
require('epoch');
// require('./socket');

var socket = io( 'http://202.6.245.47' );

// 表示に使えそうな値を手動で設定
var keys = [
    'all_pv',
    'all_uu',
    'member_pv',
    'member_uu',
    'unmember_pv',
    'unmember_uu',
    'view_member_pv',
    'view_member_uu',
    'view_unmember_pv',
    'view_unmember_uu'
];

var dataArr, lineChartData, nextData, areaChartInstance;
// データの取得に成功したらLoading を非表示にする
socket.on( 'connect', function() {
    console.log( 'connected' );
});

socket.on( 'connect_error', function() {
    alert( 'データの取得に失敗しました' );
});

// データが入ってきたら
socket.on('data', function(data) {
    var stamp = ((new Date()).getTime() / 1000) | 0;

    if(!lineChartData) {
        // Loadingを非表示にする
        $('#fn-loading').css('display','none');
        $('.list-column').css('display','block');

        // 初期設定
        lineChartData = [
          {
            label: 'all_pv',
            values: [
                {time: stamp, y: data['all_pv']},
            ]
          },
          {
            label: 'member_pv',
            values: [
                {time: stamp, y: data['member_pv']}
            ]
          },
          {
            label: 'unmember_pv',
            values: [
                {time: stamp, y: data['unmember_pv']}
            ]
          }
        ];

        areaChartInstance = $('#myChart').epoch({
            type: 'time.line',
            data: lineChartData,
            fps: 60,
            axes: ['left', 'right', 'bottom']
        });
    } else {
        nextData = [
            {time: stamp, y: data['all_pv']},
            {time: stamp, y: data['member_pv']},
            {time: stamp, y: data['unmember_pv']}
        ];
        areaChartInstance.push(nextData);
    }
    console.log(data);
});
