import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import './css/Board.css';
import '../store/CustomerNameStore'

function QnaView(props) {
  const { id } = useParams();
  const [qna, setQna] = useState({});
  const [reply, setReply] = useState('');
  const [replyList, setReplyList] = useState([]);
  const [update, setUpdate] = useState({});
  const [editMode, setEditMode] = useState({});

  const navigate = useNavigate();

  // 세션에 저장된 토큰값 가져오기
  const storedToken = sessionStorage.getItem("loginData");
  // 토큰값 해석
  const decodedToken = jwtDecode(storedToken);
  // 해석한 정보에서 회원번호만 추출
  const customerNo = decodedToken.sub;
  //customerName 가져오기
  const writer = useSelector((state) => state.customerName);


//글 리스트 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/Qna/${id}`)
      .then((res) => setQna(res.data))
      .catch((error) => console.log(error));
  }, [id]);

//댓글 리스트 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/Qna/${id}`)
      .then((res) => setReplyList(res.data.reply))
      .catch((error) => console.log(error));
  }, [id]);

//글 수정 페이지 이동
  const updateQna = () => {
    if (customerNo != qna.customerNo) {
      alert('작성자만 글을 수정할 수 있습니다.');
      return;
    }

    navigate(`/QnaEdit/${id}`);
  };

//글 목록으로 이동
  const qnaList = () => {
    navigate('/MainQnA');
  };

//글 삭제
  const deleteQna = () => {
    const confirmDelete = window.confirm('정말로 글을 삭제하시겠습니까?');
    if (confirmDelete) {
     if (customerNo !== qna.customerNo) {
          alert('작성자만 글을 삭제할 수 있습니다.');
          return;
     }
      axios
        .delete(`http://localhost:8080/api/Qna/${id}`)
        .then(() => {
          setQna({});
          alert('삭제되었습니다.');
          navigate('/MainQna');
        })
        .catch((error) => console.log(error));
    }
  };

//댓글 등록
  const handleSubmitReply = (e) => {
    e.preventDefault();

    let replyData = {
      reply: reply,
      writer: writer,
      customerNo: customerNo,
    };

    axios
      .post(`http://localhost:8080/api/Qna/${id}/Reply`, replyData)
      .then((res) => {
        alert('댓글이 등록되었습니다.');
        console.log('Comment submitted successfully');
        setReply('');
        axios
          .get(`http://localhost:8080/api/Qna/${id}`)
          .then((res) => setReplyList(res.data.reply))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

//댓글 수정
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
  const reply = replyList.find((reply) => reply.id === replyId);
  if (reply && reply.customerNo != customerNo) {
    console.log(customerNo);
    console.log(reply.customerNo);
    alert('작성자만 댓글을 수정할 수 있습니다.');
    return;
  }
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

   axios
     .put(`http://localhost:8080/api/Qna/${id}/Reply/${replyId}`, updatedReply)
     .then((res) => {
       alert('댓글이 수정되었습니다.');
       axios
         .get(`http://localhost:8080/api/Qna/${id}`)
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

//댓글 삭제
  const deleteReply = (replyId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    const reply = replyList.find((reply) => reply.id === replyId);

    if (confirmDelete) {
         if (reply && customerNo != reply.customerNo) {
              alert('작성자만 글을 삭제할 수 있습니다.');
              return;
         }
      axios
        .delete(`http://localhost:8080/api/Qna/${id}/Reply/${replyId}`)
        .then(() => {
          setReplyList((prevReplyList) => prevReplyList.filter(reply => reply.id !== replyId));
          alert('댓글이 삭제되었습니다.');
        })
        .catch((error) => console.log(error));
    }
  };

 const [like, setLike] = useState(0);


  return (
    <div>
      <div className="board_wrap">
        <div className="board_title">
          <strong>Q & A</strong>
          <div className="btn_wrap">
            <a onClick={qnaList} className="btn_list">
              목록
            </a>
            <a onClick={updateQna} className="btn_update">
              수정
            </a>
            <a onClick={deleteQna} id="btn_delete">
              삭제
            </a>
          </div>
        </div>
        <div className="board_view_wrap">
          <div className="board_view">
            <div className="title_back">
              <div className="title">{qna.title}</div>
              <div className="info">
                <dl>
                  <dt>번호</dt>
                  <dd>{qna.id}</dd>
                </dl>
                <dl>
                  <dt>글쓴이</dt>
                  <dd>{qna.writer}</dd>
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
            <div className="cont">
              {qna.content}

              <div className="CommentBox">
                <div class="ReplyBox">
                    <div class="box_left">
                        <div class="like_article">
                            <h5>💛<a onClick={()=>{setLike(like+1)}} className="like">좋아요 <em className="like_count">{like}</em></a></h5>
                        </div>
                    </div>
                    <div class="box_right">
                    </div>
                </div>
              <div class="comment_option">
                  <h3 class="comment_title">
                      댓글
                  </h3>
                  <div class="comment_tab">
                      <ul class="comment_tab_list">
                          <li class="comment_tab_item"><a href="#" role="button" aria-selected="true" class="comment_tab_button">
                                  등록순
                              </a></li>
                          <li class="comment_tab_item"><a href="#" role="button" aria-selected="false" class="comment_tab_button">
                                  최신순
                              </a></li>
                      </ul><button type="button" class="comment_refresh_button"><span class="blind">새로고침</span></button>
                  </div>
              </div>
                <ul className="comment_list">
                  {replyList.map((list) => (
                    <li className="CommentItem" key={list.id}>
                      <div className="comment_area">
                        {editMode[list.id] ? (
                          <div className="CommentWriter">
                            <div>{list.writer}</div>
                            <div className="comment_inbox">
                              {editMode[list.id] ? (
                                <textarea
                                  rows="1"
                                  className="comment_inbox_text"
                                  name="reply"
                                  value={update[list.id]?.reply || list.reply}
                                  onChange={(e) => changeHandler(e, list.id)}
                                ></textarea>
                              ) : (
                                <div>{list.reply}</div>
                              )}
                            </div>
                            <div className="comment_attach">
                              <div className="attach_box"></div>
                              <div className="register_box">
                                <a href="#" className="btn_commit" onClick={(e) => updateReply(e, list.id)}>
                                  등록
                                </a>
                             <a href="#" className="btn_cancel" onClick={(e) => {
                               e.preventDefault();
                               toggleEditMode(list.id);
                               setUpdate((prevUpdate) => ({
                                 ...prevUpdate,
                                 [list.id]: {},
                               }));
                             }}>
                               취소
                             </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ fontSize: '15px' }}>
                            <div style={{ fontWeight: 'bold' }}>{list.writer}</div>
                            {list.reply}
                            <ul className="LayerMore">
                              <li className="layer_item">
                                <a
                                  className="layer_item"
                                  role="button"
                                  onClick={() => toggleEditMode(list.id)}
                                >
                                  수정
                                </a>
                                <a onClick={() => deleteReply(list.id)} role="button">
                                  삭제
                                </a>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="comment_create">{list.createDate}</div>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleSubmitReply}>
                  <div className="CommentWriter">
                    <div className="comment_inbox">
                      <strong className="blind">댓글을 입력하세요</strong>
                      <em className="comment_inbox_name">{writer}</em>
                      <textarea
                        placeholder="댓글을 남겨보세요"
                        rows="1"
                        className="comment_inbox_text"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="comment_attach">
                      <div className="attach_box"></div>
                      <div className="register_box">
                        <button type="submit" className="btn_register">
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QnaView;
