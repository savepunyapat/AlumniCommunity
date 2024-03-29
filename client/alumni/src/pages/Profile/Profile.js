import React, { useEffect, useState } from "react";
import { axiosReq, axiosWithTokenReq } from "../../services/service";
import {
  ButtonGroup,
  Grid,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AddHomeIcon from "@mui/icons-material/AddHome";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import DiscordIcon from "../../components/DiscordIcon";
import InfoIcon from "@mui/icons-material/Info";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackBtn from "../../components/BackBtn/BackBtn";

const Profile = () => {
  const notifyWrongDate = () =>
    toast.error("วันที่ไม่ถูกต้อง", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [permission, setPermission] = useState(false);
  const [education, setEducation] = useState({});
  const [workplace, setWorkplace] = useState({});
  const [discordKey, setDiscordKey] = useState("");
  const [openEducationModal, setOpenEducationModal] = React.useState(false);
  const handleEducationOpen = () => setOpenEducationModal(true);
  const handleEducationClose = () => setOpenEducationModal(false);
  const [openWorkPlaceModal, setOpenWorkPlaceModal] = React.useState(false);
  const handleWorkPlaceOpen = () => setOpenWorkPlaceModal(true);
  const handleWorkPlaceClose = () => setOpenWorkPlaceModal(false);
  const [Address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [openPasswordModal, setOpenPasswordModal] = React.useState(false);
  const handlePasswordOpen = () => setOpenPasswordModal(true);
  const handlePasswordClose = () => setOpenPasswordModal(false);

  const [openBioModal, setOpenBioModal] = React.useState(false);
  const handleBioOpen = () => setOpenBioModal(true);
  const handleBioClose = () => setOpenBioModal(false);

  const [openInfoDiscordModal, setOpenInfoDiscordModal] = React.useState(false);
  const handleInfoDiscordOpen = () => setOpenInfoDiscordModal(true);
  const handleInfoDiscordClose = () => setOpenInfoDiscordModal(false);

  const [openEditEducationModal, setOpenEditEducationModal] =
    React.useState(false);
  const handleEditEducationOpen = (index) => {
    setEditedEducation({
      Course: education[index].Course,
      Qualification: education[index].Qualification,
      GraduateYear: education[index].GraduateYear,
    });
    setEditedEducationIndex(index);
    setOpenEditEducationModal(true);
  };
  const handleEditEducationClose = () => {
    setOpenEditEducationModal(false);
    setEditedEducationIndex(null);
  };
  const [editedEducationIndex, setEditedEducationIndex] = useState(null);
  const [editedEducations, setEditedEducations] = useState([]);

  const [openEditWorkPlaceModal, setOpenEditWorkPlaceModal] =
    React.useState(false);
  const handleEditWorkPlaceOpen = (index) => {
    setEditedWorkPlace({
      CompanyName: workplace[index].CompanyName,
      Position: workplace[index].Position,
      StartDate: workplace[index].StartDate,
      EndDate: workplace[index].EndDate,
    });
    setEditedWorkPlaceIndex(index);
    setOpenEditWorkPlaceModal(true);
  };
  const handleEditWorkPlaceClose = () => {
    setOpenEditWorkPlaceModal(false);
    setEditedWorkPlaceIndex(null);
  };
  const [editedWorkPlaceIndex, setEditedWorkPlaceIndex] = React.useState(null);

  const notifyChangePassword = () =>
    toast.success("เปลี่ยนรหัสผ่านสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyChangeAddress = () =>
    toast.success("เปลี่ยนที่อยู่สำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyAddEducation = () =>
    toast.success("เพิ่มประวัติการศึกษาสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyAddWorkplace = () =>
    toast.success("เพิ่มประวัติการทำงานสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyEditEducation = () =>
    toast.success("แก้ไขประวัติการศึกษาสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyEditWorkplace = () =>
    toast.success("แก้ไขประวัติการทำงานสำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  const notifyChangePasswordFail = () =>
    toast.error("เปลี่ยนรหัสผ่านไม่สำเร็จ!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [editedEducation, setEditedEducation] = useState({
    Course: "",
    Qualification: "",
    GraduateYear: "",
  });

  const [editedWorkPlace, setEditedWorkPlace] = useState({
    CompanyName: "",
    Position: "",
    StartDate: "",
    EndDate: "",
  });
  const handleEditEducationChange = (e) => {
    setEditedEducation({
      ...editedEducation,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditWorkPlaceChange = (e) => {
    setEditedWorkPlace({
      ...editedWorkPlace,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleWorkplaceInputChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkPlace((prevWorkPlace) => ({
      ...prevWorkPlace,
      [name]: value,
    }));
  };
  const notifyEmptyField = () =>
    toast.warn("กรุณากรอกข้อมูลให้ครบ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleUpdateBioSubmit = async (e) => {
    try {
      e.preventDefault();
      const newAddress = e.target.newAddress.value.trim();
      const newPhoneNumber = e.target.newPhoneNumber.value.trim();
      if (newAddress === "" || newPhoneNumber === "") {
        notifyEmptyField();
        return;
      }

      setAddress(newAddress);
      setPhoneNumber(newPhoneNumber);
      const response = await axiosWithTokenReq.put(`/acc/${user.id}`, {
        Address: Address,
        PhoneNumber: phoneNumber,
      });
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEducationSubmit = async (e) => {
    try {
      e.preventDefault();
      const Education = {
        Course: e.target.Course.value.trim(),
        Qualification: e.target.Qualification.value.trim(),
        GraduateYear: e.target.GraduateYear.value.trim(),
      };
      if ( Education.Course === "" || Education.Qualification === "" || Education.GraduateYear === "") {
        notifyEmptyField();
        return;
      }
      const response = await axiosWithTokenReq.put("/addEducation", Education);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleWorkPlaceSubmit = async (e) => {
    try {
      e.preventDefault();

      const startDate = new Date(e.target.StartDate.value);
      const endDate = new Date(e.target.EndDate.value);

      if (startDate > endDate) {
        notifyWrongDate();
        return;
      }

      const WorkPlace = {
        CompanyName: e.target.CompanyName.value.trim(),
        Position: e.target.Position.value.trim(),
        StartDate: startDate,
        EndDate: endDate,
      };
      if (WorkPlace.CompanyName === "" || WorkPlace.Position === "") {
        notifyEmptyField();
        return;
      }

      const response = await axiosWithTokenReq.put("/addWorkPlace", WorkPlace);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditEducationSubmit = async (e, index) => {
    e.preventDefault();
    const Education = {
      Course: e.target.Course.value.trim(),
      Qualification: e.target.Qualification.value.trim(),
      GraduateYear: e.target.GraduateYear.value.trim(),
    };
    if (Education.Course === "" || Education.Qualification === "" || Education.GraduateYear === "") {
      notifyEmptyField();
      return;
    }
    try {
      const response = await axiosWithTokenReq.put(
        `/updateEducation/${index}`,
        Education
      );
      console.log(response?.data);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditWorkPlaceSubmit = async (e, index) => {
    e.preventDefault();

    const startValue = e.target.StartDate.value;
    const endValue = e.target.EndDate.value;
    if (new Date(startValue) > new Date(endValue)) {
      notifyWrongDate();
      return;
    }

    const WorkPlace = {
      CompanyName: e.target.CompanyName.value.trim(),
      Position: e.target.Position.value.trim(),
      StartDate: e.target.StartDate.value,
      EndDate: e.target.EndDate.value,
    };
    if (WorkPlace.CompanyName === "" || WorkPlace.Position === "") {
      notifyEmptyField();
      return;
    }
    try {
      const response = await axiosWithTokenReq.put(
        `/updateWorkPlace/${index}`,
        WorkPlace
      );
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const DiscordStyle = {
    position: "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 500,
    width: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 5,
    borderRadius: "10px",
  };

  const style = {
    position: "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 300,
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 10,
    borderRadius: "10px",
  };

  const deleteEducation = async (index) => {
    try {
      const response = await axiosWithTokenReq.delete(
        `/deleteEducation/${index}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteWorkPlace = async (index) => {
    try {
      const response = await axiosWithTokenReq.delete(
        `/deleteWorkPlace/${index}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteWorkPlaceClick = (index) => {
    deleteWorkPlace(index);
  };
  const handleDeleteEducaitonClick = (index) => {
    deleteEducation(index);
  };

  const closePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const closeEducationModal = () => {
    setOpenEducationModal(false);
  };
  const closeWorkPlaceModal = () => {
    setOpenWorkPlaceModal(false);
  };
  const closeBioModal = () => {
    setOpenBioModal(false);
  };
  function convertStringToDate(dateString) {
    return new Date(dateString);
  }
  
  const handleChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      const Password = {
        oldPassword: e.target.oldPassword.value.trim(),
        newPassword: e.target.newPassword.value.trim(),
        confirmPassword: e.target.confirmPassword.value.trim(),
      };
      if ( Password.oldPassword === "" || Password.newPassword === "" || Password.confirmPassword === "") {
        notifyEmptyField();
        return;
      }
      const response = await axiosWithTokenReq.post(
        "/changePassword",
        Password
      );
      notifyChangePassword();
    } catch (err) {
      notifyChangePasswordFail();
      console.log(err.message);
    }
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const getMe = async () => {
    try {
      const response = await axiosWithTokenReq.get("/me");
      setUser(response?.data);
      setEducation(response?.data?.Education);
      setWorkplace(response?.data?.WorkPlace);
      setDiscordKey(response?.data?.DiscordKey);
      setAddress(response?.data?.Address);
      setPhoneNumber(response?.data?.PhoneNumber);
      if (user.Permission === "admin") {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(
    () => {
      getMe();
      document.title = "โปรไฟล์ | CS-Alumni";
    },
    user,
    openEducationModal,
    openWorkPlaceModal
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <ToastContainer />
        {user && (
          <div>
            <Box
              id="profile-box"
              sx={{
                width: "100%",
                height: "auto",
                paddingBottom: "5vh",
                alignContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                marginTop: "4vh",
              }}
            >
              <BackBtn path="/" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "3vh",
                  textAlign: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  className="profile-user-info"
                  sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  {"Hi " + user.FirstName + "    " + user.LastName}
                </Typography>
                <Stack direction={"row"} sx={{ width: 300 }}>
                  <DiscordIcon />
                  <Typography className="profile-user-discordkey">
                    {"Discord Key : " + user.DiscordKey}
                  </Typography>
                </Stack>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    href="https://discord.gg/JPtVQfr3kg"
                    target="_blank"
                    sx={{ bgcolor: "#7289da" }}
                  >
                    เชื่อมต่อ Discord
                  </Button>
                  <IconButton onClick={handleInfoDiscordOpen}>
                    <InfoIcon />
                  </IconButton>
                </Box>
                <Modal
                  open={openInfoDiscordModal}
                  onClose={handleInfoDiscordClose}
                  className="profile-modals"
                >
                  <Box sx={DiscordStyle}>
                    <Container
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <iframe
                        width="800"
                        height="500"
                        src="https://www.youtube.com/embed/leBtwsXlpF0"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </Container>
                  </Box>
                </Modal>

                <Modal
                  open={openPasswordModal}
                  onClose={handlePasswordClose}
                  className="profile-modals"
                >
                  <Box sx={style}>
                    <form onSubmit={handleChangePasswordSubmit}>
                      <label>รหัสผ่านปัจจุบัน</label>
                      <input
                        type="password"
                        name="oldPassword"
                        placeholder="รหัสผ่าน"
                      />
                      <br />
                      <br />
                      <label>รหัสผ่านใหม่</label>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="รหัสผ่านใหม่"
                      />
                      <br />
                      <br />
                      <label>ยืนยันรหัสผ่านใหม่</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="ยืนยันรหัสผ่านใหม่"
                      />
                      <br />
                      <br />
                      <Button
                        sx={{ marginRight: 2 }}
                        type="submit"
                        variant="contained"
                        color="success"
                      >
                        แก้ไข
                      </Button>
                      <Button
                        onClick={closePasswordModal}
                        variant="contained"
                        color="error"
                      >
                        ปิด
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </Box>

              <Box>
                <Grid
                  container
                  rowSpacing={1}
                  justifyContent="center"
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={5} sx={{ textAlign: "center" }}>
                    <Typography>อีเมล</Typography>
                    <TextField disabled value={user.Email}></TextField>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: "center" }}>
                    <Typography>รหัสนักศึกษา</Typography>
                    <TextField disabled value={user.StdID}></TextField>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: "center" }}>
                    <Typography>เบอร์โทรศัพท์</Typography>
                    <TextField disabled value={user.PhoneNumber}></TextField>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: "center" }}>
                    <Typography>วันเกิด</Typography>
                    <TextField
                      disabled
                      value={dayjs(user.Birthday).format("YYYY-MM-DD")}
                    ></TextField>
                  </Grid>
                </Grid>
              </Box>

              <Box id="profile-address-box">
                <p>ที่อยู่</p>
                <p id="profile-address-text">{user.Address}</p>
              </Box>
              <Box>
                <div className="profile-edit-btn">
                  <ButtonGroup variant="outlined">
                    <Button
                      color="info"
                      onClick={handleBioOpen}
                      startIcon={<EditIcon color="info" />}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      color="info"
                      startIcon={<EditIcon color="info" />}
                      onClick={handlePasswordOpen}
                    >
                      {" "}
                      เปลี่ยนรหัสผ่าน{" "}
                    </Button>
                  </ButtonGroup>
                </div>
                <Modal
                  open={openBioModal}
                  onClose={handleBioClose}
                  className="profile-modals"
                >
                  <Box sx={style}>
                    <form onSubmit={handleUpdateBioSubmit}>
                      <label>ที่อยู่</label>
                      <input
                        type="text"
                        id="profile-address-input"
                        onChange={handleAddressChange}
                        name="newAddress"
                        placeholder="ที่อยู่"
                        value={Address}
                        required={true}
                      />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <label id="profile-label-phonenumber">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="text"
                        id="profile-address-phone"
                        onChange={handlePhoneNumberChange}
                        name="newPhoneNumber"
                        placeholder="เบอร์ติดต่อ"
                        value={phoneNumber}
                        required={true}
                      />
                      <br />
                      <br />
                      <Button
                        sx={{ marginRight: 2, marginTop: 10 }}
                        type="submit"
                        variant="contained"
                        color="success"
                      >
                        แก้ไข
                      </Button>
                      <Button
                        sx={{ marginTop: 10 }}
                        onClick={closeBioModal}
                        variant="contained"
                        color="error"
                      >
                        ปิด
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </div>
        )}
        <div className="profile-education-workplace-wrap">
          <div className="profile-education-div">
            <h2 className="profile-h2-title">ประวัติการศึกษา</h2>
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell  sx={{fontWeight:'bold'}}>คณะ/สาขา</TableCell>
                      <TableCell  sx={{fontWeight:'bold'}} align="right">วุฒิการศึกษา</TableCell>
                      <TableCell  sx={{fontWeight:'bold'}} align="right">ปีที่สำเร็จการศึกษา</TableCell>
                      <TableCell sx={{fontWeight:'bold'}} align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(education)
                      ? education.map((edu, index) => (
                          <TableRow
                            key={edu}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {edu.Course}
                            </TableCell>
                            <TableCell align="right">
                              {edu.Qualification}
                            </TableCell>
                            <TableCell align="right">
                              {edu.GraduateYear}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                sx={{ marginRight: 2 }}
                                variant="contained"
                                color="info"
                                onClick={() => handleEditEducationOpen(index)}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleDeleteEducaitonClick(index)
                                }
                                color="error"
                              >
                                <ClearIcon />
                              </Button>
                            </TableCell>
                            <Modal
                              open={
                                openEditEducationModal &&
                                editedEducationIndex === index
                              } // Check if the index matches the edited index
                              onClose={handleEditEducationClose}
                              className="profile-modals"
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <form
                                  onSubmit={(e) =>
                                    handleEditEducationSubmit(e, index)
                                  }
                                >
                                  <label>คณะ/สาขา</label>
                                  <input
                                    value={editedEducation.Course}
                                    type="text"
                                    name="Course"
                                    placeholder="Course"
                                    onChange={handleEditEducationChange}
                                  />
                                  <br />
                                  <br />
                                  <label>วุฒิการศึกษา</label>
                                  <input
                                    type="text"
                                    value={editedEducation.Qualification}
                                    name="Qualification"
                                    placeholder="Qualification"
                                    onChange={handleEditEducationChange}
                                  />
                                  <br />
                                  <br />
                                  <label>ปีที่สำเร็จการศึกษา</label>
                                  <input
                                    value={editedEducation.GraduateYear}
                                    type="text"
                                    name="GraduateYear"
                                    placeholder="GraduateYear"
                                    onChange={handleEditEducationChange}
                                  />
                                  <br />
                                  <br />
                                  <Button
                                    sx={{ marginRight: 2 }}
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                  >
                                    แก้ไข
                                  </Button>
                                  <Button
                                    onClick={handleEditEducationClose}
                                    variant="contained"
                                    color="error"
                                  >
                                    ปิด
                                  </Button>
                                </form>
                              </Box>
                            </Modal>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <Button
              id="profile-add-btn"
              variant="contained"
              onClick={handleEducationOpen}
              color="success"
            >
              <AddHomeIcon />
            </Button>
            <Modal
              open={openEducationModal}
              onClose={handleEducationClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="profile-modals"
            >
              <Box sx={style}>
                <form onSubmit={handleEducationSubmit}>
                  <label>คณะ/สาขา</label>
                  <input type="text" name="Course" placeholder="Course" />
                  <br />
                  <br />
                  <label>วุฒิการศึกษา</label>
                  <input
                    type="text"
                    name="Qualification"
                    placeholder="Qualification"
                  />
                  <br />
                  <br />
                  <label>ปีที่สำเร็จการศึกษา</label>
                  <input
                    type="text"
                    name="GraduateYear"
                    placeholder="GraduateYear"
                  />
                  <br />
                  <br />
                  <Button
                    sx={{ marginRight: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    เพิ่ม
                  </Button>
                  <Button
                    onClick={closeEducationModal}
                    variant="contained"
                    color="error"
                  >
                    ปิด
                  </Button>
                </form>
              </Box>
            </Modal>
          </div>
          <div className="profile-workplace-div">
            <h2 className="profile-h2-title">ประวัติการทำงาน</h2>
            <div className="profile-items-list">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell  sx={{fontWeight:'bold'}}>สถานที่ทำงาน/บริษัท</TableCell>
                      <TableCell  sx={{fontWeight:'bold'}} align="right">ตำแหน่ง</TableCell>
                      <TableCell  sx={{fontWeight:'bold'}} align="right">วันที่เริ่มงาน</TableCell>
                      <TableCell  sx={{fontWeight:'bold'}} align="right">วันที่ออก</TableCell>
                      <TableCell  sx={{fontWeight:'bold'}} align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(workplace)
                      ? workplace.map((work, index) => (
                          <TableRow
                            key={work}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {work.CompanyName}
                            </TableCell>
                            <TableCell align="right">{work.Position}</TableCell>
                            <TableCell align="right">
                              {dayjs(work.StartDate).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell align="right">
                              {work.EndDate ? dayjs(work.EndDate).format("YYYY-MM-DD") : "ยังทำงานอยู่"}
                              </TableCell>
                            <TableCell align="right">
                              <Button
                                sx={{ marginRight: 2 }}
                                variant="contained"
                                color="info"
                                onClick={() => handleEditWorkPlaceOpen(index)}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleDeleteWorkPlaceClick(index)
                                }
                                color="error"
                              >
                                <ClearIcon />
                              </Button>
                            </TableCell>
                            <Modal
                              open={
                                openEditWorkPlaceModal &&
                                editedWorkPlaceIndex === index
                              }
                              onClose={handleEditWorkPlaceClose}
                              className="profile-modals"
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <form
                                  onSubmit={(e) =>
                                    handleEditWorkPlaceSubmit(e, index)
                                  }
                                >
                                  <label>สถานที่ทำงาน/บริษัท</label>
                                  <input
                                    value={editedWorkPlace.CompanyName}
                                    type="text"
                                    name="CompanyName"
                                    placeholder="CompanyName"
                                    onChange={handleEditWorkPlaceChange}
                                  />
                                  <br />
                                  <br />
                                  <label>ตำแหน่ง</label>
                                  <input
                                    type="text"
                                    value={editedWorkPlace.Position}
                                    name="Position"
                                    placeholder="Position"
                                    onChange={handleEditWorkPlaceChange}
                                  />
                                  <br />
                                  <br />
                                  <label>วันที่เริ่มงาน</label>
                                  <input
                                    value={editedWorkPlace.StartDate}
                                    type="date"
                                    name="StartDate"
                                    placeholder="StartDate"
                                    onChange={handleEditWorkPlaceChange}
                                  />
                                  <br />
                                  <br />
                                  <label>วันที่ออก</label>
                                  <input
                                    value={editedWorkPlace.EndDate}
                                    type="date"
                                    name="EndDate"
                                    placeholder="EndDate"
                                    onChange={handleEditWorkPlaceChange}
                                  />
                                  <br />
                                  <br />
                                  <Button
                                    sx={{ marginRight: 2 }}
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                  >
                                    แก้ไข
                                  </Button>
                                  <Button
                                    onClick={handleEditWorkPlaceClose}
                                    variant="contained"
                                    color="error"
                                  >
                                    ปิด
                                  </Button>
                                </form>
                              </Box>
                            </Modal>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Button
              variant="contained"
              onClick={handleWorkPlaceOpen}
              color="success"
            >
              <AddHomeWorkIcon />
            </Button>
            <Modal
              open={openWorkPlaceModal}
              onClose={handleWorkPlaceClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="profile-modals"
            >
              <Box sx={style}>
                <form onSubmit={handleWorkPlaceSubmit}>
                  <label>สถานที่ทำงาน/บริษัท</label>
                  <input
                    type="text"
                    name="CompanyName"
                    placeholder="CompanyName"
                  />
                  <br />
                  <br />
                  <label>ตำแหน่ง</label>
                  <input type="text" name="Position" placeholder="Position" />
                  <br />
                  <br />
                  <label>วันที่เริ่มงาน</label>
                  <input type="date" name="StartDate" placeholder="StartDate" />
                  <br />
                  <br />
                  <label>วันที่ออก</label>
                  <input type="date" name="EndDate" placeholder="EndDate" />
                  <br />
                  <br />
                  <Button
                    sx={{ marginRight: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    เพิ่ม
                  </Button>
                  <Button
                    variant="contained"
                    onClick={closeWorkPlaceModal}
                    color="error"
                  >
                    ปิด
                  </Button>
                </form>
              </Box>
            </Modal>
          </div>
        </div>

        {permission ? (
          <div className="profile-admin-div">
            <ButtonGroup variant="outlined">
              <Button href="/admin/posts">จัดการข่าวสาร</Button>
              <Button href="/admin/users">จัดการบัญชีผู้ใช้</Button>
              <Button href="/gallery">จัดการแกลเลอรี</Button>
              <Button href="/admin/sendPostcard">ส่งโปสการ์ด</Button>
            </ButtonGroup>
          </div>
        ) : null}
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
