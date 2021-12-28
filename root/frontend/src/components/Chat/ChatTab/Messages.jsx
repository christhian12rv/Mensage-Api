import React from 'react'

import './Messages.css'

const Messages = ({ userChating, message }) => {
    if (!message.isReceiver) return (
        <div className="message-tab">
            <img src={userChating.avatar}></img>
            <div className="message is-receiver">
                <p>{message.text}</p>
                <small>{message.createdAt}</small>
            </div>
        </div>
    )
    else return (
        <div className="message-tab" style={{ justifyContent: 'right' }}>
            <div className="message">
                <p>{message.text}</p>
                <small>{message.createdAt}</small>
            </div>
        </div>
    )
}

export default Messages