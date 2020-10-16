import React, { useState } from 'react';

import Validator from 'validator';
import Axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_AUTH,
  REACT_APP_API_AUTH_REGISTER
} = process.env;
const Register = ({ history }) => {
  const onFinish = async (values) => {
    const { data } = await Axios.post(
      REACT_APP_API_DOMAIN + REACT_APP_API_AUTH + REACT_APP_API_AUTH_REGISTER,
      values
    );
    const { errors, message } = data;
    if (!errors && message) {
      notification.open({
        message: message,
        icon: <SmileOutlined style={{ color: '#89ba17' }} />
      });
      history.push('/login');
    }
    if (errors && !message) {
      notification.open({
        message: errors,
        icon: <SmileOutlined style={{ color: 'red' }} />
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{ padding: '2%', minHeight:'70vh'}}
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
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Col>
            <Form.Item
              label="Nom"
              name="lastName"
              rules={[
                {
                  required: true,
                  min: 4,
                  message: 'Nom oligatoire avec minimum 4 caractéres'
                }
              ]}
              onChange = {(e) => localStorage.setItem(e.target.name, e.target.value)}      
              hasFeedback
            >
              <Input name='lastName'  defaultValue = {localStorage.getItem('lastName')}
              />
            </Form.Item>
            <Form.Item
              label="Prénom"
              name="firstName"
              rules={[
                {
                  required: true,
                  min: 4,
                  message: 'Prénom oligatoire avec minimum 4 caractéres'
                }
              ]}
              onChange = {(e) => localStorage.setItem(e.target.name, e.target.value)}      
              hasFeedback
            >
              <Input name='firstName'   defaultValue = {localStorage.getItem('firstName')}    />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Merci d'indiquer votre email!"
                },
                () => ({
                  validator(rule, value) {
                    if (!Validator.isEmail(value)) {
                      return Promise.reject('Email invalide');
                    }

                    return Promise.resolve();
                  }
                })
              ]}
              onChange = {(e) => localStorage.setItem(e.target.name, e.target.value)}      
            >
              <Input name='email'  defaultValue = {localStorage.getItem('email')} />
            </Form.Item>
            <Form.Item
              label="mot de passe"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Merci d'indiquer un mot de passe"
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirmer mot de passe"
              name="repeat_password"
              rules={[
                {
                  required: true,
                  message: 'Merci de confirmer votre mot de passe!'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'Les deux mots de passe ne correspondent pas!'
                    );
                  }
                })
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Adresse de facturation"
              name="billsAddress"
              rules={[
                {
                  required: true,
                  min: 8,
                  message:
                    'Merci de renseigner votre adresse de facturation minimum 8 caractéres!'
                }
              ]}
              onChange = {(e) => localStorage.setItem(e.target.name, e.target.value)}      
              hasFeedback
            >
              <Input name="billsAddress"   defaultValue = {localStorage.getItem('billsAddress')} 
              />
            </Form.Item>
            <Form.Item
              label="Adresse de Livraison"
              name="dropAddress"
              rules={[
                {
                  required: true,
                  min: 8,
                  message:
                    'Merci de renseigner votre adresse de livraison minimum 8 caractéres!'
                }
              ]}
              onChange = {(e) => localStorage.setItem(e.target.name, e.target.value)}      
              hasFeedback
            >
              <Input  name='dropAddress'  defaultValue = {localStorage.getItem('dropAddress')}   />
            </Form.Item>
            <Form.Item
              label="Numéro de téléphone"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Merci de renseigner un numéro de téléphone valide',
                  pattern: new RegExp(
                    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
                  )
                }
              ]}
              onChange = {(e) => localStorage.setItem(e.target.name, e.target.value)}      
              hasFeedback
            >
              <Input name="phoneNumber"   defaultValue = {localStorage.getItem('phoneNumber')} 
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ background: '#89ba17', border: 'none' }}
                type="primary"
                htmlType="submit"
              >
                S'enregistrer
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </Row>
  );
};

export default Register;
