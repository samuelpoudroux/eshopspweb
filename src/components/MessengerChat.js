import React from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";

const { REACT_APP_FACEBOOK_PAGE_ID, REACT_APP_FACEBOOK_APP_ID } = process.env;

export const MessengerChat = () => {
  return (
    <MessengerCustomerChat
      pageId={REACT_APP_FACEBOOK_PAGE_ID}
      appId={REACT_APP_FACEBOOK_APP_ID}
      language="FR"
      themeColor="#fde162"
    />
  );
};
