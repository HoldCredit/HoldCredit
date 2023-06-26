import * as React from 'react';
import Title from './Title';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Stack, TextField, Typography, Box} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import BoardService from "../../service/BoardService";
import '../../screens/css/Board.css';
import jwtDecode from "jwt-decode";

export default function BoardWrite() {

  const menu = useSelector((state) => state.selectMenu);
  const navigate = useNavigate();

  const writer = useSelector((state) => state.customerName);

  const storedToken = sessionStorage.getItem("loginData")
  const decodedToken = storedToken ? jwtDecode(storedToken) : null;
  const customerNo = decodedToken ? decodedToken.sub : null;

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pwd, setPwd] = useState('');
  const [files, setFiles] = useState([]);

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
        case 'Faq':
          const faqData = await BoardService.getFaq();
          setData(faqData.data);
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
  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileList = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileList]);
    }
  };

const postBoard = (event) => {
  event.preventDefault();

  switch (menu.menuName) {
    case 'Notice':
      let formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('pwd', pwd);
      files.forEach((file) => {
        formData.append('file', file);
      });
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      BoardService.createNotice(formData, config)
        .then(() => {
          alert('등록되었습니다.');
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          alert('등록에 실패했습니다.');
        });
      break;

    case 'Qna':
      let qnaData = {
        title: title,
        content: content,
        pwd: pwd,
        writer: writer,
        customerNo: customerNo,
      };
      BoardService.createQna(qnaData)
        .then(() => {
          alert('등록되었습니다.');
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          alert('등록에 실패했습니다.');
        });
      break;

    case 'Faq':
      let faqData = {
        name: writer,
        title: title,
        content: content,
      };
      BoardService.createFaq(faqData)
        .then(() => {
          alert('등록되었습니다.');
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          alert('등록에 실패했습니다.');
        });
      break;

    default:
      break;
  }
};






  return (
    <>
      <Title>{menu.name}</Title>
      <Grid item sx={{display: "flex", margin: "10px", paddingTop: "50px"}}>
        <Typography variant="h5" sx={{paddingLeft: '30px'}}>제목</Typography>
        <Typography variant="h5" sx={{paddingLeft: '25px'}}>
          <Input sx={{width: '300px'}} type="text" name="title"
                 value={title} onChange={changeTitleHandler}/>
        </Typography>
      </Grid>
      <Table size="large">
        <TableRow>
          <TableCell value={writer}>작성자</TableCell>
          <TableCell sx={{paddingLeft: '0', paddingRight: '200px'}}>
            <Input readOnly defaultValue={writer} type="text"/>
          </TableCell>

          <TableCell>비밀번호</TableCell>
          <TableCell sx={{paddingLeft: '0', paddingRight: '200px'}}>
            <Input defaultValue="1234" type="password" name="pwd"
                   value={pwd} onChange={changePwdHandler}/>
          </TableCell>
          <TableCell>
          <label htmlFor="fileInput" className="fileInputButton">
            파일첨부
          </label>
          <input id="fileInput" type="file" name="file"
            multiple style={{ display: 'none' }} onChange={changeFileHandler} />
            </TableCell>

        </TableRow>
      </Table>
      <Box className="write_textfield">

        <Typography variant="body1" sx={{margin: '30px'}}>
        </Typography>
        <TextField multiline fullWidth name="content" value={content}
                   variant="outlined" onChange={changeContentHandler} />
        <div>
          {files.length > 0 &&
            files.map((file, index) => (
              <div key={index} className="se-module" style={{marginTop:"0px"}}>
                <span className="se-file-icon">
                  <strong className="se-blind"></strong>
                </span>
                <div className="file">
                  <div className="selectedFile">
                    <span>{file.name}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Box>

      <Stack spacing={2} direction="row" justifyContent="center" alignItem="" marginTop="auto">
        <Button fontColor="" variant="outlined" color="warning" size="large"
                onClick={() => navigate(-1)}>목록</Button>
        <Button variant="outlined" color="warning" size="large"
                onClick={postBoard}>등록</Button>
      </Stack>
    </>
  );
}