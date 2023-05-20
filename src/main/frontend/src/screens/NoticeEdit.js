import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import NoticeService from '../service/NoticeService';
import axios from "axios";

const NoticeEdit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const[notice, setNotice] = useState([]);
    const[update, setUpdate] = useState({});


     useEffect(() => {
      axios.get(`http://localhost:8080/api/Notice/${id}`)
        .then(res => setNotice(res.data))
        .catch(error => console.log(error));
     }, [id]);

    const changeHandler = (event) => {
      const { name, value } = event.target;
      setNotice((prevNotice) => ({
        ...prevNotice,
        [name]: value
      }));
    };

       const updateNotice = (event) => {
                 event.preventDefault();

                 const update = {
                     title: notice.title,
                     content: notice.content,
                     pwd: notice.pwd
                 };

                 console.log("notice => " + JSON.stringify(notice));
                   axios.put(`http://localhost:8080/api/Notice/${id}`, update, {
                    headers:{
                        'Content-type': 'application/json'
                    }
                  })
                   .then(res => {
                   alert('수정되었습니다.');
                   navigate('/MainNotice');
                 });
               };

    return (
        <div>

            <div class="board_wrap">
                <div class="board_title">
                    <strong>수정하기</strong>
                </div>
                <div class="board_write_wrap">
                    <div class="board_write">
                        <div class="title_back">
                        <div class="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" id="write_input" placeholder="title"  name="title" value={notice.title} onChange={changeHandler}/></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="title_back">
                        <div class="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd><input type="text" id="write_input" placeholder="write"/></dd>
                        </dl>
                        <dl>
                            <dt>비밀번호</dt>
                            <dd><input type="password" id="write_input" placeholder="password" name="pwd" value={notice.pwd} onChange={changeHandler}  /></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="cont">
                            <textarea placeholder="내용 입력" name="content" value={notice.content} onChange={changeHandler} ></textarea>
                        </div>

                        <div class="btn_wrap">
                            <a onClick={updateNotice} class="btn_insert">완료</a>
                            <a href="/MainNotice" class="btn_update">취소</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeEdit