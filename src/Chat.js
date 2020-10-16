import React, { useContext, useState, useEffect} from 'react';
import ChatFeedComponent from './ChatFeed';
import ChatHeader from './ChatHeader';
import * as io from 'socket.io-client';
import {Col, Row, Button} from 'antd'
import useResponsive from './customHooks/responsiveHook';
import { AppContext } from './context/context';

const Chat = ({setChatActive, history}) => {
  const [messages, setMessages] = useState([])
  const { isMobile } = useResponsive();
  
  const { auth} = useContext(AppContext);
  const socket = io(process.env.REACT_APP_API_DOMAIN)
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_DOMAIN)
    socket.emit('connected')
    socket.on('connected', (messages) => {
    setMessages(messages)    });
    return () => socket.disconnect();
  }, [])

 
  socket.on('newMessage', (messages) => {
    setMessages(messages)  
    }); 

  return(
  <div style={{ width: isMobile ? '100%' : '25%', display:'flex',   
   flexDirection:'column', justifyContent:'space-between', marginTop: 50}} >
  <ChatHeader  socket ={socket} setChatActive={setChatActive} />
  <Row style={{width:'100%'}}>
  
  <ChatFeedComponent messages={messages} socket={socket} history={history}/>
  </Row>
  
</div>)
}
  
  export default Chat;