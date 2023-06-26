import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
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

export default function BoardList() {

  const {id} = useParams();
  const navigate = useNavigate();
  const menu = useSelector((state) => state.selectMenu);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setData([]);
    if (menu.name == '공지사항') getNotice();
    else if (menu.name == 'Q & A') getQna();
    else if (menu.name == '자주 묻는 질문') getFaq();
  }, [menu, currentPage]);

  const getNotice = () => {
    axios.get(`http://localhost:8080/api?page=${currentPage}&size=5`)
      .then(res => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  }
  const getQna = () => {
    axios.get(`http://localhost:8080/api/Qna?page=${currentPage}&size=5`)
      .then(res => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  }
  const getFaq = () => {
    axios.get(`http://localhost:8080/api/faq?page=${currentPage}&size=5`)
      .then(res => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };


  const deleteFaq = (faqId) => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/api/faq/${faqId}`)
        .then(() => {
          setData([]);
          alert('삭제되었습니다.');
          navigate(-1);
          getFaq();
        })
        .catch(error => console.log(error));
    }
  };

  console.log(data)
  return (
    <>
      <Title>{menu.name}</Title>
      <Box display="flex" justifyContent="flex-end" alignItems="center" marginBottom={2}>
        <Button variant="outlined" color="warning" alignItem="rigth"
                onClick={() => navigate(`/Dashboard/${menu.menuName}/post`)}>
          글쓰기
        </Button>
      </Box>
      <Grid container direction="column" spacing={2} style={{paddingTop: '50px'}}>
        <Grid item>

          {
            menu.name != '자주 묻는 질문' ?
              <Table size="midium">
                <TableHead>
                  <TableRow>
                    <TableCell width="37%">번호</TableCell>
                    <TableCell width="36%">제목</TableCell>
                    <TableCell width="10%">글쓴이</TableCell>
                    <TableCell width="10%">작성일</TableCell>
                    <TableCell>조회수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.map((row) => (
                    <TableRow key={row.id} style={{cursor: 'pointer'}}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell onClick={() => navigate(`/dashboard/${menu.menuName}/${row.id}`)}>{row.title}</TableCell>
                      <TableCell
                        onClick={() => navigate(`/dashboard/${menu.menuName}/${row.id}`)}>{row.writer}</TableCell>
                      <TableCell onClick={() => navigate(`/dashboard/${menu.menuName}/${row.id}`)}>{row.createDate}</TableCell>
                      <TableCell>{row.hits}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
              :
              <>
              {
                data.map((row) => (
                  <Accordion key={row.id} outlined>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content" id="panel1a-header">
                      <Typography>{row.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{mb: 1, display:'flex'}}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                      <Typography>
                        {row.content}
                      </Typography>
                        <Box>
                        <IconButton onClick={() => deleteFaq(row.id)}><CloseRoundedIcon/></IconButton>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              }
              </>
          }
        </Grid>
      </Grid>

      <Stack alignItems="center" marginTop="auto">
        <Pagination count={totalPages}
                    page={currentPage + 1}
                    onChange={handlePageChange}/>
      </Stack>

    </>
  );
}