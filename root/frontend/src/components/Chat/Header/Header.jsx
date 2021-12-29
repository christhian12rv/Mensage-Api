import React from 'react'
import LogOutButton from './LogOutButton'

import './Header.css'

import imgTest from '../../../assets/logo192.png'

const Header = ({ userConnected }) => {
    return (
        <div className='header-container'>
            <h4>MERN Chat</h4>
            <div className="user-name-container">
                <img src={userConnected.avatar} />
                <h4>#{userConnected.username}</h4>
            </div>
            <LogOutButton />
        </div>
    )
}

export default Header