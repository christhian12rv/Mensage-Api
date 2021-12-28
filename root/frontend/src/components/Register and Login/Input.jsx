import React from 'react'

import './Input.css'

const Input = ({ type, placeholder, state, setState }) => {
    const handleInputChange = (e) => {
        setState(e.target.value)
    }

    return (
        <input
        className='input-login' 
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={handleInputChange}/>
    )
}

export default Input