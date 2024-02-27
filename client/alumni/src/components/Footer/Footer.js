import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook} from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import { Box, createTheme, ThemeProvider } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",// Change this to your desired font
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <Box
      component="footer"
      sx={{backgroundColor: "#0b76bc",color: "#FFFFFF", py: 3, px: 2, mt: 10}}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6"  gutterBottom>
              ติดต่อเรา
            </Typography>
            <Typography variant="body1" >
              วิทยาลัยการคอมพิวเตอร์
            </Typography>
            <Typography variant="body1" >
              123 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40002
            </Typography>
            <Typography variant="body1" >
              โทรศัพท์ 043-009700 ต่อ 44456, 44459, 44457
            </Typography>
            <Typography variant="body1" >
              โทรศัพท์ 043-009700 ต่อ 44456, 44459, 44457
            </Typography>
            <Typography variant="body1" >
              Hot Line. 089-7102651, 089-7102645
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6"  gutterBottom>
              ติดตามเรา
            </Typography>
            <Link href="https://www.facebook.com/computing.kku" >
              <Facebook htmlColor="#ffffff" />
            </Link>
            <Link href="https://computing.kku.ac.th/index">
              <PublicIcon htmlColor="#ffffff" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCJbH9xZZ9rNGfKahEebeFOA">
              <YouTubeIcon htmlColor="#ffffff" />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2"  align="center">
            {"Copyright © "}
            <Link  href="https://your-website.com/" sx={{color:'white'}}>
              Alumni Community
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
    </ThemeProvider>
  );
}

export default Footer;
