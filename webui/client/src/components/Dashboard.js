import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Dashboard = () => (
  <Card>
    <Card.Header>Dashboard: Student</Card.Header>
    <div className='col text-center' style={{ padding: '10px' }}>
      <Button type='button' variant='primary'>Check In</Button>
    </div>
  </Card>
);

export default Dashboard;
