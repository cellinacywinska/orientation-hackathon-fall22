import React, { Component, useState } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import { useChatScroll } from './chatScroll.js';


export default () => {

  const [messages, setMessages] = useState([{ member: { id: 1 }, text: "I need to learn React..." }]);
  const [member, setMember] = useState({
    id: 1,
    username: "you",
    color: randomColor(),
  });

  const ref = useChatScroll(messages);


  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

  function onSendMessage(isYou, username, text) {
    setMessages([...messages,
    { member: { id: isYou ? 1 : 2, username: isYou ? "You" : username }, text: text },
    { member: { id: 2, username: "Assistant" }, text: "To learn React head over to FreeCodeCamp!" }],
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Cody</h1>
      </div>
      <Messages
        messages={messages}
        currentMember={member}
        ref={ref}
      />
      <Input
        onSendMessage={onSendMessage}
      />

      <footer className='footer'> © MLH Orientation Hackathon 2022</footer>
    </div>


  );
};