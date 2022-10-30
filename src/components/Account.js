import React from 'react';
import { useQuery } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';

import { ME } from '../queries';

const Account = () => {
  const me = useQuery(ME);

  if (me.loading) return <div>Loading...</div>;
  return (
    <div className='bg-white border border-dark border-opacity-25 p-5 rounded-4'>
      <h2>Account</h2>
        <ListGroup variant="flush">
        <ListGroup.Item>Username: {me.data && me.data.me ? me.data.me.username : ''}</ListGroup.Item>
        <ListGroup.Item>Name: {me.data && me.data.me ? me.data.me.name : ''}</ListGroup.Item>
        <ListGroup.Item>Role: {me.data && me.data.me ? me.data.me.role : ''}</ListGroup.Item>
        <ListGroup.Item>Attendance Count: {me.data && me.data.me ? me.data.me.attendanceCount : ''}</ListGroup.Item>
        <ListGroup.Item>id: {me.data && me.data.me ? me.data.me.id : ''}</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Account;
