import React, { useContext, useState, useEffect, } from 'react';
import { Button, Col, Row } from 'antd'

const ChatFeedComponent = ({messages, socket, history}) => {
  const [messageEnd, setMessageEnd] = useState()

  useEffect(() => {
    if(messageEnd !== undefined) {
      messageEnd.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  const sendResponseToBot = (value, previousMessage) => {
    socket.emit('newMessage', {id:1, message:value, questionOrigin: previousMessage})
  }


console.log('history', history);
return <Col lg={24} style={{position:'relative', overflow: 'scroll', maxHeight:'350px',webkitOverflowScroll: 'touch'}}>
{
  messages.length > 0 && messages.map(value => {
      const {id, message, type,choice, redirect} = value
        return <Row style={{marginTop: 25}} justify={id === 0 ? 'start': 'end'}>
        <Col lg={18} style={{background: id ===0 ? '#89ba17' : "grey",  padding:20, borderRadius:50, width:'60%'}}>
        {redirect  && redirect !== "products" &&  history.push(`/${redirect}`)}
        {redirect  && redirect === "products" &&  history.push(`/`)}
         <Row justify='center' >
         <p style={{color:'white', fontSize:"1.2em", textAlign:'center'}}>
         {message}
         </p>
         </Row>         
         <Row justify='center'>
         {type && type === 'choice' && choice && choice.map(value => <input type='button' style={{background:value === 'oui' ? 'white' : 'grey', border:"none"}} value={value} onClick={(e) => sendResponseToBot(e.target.value, message)} />)}
         </Row>         
         </Col>
        </Row>
  } ) 
}

<div style={{ float:"left", clear: "both" }}
ref={(el) => { setMessageEnd(el) }}>
</div>

</Col>

}
export default ChatFeedComponent;

