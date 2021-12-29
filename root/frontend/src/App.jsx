import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import io from "socket.io-client";
import { isExpired, decodeToken } from "react-jwt";

import './App.css'
import Header from './components/Chat/Header/Header';
import Contacts from './components/Chat/Contacts/Contacts'
import ChatTab from './components/Chat/ChatTab/ChatTab'
import Login from './components/Register and Login/Login';
import Register from './components/Register and Login/Register';

const App = () => {
  const [userConnected, setUserConnected] = useState({})
  const [users, setUsers] = useState([{}])
  const [focusUsersChat, setFocusUsersChat] = useState(true)
  const [userChating, setUserChating] = useState({})
  const [messagesUserChating, setMessagesUserChating] = useState([{}])

  let socket;
  socket = io('http://localhost:3000')
  const useTest = () => useEffect(() => {
    generateUsers()

    const token = localStorage.getItem('token_key')
    const expiredToken = isExpired(token)
    let decodedToken = ''
    if (token && !expiredToken)
      decodedToken = decodeToken(token)

    socket.on('connection', (socketId) => {
      console.log('Conectado!')
      socket.emit('connected', decodedToken._id)
    })
    socket.on('teste', (msg) => {
      console.log('deuuu ' + msg)
    })

    return () => socket.disconnect()
  }, [])

  useTest()

  useEffect(() => {
    handleGetLastMessages()
  }, [userConnected])


  const generateUsers = async () => {
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
    if (response.status != 200)
      return
    let data = await response.json();
    data = data.filter(d => d.lastMessage)
      .sort((a, b) => (a.lastMessageDate > b.lastMessageDate) ? -1 : ((b.lastMessageDate > a.lastMessageDate) ? 1 : 0))
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
                      userChating={userChating}
                    />
                    <ChatTab
                      userChating={userChating}
                      messagesUserChating={messagesUserChating}
                      setMessagesUserChating={setMessagesUserChating}
                      handleGetLastMessages={handleGetLastMessages}
                      socket={socket} />
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
