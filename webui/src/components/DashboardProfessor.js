import React from 'react';
import { Card, Button } from 'react-bootstrap';

const DashboardProfessor = () => (
  <Card>
    <Card.Header>Dashboard: Professor</Card.Header>
    <div className='col text-center' style={{ padding: '10px' }}>
      <h4>Code:</h4>
      <h1 style={{ color: 'gray' }}>AAAA</h1>
      <Button type='button' variant='danger'>Reset Code</Button>
    </div>
  </Card>
);

export default DashboardProfessor;
