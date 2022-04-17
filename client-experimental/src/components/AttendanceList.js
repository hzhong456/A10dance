import React from 'react';
import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import { ALLUSERS } from '../queries';

const AttendanceList = () => {
  const users = useQuery(ALLUSERS);

  if (users.loading) return <div>Loading...</div>;

  return (
  <div style={{ backgroundColor: 'white' }}>
    <h2>Attendance List</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Attendance Count</th>
        </tr>
      </thead>
      <tbody>
        {users.data.allUsers.map((a) => <tr key={a.id}>
          <td>{a.name}</td>
          <td>{a.attendanceCount}</td>
        </tr>)}
      </tbody>
    </Table>
  </div>
  );
};

export default AttendanceList;
