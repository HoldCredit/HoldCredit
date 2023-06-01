import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './css/Board.css'

function NoticeView(props){

const {id} = useParams();

const[notice, setNotice] = useState({});

  useEffect(() => {
     axios.get(`http://localhost:8080/api/Notice/${id}`)
       .then(res => setNotice(res.data))
       .catch(error => console.log(error));
   }, [id]);


  const navigate = useNavigate();

  const updateNotice = () => {
    navigate(`/NoticeEdit/${id}`);
  };

  const noticeList = () => {
    navigate('/MainNotice');
  };

  const deleteNotice =() => {
    const confirmDelete = window.confirm("정말로 글을 삭제하시겠습니까?");
    if(confirmDelete){
    axios.delete(`http://localhost:8080/api/Notice/${id}`)
         .then(() => {
             setNotice([]);
             alert('삭제되었습니다.');
             navigate('/MainNotice');
           })
           .catch(error => console.log(error));
    }
  };

  return (
    <div>
    <div class="board_wrap">
      <div class="board_title">
        <strong>공지사항</strong>
          <div class="btn_wrap">
            <a onClick={noticeList} class="btn_list">목록</a>
            <a onClick={updateNotice} class="btn_update">수정</a>
            <a onClick={deleteNotice} id="btn_delete">삭제</a>
          </div>
      </div>
      <div class="board_view_wrap">
        <div class="board_view">
          <div class="title_back">
          <div class="title">{notice.title}</div>
          <div class="info">
            <dl>
              <dt>번호</dt>
              <dd>{notice.id}</dd>
            </dl>
            <dl>
              <dt>글쓴이</dt>
              <dd>{notice.customer}</dd>
            </dl>
            <dl>
              <dt>작성일</dt>
              <dd>{notice.createDate}</dd>
            </dl>
            <dl>
              <dt>수정일</dt>
              <dd>{notice.lastModifiedDate}</dd>
            </dl>
            <dl>
              <dt>조회</dt>
              <dd>{notice.hits}</dd>
            </dl>
            <dl>
              <dt>첨부파일</dt>
              <dd>{notice.attach}</dd>
            </dl>
          </div>
          </div>
          <div class="cont">{notice.content}</div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default NoticeView;