/**
 * Created by suransh on 10/10/16.
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyparser = require('body-parser');
const chats = require('./chats');

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());


app.use('/',express.static(__dirname + '/public'));

app.get('/showchats', function (req,res) {
    chats.show( (rows) => {
        console.log(rows.length);
        res.send(rows);
    })
});

io.on('connection', (socket) => {
    socket.on('chat', (data)=> {
        io.emit('chat', data);
    })
});

app.post('/addmsg', (req,res) => {
    chats.add(req.body.msg, (rows) => {
        res.send("Successfully Saved");
    } )
});

server.listen(3333, () => {
    console.log("http://localhost:3333");
});
