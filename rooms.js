const {getUsersInRoom} = require("./users");

const rooms = [];
const map = [];

const addValueToKey = (key, value) => {
    map[key] = map[key] || [];
    map[key].push(value);
};

function isMusician(user) {
    let bool = Boolean(false);

    map[user.room].forEach(userName => {
        if(userName === user.name)
            bool = Boolean(true);
    });

    return Boolean(bool);
}

const existingRoom = (roomName) => {
    return rooms.find((room) => room === roomName);
};

const addRoom = (newRoom, username) => {
    addValueToKey(newRoom, username);
    rooms.push(newRoom)
};

const removeRoom = () => {
    rooms.forEach(room => {
        if(getUsersInRoom(room).length === 0){
            let index = rooms.indexOf(room);
            rooms.splice(index,1);
        }
    })
};

module.exports = {isMusician, existingRoom, addRoom, removeRoom, addValueToKey};