import React, {useContext, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import './Join.css';
import app from '../../firebaseConfig';
import {SocketContext} from "../../App";

const JoinRoom = () => {
    const socket = useContext(SocketContext);

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        socket.on('response', (response) => {
            setRedirect(response);
            socket.off();
        })
    },[redirect,socket]);


    const canJoin = (name, room) => {
        if(!name)
            return alert("Name is empty");
        if(!room)
            return alert("Room is empty");

        socket.emit("canJoin", name, room, (error) => {
            if(error)
                return alert(error);
        })

    };

    if(redirect === true)
        return <Redirect to={`/musicroom?name=${name}&room=${room}`}/>;

    return(
            <div className="joinIn">
                <h1 className="head">Join a music room</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event => setName(event.target.value))}/></div>
                <div><input placeholder="Room" className="joinInput" type="text" onChange={(event => setRoom(event.target.value))}/></div>
                <button onClick={() => canJoin(name,room)} className="button" type="submit"> Create</button>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
    )
};

export default JoinRoom;