import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { REGISTER } from '../queries';
import Notification from './Notification';

const Register = (props) => {
  const [message, setMessage] = useState(null);
  let messageTimeout;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');

  const [register, result] = useMutation(REGISTER, {
    onCompleted: () => navigate('/'),
    onError: (err) => {
      setMessage(['error', `${err}`]);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.addUser.value;
      props.setToken(token);
      localStorage.setItem('token', token);
    }
  }, [props, result.data]);

  const submit = async (event) => {
    event.preventDefault();

    register({
      variables: {
        username,
        password,
        name,
        role,
      },
    });
  };

  return (
    <div>
      <Notification message={message} />
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={({ target }) => setUsername(target.value)} />
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={({ target }) => setName(target.value)} />
          <Form.Label>Role</Form.Label>
          <Form.Check type={'radio'} name={'role'} label={'Student'} checked onChange={() => setRole('Student')} />
          <Form.Check type={'radio'} name={'role'} label={'Professor'} onChange={() => setRole('Professor')} />
          <Button type='submit'>Register</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
