const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} =  require("./users.js");

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {

    socket.on('JOIN', ({name, room}, callback) => {
        console.log(socket.id, " connected")
        const {error, user} = addUser({idSocket: socket.id,name,room});

        if(error) return callback(error);

        socket.emit('message', {user: 'Systeme', text: `${user.name}, has joined the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', {user: 'Systeme', text: `${user.name}, has joined the room ${user.room}`})

        socket.join(user.room)

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room,users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', {user: 'Syteme', text: `${user.name} has left`})
        }
        console.log(socket.id, " left")
    } )

    socket.on('sendNote', (midiNumbers, instrument) => {
        const user = getUser(socket.id)
        socket.broadcast.to(user.room).emit('playNote', midiNumbers)
        console.log("note send")
        //socket.emit('playNote', midiNumbers)
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server started on ${PORT}`))