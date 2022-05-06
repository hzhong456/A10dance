import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import AttendanceList from './components/AttendanceList';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

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
      <Menu token={token} setToken={setToken} client={client} name={name} setName={setName} />
      <div className='container'>
        <Routes>
          {!token && <Route path="/" element={<Welcome />} />}
          {token && <Route path="/" element={<Dashboard />} />}
          {token && <Route path="/attendance-list" element={<AttendanceList />} />}
          {token && <Route path="/account" element={<Account />} />}
          {!token && <Route path="/login" element={<Login setToken={setToken} setName={setName} />} />}
          {!token && <Route path="/register" element={<Register />} />}
        </Routes>
      </div>
    </div>
  );
};

export default App;
