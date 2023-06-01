import * as React from 'react';
import Title from './Title';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Button, Pagination, Stack, TableContainer, TextField, Typography, Box} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import IconButton from "@mui/material/IconButton";


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
      <Box sx={{display: "flex", marginBottom: '10px'}}>
        <Typography variant="h2" sx={{fontSize: '20px', fontWeight: '600', paddingLeft: '10px'}}>제목</Typography>
        <Typography variant="h3" sx={{paddingLeft: '25px', fontSize: '20px', fontWeight: '500'}}>{data.title}</Typography>
      </Box>
      <Box className="table_custom">
        <table>
          <colgroup>
            <col width="5%" />
            <col width="5%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="10%" />
            <col width="8%" />
            <col width="10%" />
            <col width="8%" />
            <col width="5%" />
            <col width="11%" />
            <col width="14%" />
          </colgroup>
          <tbody>
          <tr>
            <th>번호</th>
            <td>{data.id}</td>
            <th>작성자</th>
            <td>{data.customer}</td>
            <th>작성일</th>
            <td>{data.createDate}</td>
            <th>수정일</th>
            <td>{data.lastModifiedDate}</td>
            <th>조회수</th>
            <td>{data.hits}</td>
            <th>첨부파일</th>
            <td>{data.attach}다운로드</td>
          </tr>
          </tbody>
        </table>
      </Box>

      <Box sx={{border: '1px solid #ddd', borderRadius: '10px', minHeight: '300px', mt: 4, mb: 4, color: '#444'}}>
        <Typography variant="body1" sx={{margin: '15px'}}>{data.content}</Typography>
      </Box>

      <Box  style={{borderTop: '1px solid #ddd', padding: '30px 0'}}>
        <Box className="flex" sx={{mb: 1, display:'flex'}}>
          <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>댓글쓴이</Typography>
          <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'normal', width: 'calc( 100% - 100px) '}}>댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬</Typography>
          <IconButton sx={{ml: 5}}><ConstructionRoundedIcon/></IconButton>
          <IconButton><CloseRoundedIcon/></IconButton>
        </Box>
        <Box className="flex" sx={{mb: 1, display:'flex', alignItem:'center'}}>
          <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>댓글쓴이</Typography>
          <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'normal', width: 'calc( 100% - 100px) '}}>댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬</Typography>
          <IconButton sx={{ml: 5}}><ConstructionRoundedIcon/></IconButton>
          <IconButton><CloseRoundedIcon/></IconButton>
        </Box>
        <Box className="flex" sx={{mb: 1, display:'flex', alignItem:'center'}}>
          <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>댓글쓴이</Typography>
          <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'normal', width: 'calc( 100% - 100px) '}}>댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬댓글댓글대슬</Typography>
          <IconButton sx={{ml: 5}}><ConstructionRoundedIcon/></IconButton>
          <IconButton><CloseRoundedIcon/></IconButton>
        </Box>
      </Box>

      <Box className="flex" sx={{mb: 3, display:'flex', alignItem:'center', justifyContent:'center'}}>
        <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>댓글쓰기</Typography>
        <textarea style={{ border: '1px solid #ddd',borderRadius: '10px', padding: '15px', fontSize: '16px', color: '#333', minHeight: '100px', width: 'calc( 100% - 100px)'}} />
        <Button variant="outlined" sx={{ml: 5, height:'40px', width:'70px'}}>등록</Button>
      </Box>

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