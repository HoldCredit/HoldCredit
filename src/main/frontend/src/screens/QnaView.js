import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Board.css';

function QnaView(props) {
  const { id } = useParams();
  const [qna, setQna] = useState({});
  const [reply, setReply] = useState('');
  const [replyList, setReplyList] = useState([]);
  const [update, setUpdate] = useState({});
  const [editMode, setEditMode] = useState({});

  const navigate = useNavigate();

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
    };

    axios
      .post(`http://localhost:8080/api/Qna/${id}/Reply`, replyData)
      .then((res) => {
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
            <div className="cont">
              {qna.content}
              <div className="CommentBox">
                <ul className="comment_list">
                  {replyList.map((list) => (
                    <li className="CommentItem" key={list.id}>
                      <div className="comment_area">
                        {editMode[list.id] ? (
                          <form onSubmit={(e) => updateReply(e, list.id)}>
                            <div className="CommentWriter">
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
                                  <button type="submit" className="btn_register">
                                    등록
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        ) : (
                        <div>{list.reply}
                          <ul className="LayerMore">
                            <li className="layer_item">
                              <a className="layer_item" role="button"
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
                      <em className="comment_inbox_name">김영빈</em>
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
