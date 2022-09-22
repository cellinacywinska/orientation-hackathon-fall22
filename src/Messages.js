import {Component} from "react";
import React from "react";
import image from "./ROBOT.png";


export default React.forwardRef((props, ref) => {


  function renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    const backgroundColor = messageFromMe ? "#FFEC33" : "black";
    return (
      <li className={className}>
      {!messageFromMe ?
      <img src={image}
        className="avatar"
      />  : <span className="avatar" style={{backgroundColor: "black"}}/>}

        <div className="Message-content">
          <div className="username">
            {member.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
    const {messages} = props ;
    return (
      <ul className="Messages-list" ref={ref}>
        {messages.map(m => renderMessage(m))}
      </ul>
    );
});

