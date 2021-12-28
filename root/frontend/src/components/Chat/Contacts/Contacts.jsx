import React, { useState, useEffect, useRef } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import Input from '../Input'
import ContactItem from './ContactItem'

import './Contacts.css'

const Contacts = ({ users, setUsers, handleGetUsers, handleGetLastMessages, setUsersChat, focusUsersChat, setFocusUsersChat, onClickUser }) => {
    const [inputSearchFocus, setInputSearchFocus] = useState(false)
    const inputSearch = useRef(null)

    return (
        <div className="contacts-container">
            <div className="input-container">
                <div
                    className="icon-input-container"
                    style={inputSearchFocus ?
                        { backgroundImage: "linear-gradient(360deg, #00B4DB, #0090b0)" } :
                        { backgroundColor: "linear-gradient(360deg, #00B4DB, #0090b0)" }}
                    onClick={() => inputSearch.current.focus()}>
                    <BiSearchAlt2 className='search-icon' />
                    <Input
                        setUsersChat={setUsersChat}
                        setFocusUsersChat={setFocusUsersChat}
                        handleGetUsers={handleGetUsers}
                        handleGetLastMessages={handleGetLastMessages}
                        inputSearchFocus={inputSearchFocus}
                        setInputSearchFocus={setInputSearchFocus}
                        inputSearch={inputSearch}
                        placeholder='Procurar...' />
                </div>
            </div>
            <div className="contacts">
                {focusUsersChat ? users.map((user) => <ContactItem user={user} focusUsersChat={focusUsersChat} onClickUser={onClickUser} />)
                    : users.map((user) => <ContactItem user={user} focusUsersChat={focusUsersChat} onClickUser={onClickUser} />)}
            </div>
        </div>
    )
}

export default Contacts