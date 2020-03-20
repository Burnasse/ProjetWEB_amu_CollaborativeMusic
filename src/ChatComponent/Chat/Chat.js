import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import './css/Chat.css';


let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const LOCATION = "localhost:5000"

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        socket = io(LOCATION);

        setRoom(room)
        setName(name)

        socket.emit('JOIN', {name, room}, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [LOCATION, location.search]) // seulement si LOCATION et location.search change

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])

        })
    },[message, messages])

    const sendMessage = (event) => {
        event.preventDefault()

        if(message)
            socket.emit('sendMessage', message, () => setMessage(''));
    }

    console.log(message, messages)

    return (
        <div className="outContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
export default Chat;