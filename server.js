var ini = require('ini');
var fs = require('fs');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ host: config.websocket.host, port: config.websocket.port });
  


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
		// console.log(client);
        client.send(data);
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
		//var msg = JSON.parse(message);
        console.log('received: %s', JSON.stringify(message));

        wss.broadcast(message);
    });

    //ws.send('something');
    
});