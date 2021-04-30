const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const cors = require("cors");

const users = require("./routes/api/users");

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
    } else if (decodedData[0] === 'join') {
      global.usersObject[decodedData[1]].users.push({name: decodedData[2], client: ws});
      responseMessage = `${decodedData[1]}:users:${global.usersObject[decodedData[1]].users.map(e => e.name+';')}`;
      global.usersObject[decodedData[1]].users.forEach(function each(obj) {
        if (obj.client.readyState === WebSocket.OPEN) {
          obj.client.send(responseMessage);
        }
      });
      global.usersObject[decodedData[1]].mod.send(`${responseMessage}:true`);
    } else if (decodedData[0] === 'start-slides') {
      responseMessage = `${decodedData[1]}:start-slides`;
      global.usersObject[decodedData[1]].users.forEach(function each(obj) {
        if (obj.client.readyState === WebSocket.OPEN) {
          obj.client.send(responseMessage);
        }
      });
      global.usersObject[decodedData[1]].mod.send(`${responseMessage}:true`);
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

app.use('/api/users', users);

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