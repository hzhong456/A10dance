import React from 'react';
import { Card } from 'react-bootstrap';

import Dance from '../assets/images/Dance.png';

const Welcome = () => (
  <div className='bg-white border border-dark border-opacity-25 p-5 rounded-4'>
    <h2 className='fw-bold fs-1'>Welcome</h2>
    <img src={Dance} alt="Dance" />
  </div>
);

export default Welcome;
