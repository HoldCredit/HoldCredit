import React from "react";
import '../styles/Login.css';

function LoginPage() {

    function handleJoinClick() {
        // 회원가입 버튼 클릭 시 동작할 코드를 작성합니다.
    }

    function handleFindAccountClick() {
        // 계정 찾기 버튼 클릭 시 동작할 코드를 작성합니다.
    }

    function handleFindPasswordClick() {
        // 비밀번호 찾기 버튼 클릭 시 동작할 코드를 작성합니다.
    }

    return (
        <div className="container_doc">
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
                                        <input type="text" id="loginId" name="loginId" placeholder="아이디, 이메일" className="tf_g" />
                                    </div>
                                    <div className="util_tf">
                                        <button type="button" className="btn_clear">
                                            <span className="ico_comm ico_clear">입력 내용 지우기</span>
                                        </button>
                                    </div>
                                    <div className="box_Pwd">
                                    <label className="screen_out">비밀번호 입력</label>
                                        <input type="password" id="password" name="password" placeholder="비밀번호" className="tf_g"/>
                                    </div>
                                    <div className="login_checkbox">
                                        <div id="login_ck">
                                            <input type="checkbox" id="checkbox" className="check_sign"/>
                                            <label className="loginCk">
                                                <span className="loginchecked">로그인 상태 유지</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="login_btn">
                                        <button type="submit" className="btn_submit">
                                            로그인
                                        </button>
                                    </div>
                                </form>
                                <div className="info_user">
                                    <button className="link_join" onClick={handleJoinClick}>회원가입</button>
                                    <ul className="list_user">
                                        <li>
                                            <button className="link_user" onClick={handleFindAccountClick}>계정 찾기</button>
                                        </li>
                                        <li>
                                            <button className="link_user" onClick={handleFindPasswordClick}>비밀번호 찾기</button>
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