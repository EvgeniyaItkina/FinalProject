import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    console.log('Email:', values.username);  // Используем имя поля из формы
    console.log('Password:', values.password);
    // Здесь можно добавить логику для отправки данных на сервер
  };

  return (
    <div className="wave-container">

      < div className="login-container" >
        <h2 className="login-title">Login</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <>
              Forgot my password
            </>
          </Form.Item>
        </Form>
      </div >
    </div>
  )
}

export default Login
