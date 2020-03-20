import React from "react";
import './Message.css';

const Message = ({message: {user, text}, name}) => {
    let isCurrentUser = false;

    const trimName = name.trim().toLowerCase()

    if (user === trimName) {
        isCurrentUser = true;
    }

    return (
        isCurrentUser ? (
                <div className="msgContainer">
                    <p className="sentText">{trimName}</p>
                    <div className="msgBox">
                        <p className="msgText">{text}</p>
                    </div>
                </div>
            )
            : (
                <div className="msgContainer">
                    <div className="msgBox">
                        <p className="msgText">{text}</p>
                    </div>
                    <p className="sentText">{user}</p>
                </div>
            )
    )
}

export default Message;