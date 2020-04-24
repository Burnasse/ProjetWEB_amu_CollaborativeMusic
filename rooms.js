const {getUsersInRoom} = require("./users");

const rooms = [];

const existingRoom = (roomName) => {
    return rooms.find((room) => room === roomName);
}

const addRoom = (newRoom) => {
    rooms.push(newRoom)
}

const removeRoom = () => {
    rooms.forEach(room => {
        if(getUsersInRoom(room).length === 0){
            let index = rooms.indexOf(room);
            rooms.splice(index,1);
        }
    })
}

module.exports = {existingRoom, addRoom, removeRoom};