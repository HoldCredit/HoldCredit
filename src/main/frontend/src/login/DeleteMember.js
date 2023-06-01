import React from "react";
import '../styles/DeleteMember.css';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";

function DeleteMember() {
    const navigate = useNavigate();
    const [memberInfo, setMemberInfo] = useState({});
//일단 이름을 가져와보자ㄴ
useEffect(() => {
     axios.get(`/customerModify/${21}`)
     .then((res) => {
        console.log(res.data);
        setMemberInfo(res.data);
     })
     .catch((error) => {
        console.log('계정 삭제 페이지 에러:' + error);
     });
    }, []);

// 비밀번호 확인
// 비밀번호 확인
const [password, setPassword] = useState('');
const [isPasswordMatch, setIsPasswordMatch] = useState(true);

const handleDeleteMember = () => {
  // 비밀번호가 일치하는지 확인
  if (password === memberInfo.password) {
    // 일치하는 경우 회원 삭제 처리
    axios
      .delete(`/customerModify/delete/${21}`)
      .then((res) => {
        // 회원 삭제 성공 처리
        navigate('/memberList');
      })
      .catch((error) => {
        console.log('회원 삭제 에러: ' + error);
      });
  } else {
    // 비밀번호가 일치하지 않는 경우
    setIsPasswordMatch(false);
  }
};



    return (
        <div className="delete_doc">
            <div className="delete_container">
                <main className="delete_main">
                    <div className="delete_title">
                        <h1 className="delete_service">
                            <a href="/LoginPage" className="delete_name">
                                <span className="ir_wa3">HOLD CREDIT</span>
                            </a>
                        </h1>
                    </div>
                    <article id="myDelete" className="content_delete">
                        <div className="cont_delete">
                            <h2 className="delete_content bold">
                        {memberInfo.customer_name}님 계정을 삭제하시겠습니까?
                            </h2>
                            <p className="desc_delete">
                                삭제하면 되돌릴수 없습니다.
                                <br/>
                                삭제하려면 비밀번호를 입력하시오.
                            </p>
                            <form id="DeleteByPassword" onSubmit={handleDeleteMember}>
                                <fieldset className="fld_apply">
                                    <legend className="screen_out3">정보입력 폼</legend>
                                    <strong className="tf_required3">비밀번호 입력</strong>
                                    <div className="item_tf3">
                                        <div className="item_tf3 item_inp3">
                                           <input
                                             type="password"
                                             className="tf_g3"
                                             name="password"
                                             id="tfNick"
                                             placeholder="비밀번호를 입력하세요."
                                             value={password} // Add this line to bind the input value to the 'password' state
                                             onChange={(e) => setPassword(e.target.value)} // Add this line to update the 'password' state on input change
                                           />
                                        </div>
                                    </div>
                                    <div className="wrap_btn3 wrap_btn4">
                                        <button type="submit" className="btn_g3">회원 계정 삭제</button>
                                        <button type="submit" className="btn_g4">다른 서비스 둘러보기</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </article>
                </main>
            </div>
        </div>
    )
}
export default DeleteMember;