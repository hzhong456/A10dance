import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {REGISTER} from '../queries';
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
     <div className='bg-white border border-dark border-opacity-25 p-5 rounded-4'>
      <h2>Register</h2>
      <Notification message={message}/>
      <Form onSubmit={submit} className='mb-3'>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={({target}) => setUsername(target.value)}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={({target}) => setName(target.value)}/>
        </Form.Group>

        <Form.Label>Role</Form.Label>
        <Form.Group className='mb-3'>
          <Form.Check type='radio' inline name='role' label='Student' checked onChange={() => setRole('Student')}/>
          <Form.Check type='radio' inline name='role' label='Professor' onChange={() => setRole('Professor')}/>
        </Form.Group>
        <Button type='submit' variant='primary'>Register</Button>
      </Form>
    </div>
  );
};

export default Register;
