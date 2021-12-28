import React from 'react'
import Messages from './Messages'

import './UserMessagesTab.css'

const UserMessagesTab = ({ userChating, messagesUserChating }) => {
    console.log(messagesUserChating)
    return (
        <div className="user-messages-tab">
            {messagesUserChating.map((message => <Messages userChating={userChating} message={message} />))}
        </div>
    )
}

export default UserMessagesTab