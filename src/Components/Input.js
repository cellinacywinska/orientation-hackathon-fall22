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
    this.props.onSendMessage(false, "Assistant", { option: "text", content: res.data.message});
    if(res.data.links){
      for(const link in res.data.links){
        this.props.onSendMessage(false, "Assistant", { option: "link", content: link});
      }
    }
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
