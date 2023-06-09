import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../service/BoardService';
import './css/Board.css';
import jwtDecode from "jwt-decode";
import '../store/CustomerNameStore';
import { useSelector } from "react-redux";

function NoticeWrite(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pwd, setPwd] = useState('');
  const [files, setFiles] = useState([]);

// 세션에 저장된 토큰 값을 가져옵니다.
const storedToken = sessionStorage.getItem("loginData");
// 토큰이 존재할 경우 해독합니다.
const decodedToken = storedToken ? jwtDecode(storedToken) : null;
// 해독된 정보에서 고객 번호를 추출합니다.
const customerNo = decodedToken ? decodedToken.sub : null;

  // 이름 가져오기
  const writer = useSelector((state) => state.customerName);

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };



  const changeFileHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileList = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileList]);
    }
  };

  const navigate = useNavigate();

  const createNotice = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('pwd', pwd);
    formData.append('customerNo', customerNo);
    formData.append('writer', writer);
    files.forEach((file) => {
      formData.append('file', file);
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    BoardService.createNotice(formData, config)
      .then((res) => {
        alert('등록되었습니다.');
        navigate('/MainNotice');
      });
  };

  const deleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <div>
      <div className="board_wrap">
        <div className="board_title">
          <strong>공지사항</strong>
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
                      placeholder="제목을 입력해주세요."
                      name="title"
                      value={title}
                      onChange={changeTitleHandler}
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>첨부파일</dt>
                  <dd>
                    <label htmlFor="fileInput" className="fileInputButton">
                      파일첨부
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      name="file"
                      multiple
                      onChange={changeFileHandler}
                      style={{ display: 'none' }}
                    />
                  </dd>
                </dl>
              </div>
            </div>
            <div className="title_back">
              <div className="info">
                <dl>
                  <dt>글쓴이</dt>
                  <dd>{writer}</dd>
                </dl>
              </div>
            </div>
            <div className="cont">
              <textarea
                placeholder="내용 입력"
                name="content"
                value={content}
                onChange={changeContentHandler}
              ></textarea>
              <div>
                {files.length > 0 &&
                  files.map((file, index) => (
                    <div key={index} className="se-module">
                      <span className="se-file-icon">
                        <strong className="se-blind"></strong>
                      </span>
                      <div className="file">
                        <div className="selectedFile">
                          <span>{file.name}</span>
                           <div className="file_box">
                        <a
                          href="#"
                          className="file_delete"
                          onClick={() => deleteFile(index)}
                        >
                          ✖
                        </a>
                        </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="btn_wrap">
              <a href="#" className="btn_insert" onClick={createNotice}>
                등록
              </a>
              <a href="/MainNotice" className="btn_update" >
                취소
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeWrite;
