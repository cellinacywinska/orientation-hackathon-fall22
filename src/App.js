import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ member: { id: 1 }, text: "I need to learn React..." }],
      member: {
        id: 1,
        username: "you",
        color: randomColor(),
      }
    }
    this.onSendMessage = this.onSendMessage.bind(this);

  }

  onSendMessage(isYou, username, text) {
    this.setState({
      messages: [...this.state.messages,
      { member: { id: isYou ? 1 : 2, username: isYou ? "You" : username }, text: text },
      { member: { id: 2, username: "Assistant" }, text: "To learn React head over to FreeCodeCamp!" }],
      member: this.state.member
    })
  }

 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />

      </div>

    );
  }
}

export default App;