import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './css/Board.css'

function QnaView(props){

const {id} = useParams();

const[qna, setQna] = useState({});

  useEffect(() => {
     axios.get(`http://localhost:8080/api/Qna/${id}`)
       .then(res => setQna(res.data))
       .catch(error => console.log(error));
   }, [id]);


  const navigate = useNavigate();

  const updateQna = () => {
    navigate(`/QnaEdit/${id}`);
  };

  const qnaList = () => {
    navigate('/MainQnA');
  };

  const deleteQna =() => {
    const confirmDelete = window.confirm("정말로 글을 삭제하시겠습니까?");
    if(confirmDelete){
    axios.delete(`http://localhost:8080/api/Qna/${id}`)
         .then(() => {
             setQna([]);
             alert('삭제되었습니다.');
             navigate('/MainQna');
           })
           .catch(error => console.log(error));
    }
  };

  return (
    <div>
    <div class="board_wrap">
      <div class="board_title">
        <strong>Q & A</strong>
      </div>
      <div class="board_view_wrap">
        <div class="board_view">
          <div class="title_back">
          <div class="title">{qna.title}</div>
          <div class="info">
            <dl>
              <dt>번호</dt>
              <dd>{qna.id}</dd>
            </dl>
            <dl>
              <dt>글쓴이</dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>작성일</dt>
              <dd>{qna.createDate}</dd>
            </dl>
            <dl>
              <dt>수정일</dt>
              <dd>{qna.lastModifiedDate}</dd>
            </dl>
            <dl>
              <dt>조회</dt>
              <dd>{qna.hits}</dd>
            </dl>
           </div>
          </div>
          <div class="cont">{qna.content}</div>
          <div class="btn_wrap">
            <a onClick={qnaList} class="btn_list">목록</a>
            <a onClick={updateQna} class="btn_update">수정</a>
            <a onClick={deleteQna} id="btn_delete">삭제</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default QnaView;