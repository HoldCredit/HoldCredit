import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {Accordion, AccordionSummary, Button, Pagination, Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from "@mui/material/IconButton";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import '../../screens/css/Board.css'
import Title from "../components/Title";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import DashboardFooter from "../DashboardFooter";
import Toolbar from "@mui/material/Toolbar";

export default function CustomerList() {

  const menu = useSelector((state) => state.selectMenu);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setData([]);
    getCustomerList();
  }, [menu, currentPage]);

  const getCustomerList = () => {
    axios.get(`http://localhost:8080/customer/list?page=${currentPage}&size=10`)
      .then(res => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  return (
    <>
      <Toolbar/>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid item xs={12}>
          <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', minHeight: '660px' }}>

            <Title>고객 현황</Title>

        <Grid container direction="column" spacing={2} style={{paddingTop: '50px'}}>
          <Grid item>
                <Table size="midium">
                  <TableHead>
                    <TableRow>
                      <TableCell width="18%">이름</TableCell>
                      <TableCell width="18%">생년월일</TableCell>
                      <TableCell width="18%">성별</TableCell>
                      <TableCell width="18%">직업 구분</TableCell>
                      <TableCell width="18%">교육 수준</TableCell>
                      <TableCell width="18%">전화 번호</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      data.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.birth}</TableCell>
                          <TableCell>{row.gender == 'MALE' ? '남자': '여자' }</TableCell>
                          <TableCell>{row.job == 'ENTREPRENEUR' ? '개인사업자' :
                              row.job == 'PUBLICOFFICIAL' ? '공무원' :
                              row.job == 'WORKER' ? '회사원' :
                              row.job == 'ETC' ? '기타' : null }</TableCell>
                          <TableCell>{row.educationLevel == 'ELEMENTARY' ? '초등학교 졸업' :
                                  row.educationLevel == 'MIDDLE' ? '중학교 졸업' :
                                  row.educationLevel == 'HIGH' ? '고등학교 졸업' :
                                  row.educationLevel == 'UNIVERSITY' ? '대학교 졸업' :
                                  row.educationLevel == 'DOCTORATE' ? '석박사 졸업' : null}</TableCell>
                          <TableCell>{row.phone_num}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>

              </Grid>
            </Grid>

            <Stack alignItems="center" marginTop="auto">
              <Pagination count={totalPages}
                          page={currentPage + 1}
                          onChange={handlePageChange}/>
            </Stack>


          </Paper>
        </Grid>

      </Container>
      <DashboardFooter sx={{pt: 4}}/>

    </>
  );
}