import React, {useContext, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import './Join.css';
import app from '../../firebaseConfig';
import {SocketContext} from "../../App";
import * as firebase from "firebase";

const JoinRoom = () => {
    const socket = useContext(SocketContext);

    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let isredirect = true;
        socket.on('response', (response) => {
            if(response === "canJoin")
                setRedirect(true);
        })

        return () => isredirect = false;
    },[redirect,socket]);

    const canJoin = (room) => {
        if(!room)
            return alert("Room is empty");

        let user = firebase.auth().currentUser;

        socket.emit("canJoin", user.displayName, room, (error) => {
            if(error)
                return alert(error);
        })

    };

    if(redirect === true)
        return <Redirect to={`/musicroom?room=${room}`}/>;

    return(
            <div className="joinIn">
                <h1 className="head">Join a music room</h1>
                <div><input placeholder="Room" className="joinInput" type="text" onChange={(event => setRoom(event.target.value))}/></div>
                <div><input placeholder="Password (optionnal)" className="joinInput" type="password" onChange={(event => setPassword(event.target.value))}/></div>
                <button onClick={() => canJoin(room)} className="button" type="submit"> Join</button>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
    )
};

export default JoinRoom;