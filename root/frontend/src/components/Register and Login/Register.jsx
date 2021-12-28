import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from './Button'
import Input from './Input'

import './Register.css'
import 'react-toastify/dist/ReactToastify.css';

const Register = ({usernames, setUsers}) => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegisterUser = () => {
        const registerUser = async () => {
            if (name.trim() == '' || username.trim() == '' || password.trim() == '')
                return toast.error('Dados incorretos', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    password: password
                })
            })
            const data = await response.json();
            
            if (response.status == 200) {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate("/login", { replace: true })
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
        <div className="register-container">
            <div className="register-form">
                <h1>Registrar</h1>
                <hr />
                <div className='input-container' >
                    <p>&nbsp;&nbsp;</p>
                    <Input type='text' placeholder='Nome completo' state={name} setState={setName} />
                </div>
                <div className='input-container'>
                    <p style={{ color: "rgb(187, 187, 187)" }}>#</p>
                    <Input type='text' placeholder='Usuário' state={username} setState={setUsername} />
                </div>
                <div className='input-container'>
                    <p>&nbsp;&nbsp;</p>
                    <Input type='password' placeholder='Senha' state={password} setState={setPassword} />
                </div>
                <Button text='Registrar' onClick={handleRegisterUser} />
                <p>Já tem uma conta? <Link className='login-link' to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register