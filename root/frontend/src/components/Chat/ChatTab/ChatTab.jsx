import React from 'react'
import { BsChatLeftText, BsFillChatLeftTextFill } from "react-icons/bs";

import './ChatTab.css'

import FooterChatTab from './FooterChatTab'
import UserMessagesTab from './UserMessagesTab'
import UserDetailsTab from './UserDetailsTab'

const ChatTab = ({ userChating, messagesUserChating, setMessagesUserChating, handleGetLastMessages, socket }) => {
    const isUserChating = JSON.stringify(userChating) != '{}'

    if (isUserChating) return (
        <div className="chat-tab">
            <UserDetailsTab userChating={userChating} />
            <UserMessagesTab userChating={userChating} messagesUserChating={messagesUserChating} />
            <FooterChatTab
                userChating={userChating}
                messagesUserChating={messagesUserChating}
                setMessagesUserChating={setMessagesUserChating}
                handleGetLastMessages={handleGetLastMessages}
                socket={socket} />
        </div>
    )
    else return (
        <div className="empty-chat">
            <BsChatLeftText className='icon icon-not-fill' />
            <BsFillChatLeftTextFill className='icon icon-fill' />
            <h5>Nada aqui!</h5>
            <p>Inicie uma conversa buscando pelo identificador do usuário ao lado ou abra uma conversa existente.</p>
        </div>
    )
}

export default ChatTab