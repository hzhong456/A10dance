import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Container} from "react-bootstrap";

import { useApolloClient } from '@apollo/client';

import Menu from './components/Menu';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import AttendanceList from './components/AttendanceList';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    const nameToken = localStorage.getItem('name');
    if (storageToken && nameToken) {
      setToken(storageToken);
      setName(nameToken);
    }
  }, []);

  return (
    <div>
      <Menu token={token} setToken={setToken} client={client} name={name} setName={setName}/>
      <Container className='mt-5 d-flex justify-content-center'>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {!token && <Route path="/login" element={<Login setToken={setToken} setName={setName} />} />}
          {!token && <Route path="/register" element={<Register />} />}

          {token ? <Route path="/dashboard" element={<Dashboard />} /> : null}
          {token ? <Route path="/attendance-list" element={<AttendanceList />} /> : null}
          {token ? <Route path="/account" element={<Account />} /> : null}
        </Routes>
      </Container>
    </div>
  );
};

export default App;
