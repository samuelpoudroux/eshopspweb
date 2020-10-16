import React, { useContext, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Spin } from 'antd';
import { AppContext } from '../../context/context';

const Login = ({ history }) => {
  const { auth } = useContext(AppContext);
  const { login, user } = auth;
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    await login(values, history);
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ padding: '2%', height: '70vh' }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          boxShadow:
            '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
          background: '#fff',
          borderRadius: '2px',
          position: 'relative',
          width: 'auto',
          padding: '2%'
        }}
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
              label="Mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
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
            <a style={{ color: 'grey' }} href="/register">
              Register
            </a>
          </Col>
        </Form>
      </Row>
    </Row>
  );
};

export default Login;
