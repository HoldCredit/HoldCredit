import * as React from 'react';
import Title from './Title';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Button, Pagination, Stack, TableContainer, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";


export default function BoardDetail() {

  const menu = useSelector((state) => state.selectMenu);
  const {id} = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log(id)

  useEffect(() => {
    axios.get(`http://localhost:8080/api/${menu.menuName}/${id}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, [id]);


  const deleteData = () => {
    const confirmDelete = window.confirm("정말로 글을 삭제하시겠습니까?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/api/${menu.menuName}/${id}`)
        .then(() => {
          setData([]);
          alert('삭제되었습니다.');
          navigate(-1);
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <>
      <Title>{menu.name}</Title>
      <Grid item sx={{display: "flex", margin: "10px", paddingTop: "50px"}}>
        <Typography variant="h5" sx={{paddingLeft: '30px'}}>제목</Typography>
        <Typography variant="h5" sx={{paddingLeft: '25px'}}>{data.title}</Typography>
      </Grid>
      <Divider/>
      <Table size="large">
        <TableRow>
          <TableCell>번호</TableCell>
          <TableCell sx={{paddingLeft:'0',paddingRight:'60px'}}>{data.id}</TableCell>
          <TableCell>작성자</TableCell>
          <TableCell sx={{paddingLeft:'0',paddingRight:'60px'}}>{data.customer_name}</TableCell>
          <TableCell>작성일</TableCell>
          <TableCell sx={{paddingLeft:'0',paddingRight:'60px'}}>{data.createDate}</TableCell>
          <TableCell>수정일</TableCell>
          <TableCell sx={{paddingLeft:'0',paddingRight:'60px'}}>{data.lastModifiedDate}</TableCell>
          <TableCell>조회수</TableCell>
          <TableCell sx={{paddingLeft:'0',paddingRight:'60px'}}>{data.hits}</TableCell>
          <TableCell>첨부파일</TableCell>
          <TableCell sx={{paddingLeft:'0',paddingRight:'60px'}}>{data.attach}</TableCell>
        </TableRow>
      </Table>
      <Grid item>
        <Typography variant="body1" sx={{margin: '15px'}}>{data.content}</Typography>
      </Grid>

      <Stack spacing={2} direction="row" justifyContent="center" alignItem="" marginTop="auto">
        <Button fontColor="" variant="outlined" color="warning" size="large"
                onClick={() => navigate(-1)}>목록</Button>
        <Button variant="outlined" color="warning" size="large"
                onClick={() => navigate(`/Dashboard/${menu.menuName}/${id}/edit`)}>수정</Button>
        <Button variant="outlined" color="error" size="large"
                onClick={() => deleteData()}>삭제</Button>
      </Stack>
    </>
  );
}