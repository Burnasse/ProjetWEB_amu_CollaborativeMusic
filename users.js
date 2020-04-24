const users = [];

const existingUser = (userName) => {
    return users.find((user) => user.name === userName);
}

const addUser = ({ idSocket, name, room}) => {
    room = room.trim().toLowerCase();

    const user = { idSocket, name, room}
    users.push(user)

    return { user }
}

const removeUser = (idSocket) => {
    const index = users.findIndex((user) => user.idSocket === idSocket)

    if(index !== -1)
        return users.splice(index,1)[0]
}

const getUser = (idSocket) => users.find((user) => user.idSocket === idSocket)

const getUsersInRoom = (room) => {
    users.filter((user) => user.room === room)
}



module.exports = {existingUser, addUser, removeUser, getUser, getUsersInRoom};