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
import {Button, Pagination, Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"

export default function BoardList() {

  const {id} = useParams();
  const navigate = useNavigate();
  const menu = useSelector((state) => state.selectMenu);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    switch (menu.name) {
      case '공지사항' :
        return getNotice()
      case 'Q & A' :
        return getQna()
    }
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

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };


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
          <Table size="midium">
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>글쓴이</TableCell>
                <TableCell align="right">작성일</TableCell>
                <TableCell align="right">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} style={{cursor: 'pointer'}}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell onClick={() => navigate(`/dashboard/${menu.menuName}/${row.id}`)}>{row.title}</TableCell>
                  <TableCell
                    onClick={() => navigate(`/dashboard/${menu.menuName}/${row.id}`)}>{row.customer_name}</TableCell>
                  <TableCell onClick={() => navigate(`/dashboard/${menu.menuName}/${row.id}`)}
                             align="right">{row.createDate}</TableCell>
                  <TableCell align="right">{row.hits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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