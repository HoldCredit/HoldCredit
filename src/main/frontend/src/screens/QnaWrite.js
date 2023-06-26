import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../service/BoardService';
import './css/Board.css';
import jwtDecode from "jwt-decode";
import '../store/CustomerNameStore'
import {useSelector} from "react-redux";


function QnaWrite(props) {

      const[qna, setQna] = useState([]);
      const[title, setTitle] = useState('');
      const[content, setContent] = useState('');
      const[pwd, setPwd] = useState('');

    // 세션에 저장된 토큰 값을 가져옵니다.
    const storedToken = sessionStorage.getItem("loginData");
    // 토큰이 존재할 경우 해독합니다.
    const decodedToken = storedToken ? jwtDecode(storedToken) : null;
    // 해독된 정보에서 고객 번호를 추출합니다.
    const customerNo = decodedToken ? decodedToken.sub : null;

      const writer = useSelector((state) => state.customerName);

         useEffect(() => {
            BoardService.getQna().then((res) => {
            setQna(res.data);
          });
         }, []);

         const changeTitleHandler = (event) => {
             setTitle(event.target.value);
         }

         const changeContentHandler = (event) => {
             setContent(event.target.value);
         }

         const changePwdHandler = (event) => {
            setPwd(event.target.value);
         }

      const navigate = useNavigate();

    const createQna = (event) => {
        event.preventDefault();
        let qna = {
          title: title,
          content: content,
          pwd: pwd,
          writer: writer,
          customerNo: customerNo,

        };
        console.log("notice => " + JSON.stringify(qna));
          BoardService.createQna(qna).then(res => {
          alert('등록되었습니다.');
          navigate('/MainQna');
        });
      };

      const cancel = () => {
        navigate('/MainQna');
      }
    return (
        <div>

            <div class="board_wrap">
                <div class="board_title">
                <strong>Q & A</strong>
            </div>
                <div class="board_write_wrap">
                    <div class="board_write">
                        <div class="title_back">
                        <div class="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" id="write_input" placeholder="title" name="title"
                            value={title} onChange={changeTitleHandler}/></dd>
                        </dl>
                        </div>
                        </div>
                        <div className="title_back">
                        <div className="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd>{writer}</dd>
                        </dl>
                        <dl>
                            <dt>비밀번호</dt>
                            <dd><input type="password" id="write_input" placeholder="password" name="pwd" value={pwd}
                            onChange={changePwdHandler}/></dd>
                        </dl>
                        </div>
                        </div>
                        <div className="cont">
                            <textarea placeholder="내용 입력" name="content" value={content}
                            onChange={changeContentHandler}></textarea>
                        </div>

                        <div className="btn_wrap">
                            <a href="#" class="btn_insert" onClick={createQna}>등록</a>
                            <a href="#" class="btn_update" onClick={cancel}>취소</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QnaWrite;