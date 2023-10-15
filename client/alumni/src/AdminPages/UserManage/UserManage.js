import React, { useEffect, useState } from 'react'
import './UserManage.css'
import { Button, Container } from '@mui/material'
import { axiosReq } from '../../services/service';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

function UserManage() {

  const [users, setUsers] = useState();

  const handleDeleteClick = (id) => {
    deleteUser(id);
  }
  const deleteUser = async (id) => {
    try {
      console.log(id);
      const response = await axiosReq.delete(`http://localhost:8000/acc/${id}`);
      getUsers();
    } catch (err) {
      console.error(err.message);
    }
  }

  const getUsers = async () => {
    try {
      const response = await axiosReq.get("http://localhost:8000/allAccount");
      setUsers(response?.data);
      console.log(users);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getUsers();
  }, [])


  return (
    <Container maxWidth="lg">
      <div className="usermanage-header">
        <h1>จัดการบัญชีผู้ใช้</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>รหัสนักศึกษา</TableCell>
              <TableCell align="right">ชื่อ</TableCell>
              <TableCell align="right">นามสกุล</TableCell>
              <TableCell align="right">สถานะ</TableCell>
              <TableCell align="right">อีเมล</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users)
            ? users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.StdID}
                </TableCell>
                <TableCell align="right">{user.FirstName}</TableCell>
                <TableCell align="right">{user.LastName}</TableCell>
                <TableCell align="right">{user.Permission}</TableCell>
                <TableCell align="right">{user.Email}</TableCell>
                <TableCell align="right"><Button ><EditIcon color='info'/></Button><Button onClick={() => handleDeleteClick(user._id)} startIcon={<DeleteIcon color='error'/>}></Button></TableCell>
              </TableRow>
            )):null}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='usermanage-add-user'>
        <Button variant="contained" color="success" href="/admin/adduser">เพิ่มผู้ใช้</Button>
      </div>
    </Container>
  )
}

export default UserManage;