import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import './Chat.css';

const Chat = ({socket, room, name}) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])

        })
    },[message, messages, socket])

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