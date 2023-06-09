import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import './css/Board.css'
import '../store/CustomerNameStore'

function NoticeView(props) {
    const { id } = useParams();
    const [notice, setNotice] = useState({});

// 세션에 저장된 토큰 값을 가져옵니다.
const storedToken = sessionStorage.getItem("loginData");
// 토큰이 존재할 경우 해독합니다.
const decodedToken = storedToken ? jwtDecode(storedToken) : null;
// 해독된 정보에서 고객 번호를 추출합니다.
const customerNo = decodedToken ? decodedToken.sub : null;
    //customerName 가져오기
    const writer = useSelector((state) => state.customerName);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/Notice/${id}`)
            .then((res) => setNotice(res.data))
            .catch((error) => console.log(error));
    }, [id]);

    const navigate = useNavigate();

    const updateNotice = () => {
        if (customerNo != notice.customerNo) {
          alert('작성자만 글을 수정할 수 있습니다.');
          return;
        }
        navigate(`/NoticeEdit/${id}`);
    };

    const noticeList = () => {
        navigate('/MainNotice');
    };


    const deleteNotice = () => {
        const confirmDelete = window.confirm('정말로 글을 삭제하시겠습니까?');
        if (confirmDelete) {
                if (customerNo != notice.customerNo) {
                  alert('작성자만 글을 삭제할 수 있습니다.');
                  return;
                }
            axios
                .delete(`http://localhost:8080/api/Notice/${id}`)
                .then(() => {
                    setNotice({});
                    alert('삭제되었습니다.');
                    navigate('/MainNotice');
                })
                .catch((error) => console.log(error));
        }
    };


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

    return (
        <div>
            <div className="board_wrap">
                <div className="board_title">
                    <strong>공지사항</strong>
                    <div className="btn_wrap">
                        <a onClick={noticeList} className="btn_list">
                            목록
                        </a>
                        <a onClick={updateNotice} className="btn_update">
                            수정
                        </a>
                        <a onClick={deleteNotice} id="btn_delete">
                            삭제
                        </a>
                    </div>
                </div>
                <div className="board_view_wrap">
                    <div className="board_view">
                        <div className="title_back">
                            <div className="title">{notice.title}</div>
                            <div className="info">
                                <dl>
                                    <dt>번호</dt>
                                    <dd>{notice.id}</dd>
                                </dl>
                                <dl>
                                    <dt>글쓴이</dt>
                                    <dd>{notice.writer}</dd>
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
                            </div>
                        </div>
                        <div className="cont">
                            {notice.content}
                            {notice.attach &&
                                notice.attach.map((attachment, index) => (
                                    <div className="se-module" key={index}>
                                        <span className="se-file-icon">
                                            <strong className="se-blind"></strong>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeView;
