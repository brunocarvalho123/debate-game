const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8081;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let usersObject = {};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const decodedData = data.split(':');
    if (decodedData[0] === 'create') {
      usersObject[decodedData[1]] = {users: [], mod: ws};
      responseMessage = `${decodedData[1]}:users:`;
      usersObject[decodedData[1]].mod.send(responseMessage);
    } else if (decodedData[0] === 'join') {
      if (usersObject[decodedData[1]]) {
        usersObject[decodedData[1]].users.push({name: decodedData[2], client: ws});
        responseMessage = `${decodedData[1]}:users:${usersObject[decodedData[1]].users.map(e => e.name+';')}`;
        usersObject[decodedData[1]].users.forEach(function each(obj) {
          if (obj.readyState === WebSocket.OPEN) {
            obj.send(responseMessage);
          }
        });
        usersObject[decodedData[1]].mod.send(responseMessage);
      }
    }
    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(data);
    //   }
    // })
    console.log(`Message received ~> ${data}`)
  });
  ws.send('You are connected!');
})

server.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}!`)
})