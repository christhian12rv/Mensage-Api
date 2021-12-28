import React from 'react'

import './Input.css'

const Input = ({ inputSearchFocus, setInputSearchFocus, inputSearch, placeholder, handleGetUsers, handleGetLastMessages, setFocusUsersChat }) => {

    const handleInputSearchFocus = () => {
        setInputSearchFocus(!inputSearchFocus)
    }

    const handleInputChange = (e) => {
        if (e.target.value.trim() != '') {
            setFocusUsersChat(false)
            handleGetUsers(e.target.value)
        } else {
            setFocusUsersChat(true)
            handleGetLastMessages()
        }
    }

    return (
        <input
            className='input-search'
            id='input-search'
            ref={inputSearch}
            onFocus={handleInputSearchFocus}
            onBlur={handleInputSearchFocus}
            type='text'
            placeholder={placeholder}
            onChange={handleInputChange} />
    )
}

export default Input