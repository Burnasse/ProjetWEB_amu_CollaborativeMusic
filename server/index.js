const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} =  require("./users.js");
const {existingRoom, addRoom, isMusician, addValueToKey, isSamePassword} = require("./rooms");
const cors = require('cors');
const serverApp = express();
serverApp.use(cors());

const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const server = http.createServer(serverApp);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on("canCreate", (name, room, password, callback) => {
        let error;

        if(existingRoom(room))
            error = `Room ${room} already exist`;

        if(error)
            return callback(error);
        else {
            let hash = bcrypt.hashSync(password, 10);
            addRoom(room, hash, name);
            socket.emit('response', "canCreate");
        }

    });

    socket.on("canJoin", (name, room, password, callback) => {
        let error;

        if(!existingRoom(room))
            error = `Room ${room} does not exist`;


        if(!(isSamePassword(room, password)))
            error = 'Invalid password';

        if(error)
            return callback(error);
        else{
            addValueToKey(room,name);
            socket.emit('response', "canJoin");
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

    socket.on('sendNote', (midiNumbers, callback) => {
        const user = getUser(socket.id);
        const ismusician = isMusician(user);

        if(!ismusician){
            return callback("You can not play as spectator");
        }

        socket.broadcast.to(user.room).emit('playNote', midiNumbers)
    });

    socket.on('sendDrum', (audioElm, callback) => {
        const user = getUser(socket.id);
        const ismusician = isMusician(user);

        if(!ismusician){
            return callback("You can not play as spectator");
        }
        console.log("drum send");
        socket.broadcast.to(user.room).emit('playDrum', audioElm)
    })

});

serverApp.use(router);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));