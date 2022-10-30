import React from 'react';
import { Button } from 'react-bootstrap';

const Dashboard = () => (
  <div className='bg-white border border-dark border-opacity-25 p-5 rounded-4'>
    <h2>Student Dashboard</h2>
    <div className='col text-center my-5'>
      <Button type='button' variant='success'>Check In</Button>
    </div>
  </div>
);

export default Dashboard;
