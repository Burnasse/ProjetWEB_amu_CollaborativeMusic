import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import './Chat.css';

const Chat = ({location, socket, addrLocation}) => {

    console.log(location)
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        console.log(name, room)

        setRoom(room)
        setName(name)

        socket.emit('JOIN', {name, room}, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [addrLocation, location.search, socket]) // seulement si LOCATION et location.search change

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