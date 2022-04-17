import React from 'react';
import Dance from '../media/Dance.png';

const Welcome = () => (
  <div>
    <h2>Welcome</h2>
    <img src={Dance} alt="Dance" style={{ maxWidth: '100%' }} />
  </div>
);

export default Welcome;
