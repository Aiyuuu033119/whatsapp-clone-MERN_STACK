import React from 'react';
import './SidebarChat.css';
import Avatar from '@material-ui/core/Avatar';

function SidebarChat({name, message, url}) {
    return (
        <div className="sidebarChat">
            <Avatar src={url}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default SidebarChat
