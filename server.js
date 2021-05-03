const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const cors = require("cors");

const users = require("./routes/api/users");
const groups = require("./routes/api/groups");

const app = express();

const path = require("path");

const global = require('./common/global.js');


var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// room_id:msg_type:user1;user2:is_mod

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const decodedData = data.split(':');
    if (!decodedData[0] || !decodedData[1]) return;

    if (decodedData[0] === 'create') {
      global.usersObject[decodedData[1]] = {users: [], mod: ws};
      responseMessage = `${decodedData[1]}:users::true`;
      global.usersObject[decodedData[1]].mod.send(responseMessage);
    } else if (decodedData[0]) {
      if (decodedData[0] === 'join') {
        global.usersObject[decodedData[1]].users.push({name: decodedData[2], client: ws});
        responseMessage = `${decodedData[1]}:users:${global.usersObject[decodedData[1]].users.map(e => e.name+';')}`;
      } else if (decodedData[0] === 'start-slides') {
        responseMessage = `${decodedData[1]}:start-slides`;
      } else if (decodedData[0] === 'next-slide') {
        responseMessage = `${decodedData[1]}:next-slide`;
      } else if (decodedData[0] === 'previous-slide') {
        responseMessage = `${decodedData[1]}:previous-slide`;
      } else if (decodedData[0] === 'start-game-instructions') {
        responseMessage = `${decodedData[1]}:start-game-instructions`;
      } else if (decodedData[0] === 'start-game-groups') {
        responseMessage = `${decodedData[1]}:start-game-groups`;
        global.groups[decodedData[1]] = [];
        let rivals1 = [{id:0, name:'Grupo 1', members:[]}, {id:1, name:'Grupo 2', members:[]}];
        for (let idx = 0; idx < global.usersObject[decodedData[1]].users.length; idx++)
          rivals1[idx % 2].members.push(idx);
        global.groups[decodedData[1]].push(rivals1);
      } else if (decodedData[0] === 'start-game-instructions') {
        responseMessage = `${decodedData[1]}:start-group-info`;
      } else if (decodedData[0] === 'my-info') {
        let me = global.usersObject[decodedData[1]].users.filter(e => e.client == ws)[0];
        // TODO
        responseMessage = `${decodedData[1]}:my-info:${me.name}`;
      }

      global.usersObject[decodedData[1]].users.forEach(function each(obj) {
        if (obj.client.readyState === WebSocket.OPEN) obj.client.send(responseMessage);
      });
      global.usersObject[decodedData[1]].mod.send(`${responseMessage}:true`);
    }
    console.log(`Message received ~> ${data}`)
  });
  ws.send('You are connected!');
})

app.use('/api/users', users);
app.use('/api/groups', groups);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

server.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}!`)
})