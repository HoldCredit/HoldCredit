import React from "react";
import '../styles/DeleteMember.css';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";
//jwt
import jwtDecode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {setName} from "../store/CustomerNameStore";
//로그아웃
import {handleLogout} from "../store/CustomerNameStore";


function DeleteMember() {
    const navigate = useNavigate();
    const [memberInfo, setMemberInfo] = useState({});
    // 세션에 저장된 토큰 값을 가져옵니다.
    const storedToken = sessionStorage.getItem("loginData");
    // 토큰이 존재할 경우 해독합니다.
    const decodedToken = storedToken ? jwtDecode(storedToken) : null;
    // 해독된 정보에서 고객 번호를 추출합니다.
    const customerNo = decodedToken ? decodedToken.sub : null;

     //로그아웃
     const dispatch = useDispatch();

//일단 이름을 가져와보자
useEffect(() => {
     axios.get(`/customerModify/${customerNo}`)
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
  const [password, setPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

const handleDeleteMember = async (event) => {
 event.preventDefault();
  if (!memberInfo) {
    console.log("회원 정보를 가져오는 중입니다...");
    return;
  }

  console.log("비밀번호 :" + memberInfo.password);
  console.log(typeof password);

      try {
        // 일치하는 경우 회원 삭제 처리
        await axios.delete(`/customerModify/delete/${customerNo}`, {
            params: {
                password
            }
        })
        .then((res) => {
            dispatch(handleLogout(''));
            alert("그동안 찾아주셔서 감사했습니다~");
            // 회원 삭제 성공 처리
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
        });

      } catch (error) {
        console.log("회원 삭제 에러: " + error);
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
                            <form id="DeleteByPassword">
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
                                        <button type="submit" className="btn_g3" onClick={handleDeleteMember}>회원 계정 삭제</button>
                                        <button type="submit" className="btn_g4" onClick={() => navigate('/EditMember')}>돌아가기</button>
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