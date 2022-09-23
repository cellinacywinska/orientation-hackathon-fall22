import React from "react";
import image from "../blue robot.png";
import { ReactTinyLink } from 'react-tiny-link';


export default React.forwardRef((props, ref) => {
  function renderMessage(message) {
    const { member, text } = message;
    const { currentMember } = props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    const backgroundColor = messageFromMe ? "#FFEC33" : "black";
    return (
      <li className={className}>
        {!messageFromMe ?
          <img src={image}
            className="avatar"
          /> : <span className="avatar" style={{
            backgroundColor: "#00B2FF"
          }} />}
        <div className="Message-content">
          <div className="username">{member.username}</div>
         {
            text.option === 'text' ? <div className="text">{text.content}</div> : 
            <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={text.content}
          />}
        </div>
      </li>
    );
  }
  const { messages } = props;
  return (
    <ul className="Messages-list" ref={ref}>
      {messages.map((m) => renderMessage(m))}
    </ul>
  );
});
