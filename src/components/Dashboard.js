// import React from 'react';
// import { Button } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';
import { ATTENDED } from '../queries';
import Notification from './Notification';
import { ME } from '../queries';

const Dashboard = () => {

  const me = useQuery(ME);
  const [message, setMessage] = useState(null);
  let messageTimeout;

  const [attended] = useMutation(ATTENDED, {
    onCompleted: () => {
      setMessage(['added', 'Attendance Added']);
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

    attended({
      variables: { username: me.data.me.username },
    });
  };

  return (
    <div className='bg-white border border-dark border-opacity-25 p-5 rounded-4'>
      <h2>Student Dashboard</h2>
      <Notification message={message} />
      <Form onSubmit={submit}>
        <div className='col text-center my-5'>
          <Button type='submit' variant='success'>Check In</Button>
        </div>
      </Form>
    </div>

  );

};

export default Dashboard;
