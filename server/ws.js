// server/ws.js
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 4000 })

wss.on('connection', ws => console.log("client connected"))
module.exports = wss
