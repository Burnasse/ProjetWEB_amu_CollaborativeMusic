import React, {useContext, useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import '../joinRoom/Join.css';
import app from '../../firebaseConfig'
import {SocketContext} from "../../App";
import * as firebase from "firebase";

const CreateRoom = () => {
    const socket = useContext(SocketContext);

    const [room, setRoom] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let isredirect = true;
        socket.on('response', (response) => {
            if(response === "canCreate")
                setRedirect(true);
        });

        return () => isredirect = false;
    },[redirect,socket]);

    const canCreate = (room, password) => {
        if(!room)
            return alert("Room is empty");

        setRoom(room);
        let user = firebase.auth().currentUser;

        socket.emit("canCreate", user.displayName, room, password, (error) => {
            if(error)
                return alert(error);
        });

    };
    
    if(redirect === true)
        return <Redirect to={`/musicroom?room=${room}`}/>;


    return(
            <div className="joinIn">
                <h1 className="head">Create a music room</h1>
                <div><input placeholder="Room" className="joinInput" type="text" onChange={(event => setRoom(event.target.value))}/></div>
                <div><input placeholder="Password (optionnal)" className="joinInput" type="password" onChange={(event => setPassword(event.target.value))}/></div>
                <button onClick={() => canCreate(room, password)} className="button" type="submit"> Create</button>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
    )
};

export default CreateRoom;