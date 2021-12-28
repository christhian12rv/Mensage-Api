import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";

import './LogOutButton.css'

const LogOutButton = () => {
    return (
        <button className='logout-button'>
            <BiLogOutCircle style={{ strokeWidth: '.5px' }} />
            <p>Sair</p>
        </button>
    )
}

export default LogOutButton