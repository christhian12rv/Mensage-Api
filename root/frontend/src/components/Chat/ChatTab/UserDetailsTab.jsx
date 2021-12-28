import React from 'react'

import './UserDetailsTab.css'

const UserDetailsTab = ({ userChating }) => {
    return (
        <div className="user-details-tab">
            <img src={userChating.avatar}></img>
            <div className="user-name-tab">
                <h4 className='user-name'>{userChating.name}</h4>
                <p className='user-identifier'>#{userChating.username}</p>
            </div>
        </div>
    )
}

export default UserDetailsTab