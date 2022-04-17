import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { REGISTER } from '../queries';
import Notification from './Notification';

const Register = () => {
  const [message, setMessage] = useState(null);
  let messageTimeout;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');

  const [register] = useMutation(REGISTER, {
    onCompleted: () => {
      setMessage(['added', `Account ${username} created`]);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
    onError: (err) => {
      setMessage(['error', `${err}`]);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
  });

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
