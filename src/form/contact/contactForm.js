import React, { useContext, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Spin } from 'antd';
import { AppContext } from '../../context/context';
import TextArea from 'antd/lib/input/TextArea';
import useResponsive from '../../customHooks/responsiveHook';

const ContactForm = ({ history }) => {
  const { auth } = useContext(AppContext);
  const { login, user } = auth;
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useResponsive();

  const onFinish = async (values) => {
    setIsLoading(true);
    // await login(values, history);
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{ padding: '2%', height: !isMobile && '70vh' }}
    >
    <Col lg={11} sm={24} xs={24} style={{
        boxShadow:
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        background: '#fff',
        borderRadius: '2px',
        padding:'2%'
      }}>
      <Row
        justify="center"
        align="middle"
       
      >
      <Form
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Col>

            <Form.Item
              label="Nom"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Merci d'indiquer votre nom"
                }
              ]}
            >
            <input />
            </Form.Item>
            <Form.Item
              label="Prénom"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Merci d'indiquer votre prénom"
                }
              ]}
            >
            <input />
            </Form.Item>
            <Form.Item
              label="Tél"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Merci de renseigner un numéro de téléphone valide pour qu'on puisse vous recontacter",
                  pattern: new RegExp(
                    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
                  )
                }
              ]}
            >
              <input />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Merci d'indiquer votre message"
                }
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ background: '#89ba17', border: 'none' }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
            {isLoading && <Spin />}
            {user.error && <p style={{ color: 'red' }}>{user.error}</p>}
          </Col>
        </Form>
        
      </Row>
      </Col>
      <Col lg={11} sm={24}  xs={24} style={{
        boxShadow:
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        background: '#fff',
        borderRadius: '2px',
        position: 'relative',
        width: 'auto',
        padding:"2%"}}>
      contact
      </Col>
    </Row>
  );
};

export default ContactForm;
