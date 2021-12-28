import React, { useEffect } from 'react'
import Messages from './Messages'

import './UserMessagesTab.css'

const UserMessagesTab = ({ userChating, messagesUserChating }) => {

    useEffect(() => {
        const elem = document.getElementById('user-messages-tab')
        elem.scrollTop = elem.scrollHeight - elem.clientHeight;
    }, [messagesUserChating])
    return (
        <div className="user-messages-tab" id="user-messages-tab">
            {messagesUserChating.map((message => <Messages userChating={userChating} message={message} />))}
        </div>
    )
}

export default UserMessagesTab