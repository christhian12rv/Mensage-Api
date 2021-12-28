import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { isExpired, decodeToken } from "react-jwt";

import Button from './Button'
import Input from './Input'

import './Login.css'


const Login = ({ userConnected, setUserConnected }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const registerUser = async () => {
            if (username.trim() == '' || password.trim() == '')
                return toast.error('Dados incorretos', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();

            if (response.status == 200) {
                localStorage.setItem("token_key", data.token)
                const decodedToken = decodeToken(data.token)
                setUserConnected({ token: data.token, ...decodedToken })
                navigate("/", { replace: true })
            } else
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
        }

        registerUser()
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <hr />
                <div className='input-container'>
                    <p style={{ color: "rgb(187, 187, 187)" }}>#</p>
                    <Input type='text' placeholder='Usuário' state={username} setState={setUsername} />
                </div>
                <div className='input-container'>
                    <p>&nbsp;&nbsp;</p>
                    <Input type='password' placeholder='Senha' state={password} setState={setPassword} />
                </div>
                <Button text='Login' onClick={handleLogin} />
                <p>Não tem uma conta? <Link className='register-link' to='/register'>Registrar</Link></p>
            </div>
        </div>
    )
}

export default Login