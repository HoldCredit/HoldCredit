import * as React from 'react';
import Title from './Title';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {Button, Input, Stack, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function BoardEdit() {

  const {id} = useParams();
  const menu = useSelector((state) => state.selectMenu);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pwd, setPwd] = useState('');

  // console.log(menu.menuName);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/${menu.menuName}/${id}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, [id]);

  // const changeTitleHandler = (event) => {
  //   setTitle(event.target.value);
  // }
  // const changeContentHandler = (event) => {
  //   setContent(event.target.value);
  // }
  // const changePwdHandler = (event) => {
  //   setPwd(event.target.value);
  // }
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevNotice) => ({
      ...prevNotice,
      [name]: value
    }));
  };


  const updateNotice = (event) => {
    event.preventDefault();
    const update = {
      title: data.title,
      content: data.content,
      pwd: data.pwd
    };

    console.log("data => " + JSON.stringify(update));
    axios.put(`http://localhost:8080/api/${menu.menuName}/${id}`, update, {
      headers:{
        'Content-type': 'application/json'
      }
    })
      .then(res => {
        alert('수정되었습니다.');
        navigate(-2);
      });
  };


  return (
    <>
      <Title>{menu.name}</Title>
      <Grid item sx={{display: "flex", margin: "10px", paddingTop: "50px"}}>
        <Typography variant="h5" sx={{paddingLeft: '30px'}}>제목</Typography>
        <Typography variant="h5" sx={{paddingLeft: '25px'}}>
          <Input defaultValue={data.title} sx={{width: '300px'}} type="text" name="title"
                 value={data.title} onChange={changeHandler}/>
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
            <Input type="password" name="pwd"
                   value={pwd} onChange={changeHandler}/>
          </TableCell>
        </TableRow>
      </Table>
      <Grid item>
        <Typography variant="body1" sx={{margin: '15px'}}>
        </Typography>
        <TextField multiline fullWidth rows={14} name="content" value={data.content}
                   defaultValue={data.content} variant="outlined" onChange={changeHandler}/>

      </Grid>

      <Stack spacing={2} direction="row" justifyContent="center" alignItem="" marginTop="auto">
        <Button variant="outlined" color="warning" size="large"
                onClick={updateNotice}>수정</Button>
        <Button fontColor="" variant="outlined" color="warning" size="large"
                onClick={() => navigate(-1)}>목록</Button>
      </Stack>
    </>
  );
}