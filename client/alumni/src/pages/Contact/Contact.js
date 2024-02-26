import {
  Container,
  Paper,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  ThemeProvider,
    createTheme,
    TableBody,
} from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import React from "react";
import './Contact.css'

function Contact() {
    const theme = createTheme({
        typography: {
          fontFamily: "Kanit, sans-serif",// Change this to your desired font
        },
      });
    function createTableData(duty,contact,role,tel) {
        return { duty,contact,role,tel };
    }
    const tableData = [
        createTableData('ด้านบริหารธุรการ','นางสาวเนตรนรินทร์ ชนะบัว','เจ้าหน้าที่บริหารงานทั่วไป','50525'),
        createTableData('ด้านบริหารธุรการ','นายกฤษณะ     พันธุ์ลูกท้าว','พนักงานบริการเอกสาร','50527'),
        createTableData('ด้านแผนยุทธศาสตร์','นางรัตติกร แทนเพชร','นักวิชาการแผนสารสนเทศ','50529'),
        createTableData('ด้านการเงินและบัญชี','นางสาวจิราภรณ์  หอมอ่อน','พนักงานธุรการ','50530'),
        createTableData('ด้านพัสดุ','นางสาวชนกนันท์  ถูไกรวงศ์','เจ้าหน้าที่บริหารงานทั่วไป','50522'),
        createTableData('ด้านบริการการศึกษา','นางฉ้นทนา   เรืองวงศ์วิทยา','นักวิชาการศึกษา','50524'),
        createTableData('ด้านบริการการศึกษา','นายพงษ์เทพ  พระคุณ','นักวิชาการศึกษา','50521'),
        createTableData('ด้านบริการการศึกษา','นายโรจนวรรณ  หาดี','นักวิชาการศึกษา','50526'),
        createTableData('ด้านบริการการศึกษา','นางสาววิจิตรา  ขจร','นักวิชาการศึกษา','50523'),
        createTableData('ด้านดิจิทัล','นาง ศิริรัตน์ ทินตะนัย','นักวิชาการคอมพิวเตอร์','50520'),
        createTableData('ด้านดิจิทัล','นาย นันทสิทธิ์ บางใบ','นักวิชาการคอมพิวเตอร์','44464'),
        createTableData('ด้านดิจิทัล','นาย สุธน เจริญศิริ','นักวิชาการคอมพิวเตอร์','44461'),
        createTableData('ด้านดิจิทัล','นาย ขวัญชัย มูลเค้า','พนักงานเครื่องคอมพิวเตอร์','44464'),
        createTableData('ด้านดิจิทัล','นาย ประจักษ์ สืบเมืองซ้าย','พนักงานเครื่องคอมพิวเตอร์','44462'),
    ];
  return (
    <ThemeProvider theme={theme}>
      <Container>
      <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mt: "5vh" }}
          fontWeight={'bold'}
        >
          ติดต่อเรา
        </Typography>
        <Container sx={{ justifyContent: "center", display: "flex" ,marginTop:"5vh",marginBottom:"5vh"}}>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.5006923175189!2d102.82497131067005!3d16.475397453211496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228b1daee27277%3A0x4d95131862f3456e!2z4Lit4Liy4LiE4Liy4Lij4Lin4Li04LiX4Lii4Lin4Li04Lig4Liy4LiqIChTQzA5KQ!5e0!3m2!1sth!2sth!4v1708762455290!5m2!1sth!2sth"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>
        <Container>
          <Typography variant="h5" sx={{fontWeight:"bold"}}>วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น</Typography>
          <Typography>
            123 อาคารวิทยวิภาส ถ.มิตรภาพ ต.ในเมือง อ.เมืองขอนแก่น จ.ขอนแก่น
            40002
          </Typography>
          <Typography><span> โทรศัพท์ </span>043-009700 ต่อ 50528</Typography>
          <Typography><span>Email </span>: computing.kku@kku.ac.th</Typography>
          <Typography variant="h6" sx={{fontWeight:"bold",mt:"5vh"}}>
            คุณไพรวัลย์ คุณาสถิตย์ชัย ตำแหน่ง ผู้อำนวยการกองบริหารงานวิทยาลัย
          </Typography>
          <Typography>
            หน้าที่ วางแผน ควบคุม กำกับดูแล
            ประสานงานและงานตามภารกิจและนโยบายวิทยาลัย
          </Typography>
          <Typography><span>โทร.</span> 043-009700 ต่อ 50528</Typography>
        </Container>
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center",fontWeight:'bold',fontSize:18}}>
                    ภาระงานด้าน
                  </TableCell>
                  <TableCell sx={{ textAlign: "center",fontWeight:'bold' ,fontSize:18}}>ติดต่อ</TableCell>
                  <TableCell sx={{ textAlign: "center",fontWeight:'bold' ,fontSize:18}}>ตำแหน่ง</TableCell>
                  <TableCell sx={{ textAlign: "center",fontWeight:'bold' }}>
                    เบอร์โทร 043-009700 ต่อ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.duty}>
                    <TableCell sx={{ textAlign: "center" ,fontWeight:"bold"}} component="th" scope="row">
                      {row.duty}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" ,fontWeight:"bold"}}>{row.contact}</TableCell>
                    <TableCell sx={{ textAlign: "center" ,fontWeight:"bold"}}>{row.role}</TableCell>
                    <TableCell sx={{ textAlign: "center" ,fontWeight:"bold"}}>{row.tel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default Contact;
