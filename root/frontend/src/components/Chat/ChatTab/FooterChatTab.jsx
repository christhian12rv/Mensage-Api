import React from 'react'
import { BiSend } from 'react-icons/bi'
import InputChatTab from '../ChatTab/InputChatTab'

import './FooterChatTab.css'

const FooterChatTab = () => {
    return (
        <footer className='footer-chat-tab'>
            <InputChatTab />
            <BiSend className='send-message-button' />
        </footer>
    )
}

export default FooterChatTab