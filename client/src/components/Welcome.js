import React from 'react';
import { Card } from 'react-bootstrap';
import Dance from '../media/Dance.png';

const Welcome = () => (
  <Card>
    <Card.Header>Welcome</Card.Header>
    <img src={Dance} alt="Dance" style={{ maxWidth: '100%' }} />
  </Card>
);

export default Welcome;
