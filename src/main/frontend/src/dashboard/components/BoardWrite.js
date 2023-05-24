import * as React from 'react';
import Title from './Title';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Button, Input, Pagination, Stack, TableContainer, TextareaAutosize, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Divider from "@mui/material/Divider";
import BoardService from "../../service/BoardService";

const ariaLabel = {'aria-label': 'description'};

export default function BoardWrite() {

  const menu = useSelector((state) => state.selectMenu);
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      switch (menu.menuName) {
        case 'Notice':
          const noticeData = await BoardService.getNotice();
          setData(noticeData.data);
          break;
        case 'Qna':
          const qnaData = await BoardService.getQna();
          setData(qnaData.data);
          break;
      }
    };
    fetchData();
  }, []);

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  }
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  }
  const changePwdHandler = (event) => {
    setPwd(event.target.value);
  }

  const postBoard = (event) => {
    event.preventDefault();
    let data = {
      title: title,
      content: content,
      pwd: pwd,
    };
    switch (menu.menuName) {
      case 'Notice':
        return BoardService.createNotice(data).then(res => {
          alert('등록되었습니다.');
          navigate(-1);
        });
      case 'Qna' :
        return BoardService.createQna(data).then(res => {
          alert('등록되었습니다.');
          navigate(-1);
        });
    }
  };


  return (
    <>
      <Title>{menu.name}</Title>
      <Grid item sx={{display: "flex", margin: "10px", paddingTop: "50px"}}>
        <Typography variant="h5" sx={{paddingLeft: '30px'}}>제목</Typography>
        <Typography variant="h5" sx={{paddingLeft: '25px'}}>
          <Input defaultValue="제목을 입력하세요." sx={{width: '300px'}} type="text" name="title"
                 value={title} onChange={changeTitleHandler}/>
        </Typography>
      </Grid>
      <Table size="large">
        <TableRow>
          <TableCell>작성자</TableCell>
          <TableCell sx={{paddingLeft: '0', paddingRight: '200px'}}>
            <Input defaultValue={data.writer} type="text"/>
          </TableCell>
          <TableCell>비밀번호</TableCell>
          <TableCell sx={{paddingLeft: '0', paddingRight: '200px'}}>
            <Input defaultValue="1234" type="password" name="pwd"
                   value={pwd} onChange={changePwdHandler}/>
          </TableCell>
        </TableRow>
      </Table>
      <Grid item>
        <Typography variant="body1" sx={{margin: '15px'}}>
        </Typography>
        <TextField multiline fullWidth rows={14} name="content" value={content}
                   variant="outlined" onChange={changeContentHandler}/>

      </Grid>

      <Stack spacing={2} direction="row" justifyContent="center" alignItem="" marginTop="auto">
        <Button fontColor="" variant="outlined" color="warning" size="large"
                onClick={() => navigate(-1)}>목록</Button>
        <Button variant="outlined" color="warning" size="large"
                onClick={postBoard}>등록</Button>
      </Stack>
    </>
  );
}