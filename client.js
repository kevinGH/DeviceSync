var ini = require('ini');
var fs = require('fs');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
var WebSocket = require('ws');
var ws = new WebSocket("ws://"+config.websocket.host+":"+config.websocket.port);
var devid = "1422";

ws.on('open', function open() {
	if (process.argv.slice(2) != "")
		devid = process.argv.slice(2)[0];
	
	var msg = {
		type: "devicesync",
		action: "refreshcamera",
		data: {"devid": devid}
	};
	
    ws.send(JSON.stringify(msg));
	
	setInterval(function() {
        if (ws.bufferedAmount == 0){
          process.exit(1);
        }
    }, 50);
	
	
});

/*
ws.on('message', function (data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    console.log(data);
});
*/

//console.log(process.argv.slice(2));