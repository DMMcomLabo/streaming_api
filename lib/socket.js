var app = require('../app');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var kafka = require('kafka-node'),
    Consumer = kafka.HighLevelConsumer,
    client = new kafka.Client('172.27.100.11:2181,172.27.100.12:2181,172.27.100.13:2181'),
    consumer = new Consumer(client,[{topic:'tracking_summary'}],{groupId:'server'});
    consumer.on('message',function(message){
      if(message.value.length === 0) return;
      console.log('partition: ' + message.partition);
      var rows = message.value.split(',');
      var send_data = {};
      rows.map(function(d){
        var key = d.split('::')[0];
        var val = d.split('::')[1];
        send_data[key] = val;
        if( key === 'all_pv') console.log('all_pv:',val);
      });
      io.sockets.emit('data',send_data);
    });
    var socket = function(){
    http.listen(app.get('port'),function(){
      console.log('listen start');
    });
    io.on('connection',function(socket){
      console.log('connect socket');
    });
};
module.exports=socket;
