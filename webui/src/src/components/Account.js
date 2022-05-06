import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, ListGroup } from 'react-bootstrap';
import { ME } from '../queries';

const Account = () => {
  const me = useQuery(ME);

  if (me.loading) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Header>Account</Card.Header>
        <ListGroup variant="flush">
        <ListGroup.Item>Username: {me.data.me.username}</ListGroup.Item>
        <ListGroup.Item>Name: {me.data.me.name}</ListGroup.Item>
        <ListGroup.Item>Role: {me.data.me.role}</ListGroup.Item>
        <ListGroup.Item>Attendance Count: {me.data.me.attendanceCount}</ListGroup.Item>
        <ListGroup.Item>id: {me.data.me.id}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Account;
