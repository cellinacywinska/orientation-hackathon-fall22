import { Component } from "react";
import React from "react";
import axios from "axios";

class Input extends Component {
  state = {
    text: "",
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(true, "Assistant", { option: "text", content: this.state.text});
    // Send post request to the server 
    const res = await axios.post("http://127.0.0.1:5000", { headers: {
      'Content-Type': 'application/json'
  }, message: this.state.text});
    const message = res.data.message;

    const greetings = ["Hello!","Hey, nice to see you", "Hi there","Hey!","Hi, welcome"];

    for (let i = 0; i < greetings.length; i++) {
      if(message === greetings[i]) {
        this.props.onSendMessage(false, "Assistant", { option: "text", content: message});
        return;
      }
    }
    if(message === 'Sorry, please rephrase your question') {
      this.props.onSendMessage(false, "Assistant", { option: "text", content: message});
      return;
    }
   

    console.log(message.split(" ").join("+"));

    this.props.onSendMessage(false, "Assistant", { option: "text", content: "Here is what I found!"});

    const res2 = await axios.get("http://localhost:8000/api/v1/youtube?q="+ (message.split(" ").join("+")));
    
    this.props.onSendMessage(false, "Assistant", { option: "link", content: res2.data});

  
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
            name="nm"
          />
          <button className="sendButton">Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
