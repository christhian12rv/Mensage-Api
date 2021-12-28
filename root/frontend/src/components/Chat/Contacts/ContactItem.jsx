import React from 'react'
import LogOutButton from '../../../assets/logo192.png'

import './ContactItem.css'

const ContactItem = ({ user, focusUsersChat, onClickUser }) => {
    return (
        <div className="contact-item-container" onClick={() => onClickUser(user)}>
            <img src={user.avatar}></img>
            <div className="contact-item-name-chat-container">
                <p className='user-name'>{user.name}</p>
                <p className='user-message-username'>{focusUsersChat ? user.lastMessage : '#' + user.username}</p>
            </div>
        </div>
    )
}

export default ContactItem