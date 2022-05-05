import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ message }) => {
  if (message === null) return null;

  return message[0] === 'added' ? (
    <Alert variant="success">{message[1]}</Alert>
  )
    : (
      <Alert variant="danger">{message[1]}</Alert>
    );
};

export default Notification;
