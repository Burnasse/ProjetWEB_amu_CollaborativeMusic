const users = []

const addUser = ({ idSocket, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name)

    if (existingUser)
        return {error: 'Username already exist'};

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

module.exports = {addUser, removeUser, getUser, getUsersInRoom};