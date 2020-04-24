import React, {useContext, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import '../Join/Join.css';
import app from '../../firebaseConfig'
import {SocketContext} from "../../App";

const CreateRoom = () => {
    const socket = useContext(SocketContext);

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        socket.on('response', (response) => {
            setRedirect(response);
            socket.off();
        })
    },[redirect,socket])


    const canCreate = (name, room, password) => {
        if(!name)
            return alert("Name is empty");

        if(!room)
            return alert("Room is empty");

        socket.emit("canCreate", name, room, password, (error) => {
            if(error)
                return alert(error);
        });

    }
    
    if(redirect === true)
        return <Redirect to={`/musicroom?name=${name}&room=${room}`}/>

    return(
            <div className="joinIn">
                <h1 className="head">Create a music room</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event => setName(event.target.value))}/></div>
                <div><input placeholder="Room" className="joinInput" type="text" onChange={(event => setRoom(event.target.value))}/></div>
                <div><input placeholder="Password (optionnal)" className="joinInput" type="text" onChange={(event => setPassword(event.target.value))}/></div>
                <button onClick={() => canCreate(name,room, password)} className="button" type="submit"> Join</button>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
    )
};

export default CreateRoom;