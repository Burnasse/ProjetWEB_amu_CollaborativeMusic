const {getUsersInRoom} = require("./users");
const bcrypt = require('bcrypt');

const rooms = [];
const map = [];

const addValueToKey = (key, value) => {
    map[key] = map[key] || [];
    map[key].push(value);
};

function isSamePassword(roomName, password){
    let bool = Boolean(false);

    rooms.forEach(room => {
        if(room.name === roomName && bcrypt.compareSync(password, room.password))
            bool = Boolean(true);
    });

    return Boolean(bool);
}

function isMusician(user) {
    let bool = Boolean(false);

    map[user.room].forEach(userName => {
        if(userName === user.name)
            bool = Boolean(true);
    });

    return Boolean(bool);
}

const existingRoom = (roomName) => {
    return rooms.find((room) => room.name === roomName);
};

const addRoom = (name, password, username) => {
    const room = {name, password};
    addValueToKey(name, username);
    rooms.push(room)
};

const removeRoom = () => {
    rooms.forEach(room => {
        if(getUsersInRoom(room.name).length === 0){
            let index = rooms.indexOf(room.name);
            rooms.splice(index,1);
        }
    })
};

module.exports = {isMusician, existingRoom, addRoom, removeRoom, addValueToKey, isSamePassword};