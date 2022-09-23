import React, { useState } from "react";
import "./App.css";
import Messages from "./Components/Messages";
import Input from "./Components/Input";
import { useChatScroll } from "./Components/chatScroll.js";

export default () => {
  const [messages, setMessages] = useState([
    { member: { id: 1 }, text: {option: "text", content: "I need to learn React..." }},
  ]);
  const [member, setMember] = useState({
    id: 1,
    username: "you",
    color: randomColor(),
  });

  const ref = useChatScroll(messages);

  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  function onSendMessage(isYou, username, text) {
    setMessages([
      ...messages,
      {
        member: { id: isYou ? 1 : 2, username: isYou ? "You" : username },
        text: text,
      }
    ]);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Cody</h1>
      </div>

      <Messages messages={messages} currentMember={member} ref={ref} />
      <Input onSendMessage={onSendMessage} />

      <footer className="footer"> © MLH Orientation Hackathon 2022</footer>
    </div>
  );
};
