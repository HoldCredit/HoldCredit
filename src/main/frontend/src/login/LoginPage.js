import React, {useEffect, useState} from "react";
import '../styles/Login.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {setName} from "../store/CustomerNameStore";

function LoginPage() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                  email,
                  password,
              },
              {
                  headers: {"Content-Type": "application/json"},
              });
            const data = response.data;

            if (response.status == 200) {
                localStorage.setItem("loginData", JSON.stringify(data));
                const storedToken = localStorage.getItem("loginData");
                const decodedToken = jwtDecode(storedToken);
                const customerName = decodedToken.sub;
                dispatch(setName(customerName));
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-doc">
            <div className="inner_container">
                <main className="doc_main">
                    <div className="doc_title">
                        <h1 className="tit_service">
                            <span className="Login_name">
                                <span className="ir_wa">HOLD CREDIT</span>
                            </span>
                        </h1>
                    </div>
                    <article id="mainContent" className="content_article">
                        <div className="cont_login">
                            <div className="loginFrom">
                                <form>
                                    <div className="box_Id">
                                    <label className="screen_out">계정정보 입력</label>
                                        <input type="email" onChange={emailHandler} value={email} placeholder="email" className="tf_g" />
                                    </div>
                                    
                                    <div className="box_Pwd">
                                    <label className="screen_out">비밀번호 입력</label>
                                        <input type="password" onChange={passwordHandler} value={password} placeholder="password" className="tf_g"/>
                                    </div>
                                    <div className="login_checkbox">
                                        <div id="login_ck">
                                            <input type="checkbox" id="checkbox" className="check_sign"/>
                                            <label className="loginCk">
                                                <span className="loginchecked" >로그인 상태 유지</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="login_btn">
                                        <button type="submit" className="btn_submit" onClick={handleLogin}>
                                            로그인
                                        </button>
                                    </div>
                                </form>
                                <div className="info_user">
                                    <button className="link_join" onClick={() => navigate('/JoinForm')}>회원가입</button>
                                    <ul className="list_user">
                                        <li>
                                            <button className="link_user" onClick={() => navigate('/FindId')}>계정 찾기</button>
                                        </li>
                                        <li>
                                            <button className="link_user" onClick={() => navigate('/FindPwd')}>비밀번호 찾기</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </div>
    )
}

export default LoginPage;