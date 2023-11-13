import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{backgroundColor: "#0000FF",color: "#FFFFFF", py: 3, px: 2, mt: 10}}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              วิทยาลัยการคอมพิวเตอร์
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40002
            </Typography>
            <Typography variant="body2" color="text.secondary">
              โทรศัพท์ 043-009700 ต่อ 44456, 44459, 44457
            </Typography>
            <Typography variant="body2" color="text.secondary">
              โทรศัพท์ 043-009700 ต่อ 44456, 44459, 44457
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hot Line. 089-7102651, 089-7102645
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
