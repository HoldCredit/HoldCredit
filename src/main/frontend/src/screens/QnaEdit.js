import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import BoardService from '../service/BoardService';
import axios from "axios";

const QnaEdit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const[qna, setQna] = useState([]);
    const[update, setUpdate] = useState({});


     useEffect(() => {
      axios.get(`http://localhost:8080/api/Qna/${id}`)
        .then(res => setQna(res.data))
        .catch(error => console.log(error));
     }, [id]);

    const changeHandler = (event) => {
      const { name, value } = event.target;
      setQna((prevQna) => ({
        ...prevQna,
        [name]: value
      }));
    };

       const updateQna = (event) => {
                 event.preventDefault();

                 const update = {
                     title: qna.title,
                     content: qna.content,
                     pwd: qna.pwd
                 };

                 console.log("notice => " + JSON.stringify(qna));
                   axios.put(`http://localhost:8080/api/Qna/${id}`, update, {
                    headers:{
                        'Content-type': 'application/json'
                    }
                  })
                   .then(res => {
                   alert('수정되었습니다.');
                   navigate(`/QnaView/${id}`);
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
                            <dd><input type="text" id="write_input" placeholder="title"  name="title" value={qna.title} onChange={changeHandler}/></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="title_back">
                        <div class="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd>{qna.writer}</dd>
                        </dl>
                        <dl>
                            <dt>비밀번호</dt>
                            <dd><input type="password" id="write_input" placeholder="password" name="pwd" value={qna.pwd} onChange={changeHandler}  /></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="cont">
                            <textarea placeholder="내용 입력" name="content" value={qna.content} onChange={changeHandler} ></textarea>
                        </div>

                        <div class="btn_wrap">
                            <a onClick={updateQna} class="btn_insert">완료</a>
                            <a href="/MainQna" class="btn_update">취소</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QnaEdit;