import React from "react";

const MessageRecipient = ({ children }) => {
  return (
    <div style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
      {children}
    </div>
  );
};

export default MessageRecipient;