import React, { useState, useEffect } from 'react'
import Header from './components/Chat/Header/Header';
import Contacts from './components/Chat/Contacts/Contacts'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import io from "socket.io-client";
import { isExpired, decodeToken } from "react-jwt";

import './App.css'
import FooterChatTab from './components/Chat/ChatTab/FooterChatTab';
import UserMessagesTab from './components/Chat/ChatTab/UserMessagesTab';
import UserDetailsTab from './components/Chat/ChatTab/UserDetailsTab';
import Login from './components/Register and Login/Login';
import Register from './components/Register and Login/Register';

const App = () => {
  const [userConnected, setUserConnected] = useState({})
  const [users, setUsers] = useState([{}])
  const [focusUsersChat, setFocusUsersChat] = useState(true)
  const [userChating, setUserChating] = useState({})
  const [messagesUserChating, setMessagesUserChating] = useState([{}])

  let socket;
  useEffect(() => {
    socket = io()

    socket.on('connection', (sock) => {
      console.log('Conectado')
    })
  }, [])


  useEffect(() => {
    generateUsers()
  }, [])

  useEffect(() => {
    handleGetLastMessages()
  }, [userConnected])

  const generateUsers = () => {
    const token = localStorage.getItem('token_key')
    const expiredToken = isExpired(token)
    if (token && !expiredToken) {
      const decodedToken = decodeToken(token)
      setUserConnected({ token: token, ...decodedToken })
      handleGetLastMessages(token)
    } else
      setUserConnected({})
  }



  const tokenExists = () => {
    const token = localStorage.getItem('token_key')
    const expiredToken = isExpired(token)
    if (token && !expiredToken)
      return true
    return false
  }

  const handleGetUsers = async (input) => {
    const response = await fetch('http://localhost:5000/users?input=' + input, {
      headers: { 'x-access-token': userConnected.token }
    })
    const data = await response.json()
    setUsers(data)
  }

  const handleGetLastMessages = async (token) => {
    const response = await fetch('http://localhost:5000/users', {
      headers: { 'x-access-token': token ? token : userConnected.token }
    })
    let data = await response.json();
    data = data.filter(d => d.lastMessage)
    setUsers(data)
  }

  const onClickUser = async (user) => {
    const response = await fetch('http://localhost:5000/messages/' + user._id, {
      headers: { 'x-access-token': userConnected.token }
    })
    const data = await response.json()

    setUserChating(user)
    setMessagesUserChating(data)
  }


  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={
            tokenExists() ?
              <>
                <div className="container">
                  <Header userConnected={userConnected} />
                  <div className="chat-container">
                    <Contacts
                      users={users}
                      setUsers={setUsers}
                      handleGetUsers={handleGetUsers}
                      handleGetLastMessages={handleGetLastMessages}
                      focusUsersChat={focusUsersChat}
                      setFocusUsersChat={setFocusUsersChat}
                      onClickUser={onClickUser}
                    />
                    <div className="chat-tab">
                      <UserDetailsTab userChating={userChating} />
                      <UserMessagesTab userChating={userChating} messagesUserChating={messagesUserChating} />
                      <FooterChatTab />
                    </div>
                  </div>
                </div>
              </>
              : <Navigate to="/login" />
          } />
          <Route path="/login" element={<Login userConnected={userConnected} setUserConnected={setUserConnected} />} />
          <Route path="/register" element={<Register users={users} setUsers={setUsers} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
