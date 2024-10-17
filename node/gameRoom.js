
const {randomUUID} = require('crypto');
const {WebSocketServer} = require('ws');
const gameNum = 1;
const portNum = 2999 + gameNum;

if (process.env.NODE_ENV == 'production') {
    console.log("PRODUCTION MODE");
} else console.log("Development mode");

const wss = new WebSocketServer({ port: portNum });
console.log("Opened ws server on port: " + portNum);
var gameLoop = require('./gameLoop.js');
var { SocketEntryPoint } = require('./SocketEntryPoint.js');




var socketEntryPoint = new SocketEntryPoint(gameLoop);

wss.on('connection', function connection(ws) {
    const uuid = randomUUID();
    socketEntryPoint.userConnected(uuid, ws);
    
    ws.on('error', console.error);
  
    ws.on('message', function message(data) { 
      socketEntryPoint.onMessage(uuid, data);
    });
  });

gameLoop.getStarted(socketEntryPoint);
