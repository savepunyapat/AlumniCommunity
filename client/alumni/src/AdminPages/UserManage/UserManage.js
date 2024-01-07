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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function UserManage() {
  const [openEditUserModal, setOpenEditUserModal] = React.useState(false);
  const handleEditUserOpen = () => setOpenEditUserModal(true);
  const handleEditUserClose = () => setOpenEditUserModal(false);
  const [users, setUsers] = useState();
  const [permission, setPermission] = useState('');
  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
    console.log(permission);
  };
  const notifyDeleteSuccess = () =>
    toast.success("ลบบัญชีสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const style = {
    position: 'absolute',

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 200,
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };

  const handleEditPermissonSubmit = async (userID) => {
    try {
      const response = await axiosReq.put(`http://localhost:8000/acc/${userID}`, { Permission: permission });
      getUsers();
      closeEditUserModal();
    } catch (err) {
      console.error(err.message);
    }
  };

  const closeEditUserModal = () => {
    setOpenEditUserModal(false);
  }
  const handleDeleteClick = (id) => {
    deleteUser(id);
  }
  const deleteUser = async (id) => {
    notifyDeleteSuccess();
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
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getUsers();
  }, [])


  return (
    <Container maxWidth="lg">
      <ToastContainer />
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
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.StdID}
                  </TableCell>
                  <TableCell align="right">{user.FirstName}</TableCell>
                  <TableCell align="right">{user.LastName}</TableCell>
                  <TableCell align="right">{user.Permission}</TableCell>
                  <TableCell align="right">{user.Email}</TableCell>
                  <TableCell align="right"><Button sx={{ marginRight: 2 }} onClick={handleEditUserOpen} variant='contained' color='info' ><EditIcon color='white' /></Button><Button color='error' variant='contained' onClick={() => handleDeleteClick(user._id)}><ClearIcon color='white' /></Button></TableCell>
                  <Modal
                    open={openEditUserModal}
                    onClose={handleEditUserClose}
                    className="profile-modals"
                  >
                    <Box sx={style}>
                      <form onSubmit={() => handleEditPermissonSubmit(user._id)} >

                        <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="status"
                          onChange={handlePermissionChange}
                        >
                          <MenuItem value={"admin"}>Admin</MenuItem>
                          <MenuItem value={"user"}>User</MenuItem>
                        </Select>
                        <Box sx={{ marginTop: 5 }}>
                          <Button sx={{ marginRight: 2 }} type='submit' variant="contained" color="success">
                            แก้ไข
                          </Button>
                          <Button onClick={closeEditUserModal} variant="contained" color="error">
                            ปิด
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Modal>
                </TableRow>
              )) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <NavLink to="/admin/adduser">
        <div className='usermanage-add-user'>
          <Button variant="contained" color="success">เพิ่มผู้ใช้</Button>
        </div>
      </NavLink>
    </Container>
  )
}

export default UserManage;