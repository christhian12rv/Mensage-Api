import React from 'react'

import './InputChatTab.css'

const Input = ({ textInputChatTab, setTextInputChatTab }) => {
    const handleTextInputChatTab = (e) => {
        setTextInputChatTab(e.target.value)
    }

    return (
        <input
            className='input-chat'
            type='text'
            placeholder='Digite uma mensagem...'
            value={textInputChatTab}
            onChange={handleTextInputChatTab}
            name='etasetas'
            id='asdfew'
        />
    )
}

export default Input