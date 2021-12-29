import React, { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { isExpired, decodeToken } from "react-jwt";
import { toast } from 'react-toastify';
import io from "socket.io-client";
import InputChatTab from '../ChatTab/InputChatTab'

import './FooterChatTab.css'

const FooterChatTab = ({ userChating, messagesUserChating, setMessagesUserChating, handleGetLastMessages }) => {
    const navigate = useNavigate()
    const [textInputChatTab, setTextInputChatTab] = useState('')
    let socket;
    socket = io()
    useState(() => {
        socket.on('receiveMessage', (asdf) => {
            console.log('testa')
            handleFormSend(null)
        })
    })
    const handleFormSend = (e) => {
        e && e.preventDefault()
        const sendMessage = async () => {
            const token = localStorage.getItem('token_key')
            const expiredToken = isExpired(token)
            if (!token && expiredToken)
                return navigate("/login", { replace: true })

            const response = await fetch('http://localhost:5000/messages/' + userChating._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ text: textInputChatTab })
            })
            const data = await response.json()

            if (response.status == 200) {
                setMessagesUserChating([...messagesUserChating, {
                    text: data.text,
                    isReceiver: data.receiver == userChating._id,
                    createdAt: data.createdAt
                }])
                const inputSearch = document.getElementById('input-search')
                if (inputSearch.value.trim() == '')
                    handleGetLastMessages()

                socket.emit('join', { fromId: userChating._id })
            }
            else
                toast.error('Houver um erro ao tentar enviar a mensagem', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
        }

        sendMessage()
    }

    return (
        <footer className='footer-chat-tab' >
            <form id='form-send-message' onSubmit={handleFormSend}>
                <InputChatTab textInputChatTab={textInputChatTab} setTextInputChatTab={setTextInputChatTab} />
                <button type='submit'><BiSend className='send-message-button' /></button>
            </form>
        </footer>
    )
}

export default FooterChatTab