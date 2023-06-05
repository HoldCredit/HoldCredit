import * as React from 'react';
import Title from './Title';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Button, Stack, Typography, Box} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import IconButton from "@mui/material/IconButton";
import '../../screens/css/Board.css'
import CheckIcon from '@mui/icons-material/Check';

export default function BoardDetail() {

  const menu = useSelector((state) => state.selectMenu);
  const {id} = useParams();
  const [data, setData] = useState({});
  const [reply, setReply] = useState('');
  const [replyList, setReplyList] = useState([]);
  const [update, setUpdate] = useState({});
  const [editMode, setEditMode] = useState({});
  const navigate = useNavigate();

  // 게시글
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${menu.menuName}/${id}`)
      .then((res) => setData(res.data))
      .catch(error => console.log(error));
  }, [id]);

  const downloadAttachment = (id, path) => {
    axios({
      url: `http://localhost:8080/attachments/${id}?path=${encodeURIComponent(path)}`,
      method: 'GET',
      responseType: 'blob', // Receive the file data as 'blob'
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', path.substring(path.lastIndexOf('/') + 1));
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

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

  // 댓글 목록
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${menu.menuName}/${id}`)
      .then((res) => setReplyList(res.data.reply))
      .catch((error) => console.log(error));
  }, [id]);

  //댓글 등록
  const handleSubmitReply = (e) => {
    e.preventDefault();

    let replyData = {
      reply: reply,
    };

    axios
      .post(`http://localhost:8080/api/${menu.menuName}/${id}/Reply`, replyData)
      .then((res) => {
        console.log('Comment submitted successfully');
        setReply('');
        axios
          .get(`http://localhost:8080/api/${menu.menuName}/${id}`)
          .then((res) => setReplyList(res.data.reply))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  // 댓글 수정
  const changeHandler = (event, replyId) => {
    const { name, value } = event.target;
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [replyId]: {
        ...prevUpdate[replyId],
        [name]: value,
      },
    }));
  };

  const toggleEditMode = (replyId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [replyId]: !prevEditMode[replyId],
    }));
  };

  const updateReply = (event, replyId) => {
    event.preventDefault();

    const updatedReply = {
      reply: update[replyId]?.reply,
    };
    console.log(updatedReply)

    axios
      .put(`http://localhost:8080/api/${menu.menuName}/${id}/Reply/${replyId}`, updatedReply)
      .then((res) => {
        alert('댓글이 수정되었습니다.');
        axios
          .get(`http://localhost:8080/api/${menu.menuName}/${id}`)
          .then((res) => setReplyList(res.data.reply))
          .catch((error) => console.log(error));

        // Reset edit mode and clear update state
        setEditMode((prevEditMode) => ({
          ...prevEditMode,
          [replyId]: false,
        }));
        setUpdate((prevUpdate) => ({
          ...prevUpdate,
          [replyId]: {},
        }));
      })
      .catch((error) => console.log(error));
  };

  // 댓글 삭제
  const deleteReply = (replyId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/api/Qna/${id}/Reply/${replyId}`)
        .then(() => {
          setReplyList((prevReplyList) => prevReplyList.filter(reply => reply.id !== replyId));
          alert('댓글이 삭제되었습니다.');
        })
        .catch((error) => console.log(error));
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
          </tr>
          </tbody>
        </table>
      </Box>

      <Box sx={{border: '1px solid #ddd', borderRadius: '10px', minHeight: '300px', mt: 4, mb: 4, color: '#444'}}>
        <Typography variant="body1" sx={{margin: '15px'}}>
          {data.content}
        </Typography>
      </Box>
      <div className="cont">
        {data.attach &&
          data.attach.map((attachment, index) => (
            <div className="se-module" key={index} style={{marginTop:"0px"}}>
              <span className="se-file-icon">
                <strong className="se-blind"/>
              </span>
              <div className="file">
                <a href="#" onClick={() => downloadAttachment(attachment.id, attachment.path)}
                >
                  {attachment.originFileName}
                </a>
              </div>
            </div>
          ))}
      </div>

      {
        replyList?.map((list) => (
          <Box className="flex" key={list.id} sx={{mb: 1, display:'flex'}}>
            {editMode[list.id] ? (
              <>
                <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>작성자명</Typography>
                  {editMode[list.id] ? (
                    <textarea value={update[list.id]?.reply || list.reply}
                              rows="1" onChange={(e) => changeHandler(e, list.id)} name="reply"
                              style={{ border: '1px solid #ddd',borderRadius: '10px', padding: '15px', fontSize: '16px', color: '#333', minHeight: '100px', width: 'calc( 100% - 100px)'}}>
                    </textarea>
                    ) : (
                    <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'normal', width: 'calc( 100% - 100px) '}}>{list.reply}</Typography>
                    )}
                  <IconButton onClick={(e) => updateReply(e, list.id)} sx={{ml: 5}}><CheckIcon/></IconButton>
                  <IconButton onClick={() => toggleEditMode(list.id)}><CloseRoundedIcon/></IconButton>
              </>
          ) : (
              <>
                <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>작성자명</Typography>
                <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'normal', width: 'calc( 100% - 100px) '}}>{list.reply}</Typography>
                <IconButton onClick={() => toggleEditMode(list.id)} sx={{ml: 5}}><ConstructionRoundedIcon/></IconButton>
                <IconButton onClick={() => deleteReply(list.id)}><CloseRoundedIcon/></IconButton>
              </>
              )
            }
          </Box>
        ))
      }

      {
        menu.name == "Q & A" ?
          <form onSubmit={handleSubmitReply}>
            <Box className="flex" sx={{mb: 3, display:'flex', alignItem:'center', justifyContent:'center'}}>
              <Typography variant="span" component="span" sx={{fontSize: '16px', color: '#222', fontWeight: 'bold', width: '100px'}}>작성자명</Typography>
              <textarea value={reply} onChange={(e) => setReply(e.target.value)}
                style={{ border: '1px solid #ddd',borderRadius: '10px', padding: '15px', fontSize: '16px', color: '#333', minHeight: '100px', width: 'calc( 100% - 100px)'}} />
              <Button type="submit" variant="outlined"
                      sx={{ml: 5, height:'40px', width:'70px'}}>등록</Button>
            </Box>
          </form>
        : null
      }

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