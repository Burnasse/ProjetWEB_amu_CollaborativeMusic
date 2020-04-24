const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {existingUser, addUser, removeUser, getUser, getUsersInRoom} =  require("./users.js");
const {existingRoom, addRoom, removeRoom} = require("./rooms");
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const router = require('./router');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    console.log(socket.id);

    socket.on("canCreate", (name, room, password, callback) => {
        let error;

        room = room.trim().toLowerCase();

        if(existingRoom(room))
            error = `Room ${room} already exist`;

        console.log(existingRoom(room));
        if(error)
            return callback(error);
        else {
            addRoom(room);
            socket.emit('response', true);
        }

    });

    socket.on("canJoin", (name, room, callback) => {
        let error;

        room = room.trim().toLowerCase();

        if(existingUser(name))
            error =  'Username already exist';
        if(!existingRoom(room))
            error = `Room ${room} does not exist`;

        if(error)
            return callback(error);
        else{
            socket.emit('response', true);
        }
    });

    socket.on('JOIN', ({name, room}, callback) => {
        console.log(socket.id, " connected");
        const {user} = addUser({idSocket: socket.id,name,room});

        socket.emit('message', {user: 'Systeme', text: `${user.name}, has joined the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', {user: 'Systeme', text: `${user.name}, has joined the room ${user.room}`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback()
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.room,users: getUsersInRoom(user.room)});

        callback()
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'Syteme', text: `${user.name} has left`})
        }
        console.log(socket.id, " left")
    });

    socket.on('sendNote', (midiNumbers, instrument) => {
        const user = getUser(socket.id);
        socket.broadcast.to(user.room).emit('playNote', midiNumbers)
    });

    socket.on('sendDrum', (audioElm) => {
        console.log("drum send");
        const user = getUser(socket.id);
        socket.broadcast.to(user.room).emit('playDrum', audioElm)
    })

});

app.use(router);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));