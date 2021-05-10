const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const cors = require("cors");

const users = require("./routes/api/users");
const groups = require("./routes/api/groups");

const app = express();

const path = require("path");

let global = require('./common/global');


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

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
      if (arr[i] == val)
          indexes.push(i);
  return indexes;
}

let groupSolutions = {};
// room_id:msg_type:user1;user2:is_mod

wss.on('connection', function connection(ws, req) {
  ws.id = req.headers['sec-websocket-key'];
  ws.on('message', function incoming(data) {
    let responseMessage = '';


    try {
      const decodedData = data.split(':');
      if (!decodedData[0] || !decodedData[1]) return;

      if (decodedData[0] === 'create') {
        global.usersObject[decodedData[1]] = {users: [], mod: ws};
        responseMessage = `${decodedData[1]}:users::true`;
        global.usersObject[decodedData[1]].mod.send(responseMessage);
        console.log('global in server ~~> ' + JSON.stringify(global));
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
          groupSolutions[decodedData[1]] = {};
          global.groups[decodedData[1]] = [];
          let rivals1 = [{id:0, name:'Grupo 1', members:[]}, {id:1, name:'Grupo 2', members:[]}];
          for (let idx = 0; idx < global.usersObject[decodedData[1]].users.length; idx++)
            rivals1[idx % 2].members.push({id: idx, name: global.usersObject[decodedData[1]].users[idx].name});
          global.groups[decodedData[1]] = rivals1
        } else if (decodedData[0] === 'start-group-info') {
          responseMessage = `${decodedData[1]}:start-group-info`;
        } else if (decodedData[0] === 'my-info') {
          let me = {};

          for (let i = 0; i < global.usersObject[decodedData[1]].users.length; i++) {
            const e = global.usersObject[decodedData[1]].users[i];
            if (e.client.id == ws.id) {
              me.name = e.name;
              me.id = i;
              try {
                me.group = global.groups[decodedData[1]].filter(e => e.members.filter(e=> e.id == i).length > 0)[0].id;
              } catch (error) {
                me.group = undefined;
              }
              break;
            }
          }

          if (me.name || me.id) {
            responseMessage = `${decodedData[1]}:my-info:${me.id}:${me.name}:${me.group != undefined ? me.group : ''}`;
            ws.send(`${responseMessage}`);
          }

          return;
        } else if (decodedData[0] === 'individual-solution') {
          let groupId = decodedData[2];
          let solution = decodedData[3];
          if (groupSolutions[decodedData[1]]['a'+groupId] && groupSolutions[decodedData[1]]['a'+groupId].length > 0) {
            groupSolutions[decodedData[1]]['a'+groupId].push(solution);
            if (groupSolutions[decodedData[1]]['a'+groupId].length >= global.groups[decodedData[1]][groupId].members.length) {
              responseMessage = `${decodedData[1]}:group-voting`;
              for (let idx = 0; idx < global.groups[decodedData[1]][groupId].members.length; idx++) {
                const element = global.groups[decodedData[1]][groupId].members[idx];
                global.usersObject[decodedData[1]].users[element.id].client.send(responseMessage);
              }
            }
          } else {
            groupSolutions[decodedData[1]]['a'+groupId] = [];
            groupSolutions[decodedData[1]]['a'+groupId].push(solution);
          }
          return;
        } else if (decodedData[0] === 'get-group-solutions') {
          let groupId = decodedData[2];
          responseMessage = `${decodedData[1]}:get-group-solutions`;
          ws.send(`${responseMessage}:${groupSolutions[decodedData[1]]['a'+groupId].map(e=>e+';')}`);
          return;
        } else if (decodedData[0] === 'get-group-solutions-voted') {
          let groupId = decodedData[2];
          responseMessage = `${decodedData[1]}:get-group-solutions-voted:`;
          let chosenSolution = {id: 0, nvotes: 0};
          for (let idx = 0; idx < groupSolutions[decodedData[1]]['a'+groupId].length; idx++) {
            let nVotes =  getAllIndexes(global.groups[decodedData[1]][groupId].votes,idx);
            if (nVotes > chosenSolution.nvotes) {
              chosenSolution.id = idx;
              chosenSolution.nvotes = nVotes;
            }
          }
          responseMessage += `${groupSolutions[decodedData[1]]['a'+groupId][chosenSolution.id]};`;
          ws.send(responseMessage);
          return;
        } else if (decodedData[0] === 'individual-vote') {
          let groupId = decodedData[2];
          let solutionId = decodedData[3];
          if (global.groups[decodedData[1]][groupId].votes && global.groups[decodedData[1]][groupId].votes.length > 0) {
            global.groups[decodedData[1]][groupId].votes.push(solutionId);
            if (global.groups[decodedData[1]][groupId].votes.length >= global.groups[decodedData[1]][groupId].members.length) {
              responseMessage = `${decodedData[1]}:group-discussion`;
              for (let idx = 0; idx < global.groups[decodedData[1]][groupId].members.length; idx++) {
                const element = global.groups[decodedData[1]][groupId].members[idx];
                global.usersObject[decodedData[1]].users[element.id].client.send(responseMessage);
              }
            }
          } else {
            global.groups[decodedData[1]][groupId].votes = [solutionId];
          }
          return;
        }

        if (responseMessage) {
          global.usersObject[decodedData[1]].users.forEach(function each(obj) {
            if (obj.client.readyState === WebSocket.OPEN) obj.client.send(responseMessage);
          });
          global.usersObject[decodedData[1]].mod.send(`${responseMessage}:true`);
        }

      }
    } catch (error) {

    }
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

})