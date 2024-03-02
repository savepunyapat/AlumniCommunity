import React, { useEffect, useState } from "react";
import "./UserManage.css";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Modal,
  Box,
  InputLabel,
  IconButton,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function UserManage() {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [permission, setPermission] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    width: 250,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };

  const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 100,
    width: 180,
    p: 3,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    textAlign: "center",
  };

  const getUsers = async () => {
    try {
      const response = await axiosWithTokenReq.get("/allAccount");
      setUsers(response?.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditUserOpen = (userId, userPermission) => {
    setSelectedUserId(userId);
    setPermission(userPermission);
    setOpenEditUserModal(true);
  };

  const handleEditUserClose = () => {
    setOpenEditUserModal(false);
  };

  const handleEditPermissonSubmit = async () => {
    try {
      const response = await axiosWithTokenReq.put(
        `/adminEditPermission/${selectedUserId}`,
        { Permission: permission }
      );
      getUsers();
      handleEditUserClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setOpenDeleteConfirmationModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axiosWithTokenReq.delete(`/acc/${selectedUserId}`);
      notifyDeleteSuccess();
      getUsers();
      setOpenDeleteConfirmationModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteConfirmationClose = () => {
    setOpenDeleteConfirmationModal(false);
  };

  const FontTheme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });

  useEffect(() => {
    getUsers();
    document.title = "จัดการบัญชีผู้ใช้ | CS-Alumni";
  }, [permission]);

  return (
    <ThemeProvider theme={FontTheme}>
      <Container maxWidth="lg">
        <ToastContainer />
        <div className="usermanage-header">
          <h1>จัดการบัญชีผู้ใช้</h1>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  รหัสนักศึกษา
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="right"
                >
                  ชื่อ
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="right"
                >
                  นามสกุล
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="right"
                >
                  สถานะ
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="right"
                >
                  อีเมล
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="right"
                ></TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {Array.isArray(users) && users.length > 0
                  ? users.map((user) => (
                      <TableRow
                        key={user._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {user.StdID}
                        </TableCell>
                        <TableCell align="right">{user.FirstName}</TableCell>
                        <TableCell align="right">{user.LastName}</TableCell>
                        <TableCell align="right">{user.Permission}</TableCell>
                        <TableCell align="right">{user.Email}</TableCell>
                        <TableCell align="right">
                          <Button
                            sx={{ marginRight: 2 }}
                            onClick={() =>
                              handleEditUserOpen(user._id, user.Permission)
                            }
                            variant="contained"
                            color="info"
                          >
                            <EditIcon color="white" />
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => handleDeleteClick(user._id)}
                          >
                            <DeleteIcon color="white" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        ไม่มีผู้ใช้
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <NavLink to="/admin/adduser">
          <div className="usermanage-add-user">
            <Button variant="contained" color="success">
              เพิ่มผู้ใช้
            </Button>
          </div>
        </NavLink>
        <Modal
          open={openEditUserModal}
          onClose={handleEditUserClose}
          className="profile-modals"
        >
          <Box sx={style}>
            <form onSubmit={handleEditPermissonSubmit}>
              <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
              <Select
                value={permission}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="status"
                onChange={handlePermissionChange}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
              <Box sx={{ marginTop: 5 }}>
                <Button
                  sx={{ marginRight: 2 }}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  แก้ไข
                </Button>
                <Button
                  onClick={handleEditUserClose}
                  variant="contained"
                  color="error"
                >
                  ปิด
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
        <Modal
          open={openDeleteConfirmationModal}
          onClose={handleDeleteConfirmationClose}
          className="profile-modals"
        >
          <Box sx={deleteModalStyle}>
            <p>ยืนยันการลบ</p>
            <Button
              sx={{ marginRight: 2 }}
              variant="contained"
              color="error"
              onClick={handleDeleteConfirmed}
            >
              ลบ
            </Button>
            <Button
              onClick={handleDeleteConfirmationClose}
              variant="contained"
              color="success"
            >
              ยกเลิก
            </Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default UserManage;
