import React, { useState } from 'react';
import './Chat.css';
import {Avatar, IconButton} from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';

function Chat({ messages }) {

    const [input, setInput] = useState('');
    
    const sendMessage = async (e) => {
        e.preventDefault();

        if(input!==""){
            await axios.post('/messages/new', {
                message: input,
                name: 'Mica',
                timestamp: new Date().toUTCString(),
                received: true
            });

            setInput("");
        }
        
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"/>
                <div className="chat__headerInfo">
                    <h3>Mica Medaido</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p key={message.timestamp} className={`chat__message ${message.received && "chat__receiver"}`}>
                        {
                            message.received === false ? 
                                <span className="chat__name">{message.name}</span>
                            :
                                <span className="chat__timestamp">{message.timestamp}</span>
                             
                        }
                        {message.message}
                        {
                            message.received === true ? 
                                <span className="chat__name">{message.name}</span>
                            :
                                <span className="chat__timestamp">{message.timestamp}</span>
                             
                        }
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmotionIcon/>
                <form>
                    <input type="text" value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type message soon"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
