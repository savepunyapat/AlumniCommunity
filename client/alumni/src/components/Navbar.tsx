import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { brown } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { logOut } from "../services/service";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie";
import { axiosReq } from "../services/service";
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.css";
import { Token } from "@mui/icons-material";
import {createTheme, ThemeProvider } from "@mui/material";

const pages = ["ข่าวสาร", "แกลเลอรี", "ติดต่อ", "เข้าสู่ระบบ"];
const links = ["/", "/gallery", "/", "/login"];
const settings = ["Profile", "Logout"];
const settingPath = ["/profile", "/logout"];
const hasToken = () => {
  const token = Cookies.get("token");
  return !!token;
};

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = useState(hasToken());


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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
      fontFamily: "Kanit, sans-serif",// Change this to your desired font
    },
  });

  useEffect(() => {


    // Update the 'loggedIn' state when the component mounts and the token changes
    setLoggedIn(hasToken());
    // Add an event listener to update the 'loggedIn' state when the token changes in another tab or window
    const tokenChangeListener = (event: StorageEvent) => {
      if (event.key === "token") {
        setLoggedIn(!!event.newValue);
      }
    };

    window.addEventListener("storage", tokenChangeListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", tokenChangeListener);
    };
  }, [loggedIn]);

  return (
    <ThemeProvider theme={theme}>
    <AppBar style={{ backgroundColor: "#0000FF" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <img
              id="logo"
              src="https://upload.wikimedia.org/wikipedia/th/thumb/c/ce/Computing_KKU.svg/1200px-Computing_KKU.svg.png"
            />
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >

            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <NavLink to={links[index]} key={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            ) : null}
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
