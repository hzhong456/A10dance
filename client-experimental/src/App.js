import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    if (storageToken) {
      setToken(storageToken);
    }
  }, []);

  return (
    <div className='container'>
      <div>
        <Menu token={token} setToken={setToken} client={client} />
      </div>
      <Routes>
        {!token && <Route path="/" element={<Welcome/>} />}
        {token && <Route path="/" element={<Dashboard/>} />}
        {!token && <Route path="/login" element={<Login setToken={setToken}/>} />}
      </Routes>
    </div>
  );
};

export default App;
