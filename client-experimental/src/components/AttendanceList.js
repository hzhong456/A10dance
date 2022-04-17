import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, Table } from 'react-bootstrap';
import { ALLUSERS } from '../queries';

const AttendanceList = () => {
  const users = useQuery(ALLUSERS);

  if (users.loading) return <div>Loading...</div>;

  return (
  <Card>
    <Card.Header>Attendance List</Card.Header>
    <Card.Body>
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
    </Card.Body>
  </Card>
  );
};

export default AttendanceList;
