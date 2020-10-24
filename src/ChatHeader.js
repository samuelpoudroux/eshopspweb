import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

const ChatHeader = ({ setChatActive, socket }) => {
  const closeTag = () => {
    // socket.emit('disconnect')
    setChatActive(false);
  };
  return (
    <div className="chatHeader">
      <div className="leftInnerContainer">
        <h3 style={{ color: "white" }}>En quoi puis je vous aider ?</h3>
      </div>
      <div className="rightInnerContainer">
        <CloseCircleOutlined
          onClick={() => closeTag()}
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
};
export default ChatHeader;
