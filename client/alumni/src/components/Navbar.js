import { NavLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../Context/auth";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";
import logo from "../img/logo/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const { isLoggedIn, userName, permission, isAdmin } = useAuth();

  const pages = ["ข่าวสาร", "แกลเลอรี", "ติดต่อ"];
  const links = ["/", "/gallery", "/contact"];
  const settings = ["โปรไฟล์", "ค้นหาศิษย์เก่า", "ออกจากระบบ"];
  const settingPath = ["/profile", "/alumni", "/logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavLink to="/">
              <img id="logo" src={logo} />
            </NavLink>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: "0.1rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              href="/"
            >
              CSAlumni
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <NavLink to={links[index]}>
                      <Typography  textAlign="center">{page}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
                {isLoggedIn ? (
                  <></>
                ) : (
                  <MenuItem key="login" onClick={handleCloseNavMenu}>
                    <NavLink to="/login">
                      <Typography textAlign="center">เข้าสู่ระบบ</Typography>
                    </NavLink>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CS Alumni
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={links[index]}
                  sx={{ my: 2, color: "white", display: "block" , fontWeight: 700, letterSpacing: "0.05rem"}}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography sx={{ color: "white", paddingRight: "0.5vw", }}>
                      {"สวัสดี " + userName}
                    </Typography>
                    <AccountCircleIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" , fontWeight: 700, letterSpacing: "0.05rem"}}
                  href="/login"
                >
                  เข้าสู่ระบบ
                </Button>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <NavLink to={settingPath[index]}>
                      <Typography textAlign="center">{setting}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
