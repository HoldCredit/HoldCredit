import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import './css/Board.css';
import axios from 'axios';

const NoticeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/Notice/${id}`)
      .then((res) => setNotice(res.data))
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:8080/attachments/${id}`)
      .then((res) => setFiles(res.data))
      .catch((error) => console.log(error));
  }, [id]);

 const deleteAttach = (attachId) => {
    const confirmDelete = window.confirm('첨부파일을 삭제하시겠습니까?');
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8080/attachments/${attachId}`)
        .then(() => {
          alert('삭제되었습니다.');
          // Remove the deleted attachment from the files state
          setFiles((prevFiles) => prevFiles.filter((file) => file.id !== attachId));
          // Remove the deleted attachment from the notice.attach property
          setNotice((prevNotice) => ({
            ...prevNotice,
            attach: prevNotice.attach.filter((attachment) => attachment.id !== attachId),
          }));
        })
        .catch((error) => console.log(error));
    }
  };



  const changeHandler = (event) => {
    const { name, value } = event.target;
    setNotice((prevNotice) => ({
      ...prevNotice,
      [name]: value,
    }));
  };

  const updateNotice = (event) => {
    event.preventDefault();

    const update = {
      title: notice.title,
      content: notice.content,
      pwd: notice.pwd,
    };

    axios
      .put(`http://localhost:8080/api/Notice/${id}`, update, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((res) => {
        alert('수정되었습니다.');
        navigate(`/NoticeView/${id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="board_wrap">
        <div className="board_title">
          <strong>수정하기</strong>
        </div>
        <div className="board_write_wrap">
          <div className="board_write">
            <div className="title_back">
              <div className="title">
                <dl>
                  <dt>제목</dt>
                  <dd>
                    <input
                      type="text"
                      id="write_input"
                      placeholder="title"
                      name="title"
                      value={notice.title}
                      onChange={changeHandler}
                    />
                  </dd>
                </dl>
              </div>
            </div>
            <div className="title_back">
              <div className="info">
                <dl>
                  <dt>글쓴이</dt>
                  <dd>{/*<input type="text" id="write_input" placeholder="write"/>*/}</dd>
                </dl>
                <dl>
                  <dt>비밀번호</dt>
                  <dd>
                    <input
                      type="password"
                      id="write_input"
                      placeholder="password"
                      name="pwd"
                      value={notice.pwd}
                      onChange={changeHandler}
                    />
                  </dd>
                </dl>
              </div>
            </div>
            <div className="cont">
              <textarea
                placeholder="내용 입력"
                name="content"
                value={notice.content}
                onChange={changeHandler}
              ></textarea>
              <div>
                {notice.attach && notice.attach.map((attachment, index) => (
                  <div className="se-module" key={index}>
                    <span className="se-file-icon">
                      <strong className="se-blind"></strong>
                    </span>
                    <div className="file">
                      <a href="#">{attachment.originFileName}</a>
                      <div className="file_box">
                        <a
                          href="#"
                          className="file_delete"
                          onClick={() => deleteAttach(attachment.id)}
                        >
                          삭제
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="btn_wrap">
              <a onClick={updateNotice} className="btn_insert">
                완료
              </a>
              <a href="/MainNotice" className="btn_update">
                취소
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeEdit;
