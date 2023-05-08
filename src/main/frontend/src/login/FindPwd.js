import React, { useState } from "react";
import '../styles/FindPwd.css';


function FindPwd() {
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
                    <article id="mArticle" className="content_article">
                        <div className="cont_find">
                            <h2 className="tit_main">
                                네이버계정의
                                <br />
                                임시비밀번호를 보내드립니다.
                            </h2>
                            <p className="desc_main">
                                비밀번호를 재설정할
                                <br />
                                메일계정의 이메일 또는 전화번호를 입력해 주세요.
                            </p>
                            <form id="findByEmailForm">
                                <fieldset className="fld_apply">
                                    <legend className="screen_out">정보입력 폼</legend>
                                    <strong className="tf_required">네이버 계정</strong>
                                    <div className="item_tf">
                                        <div className="item_tf item_inp">
                                            <label htmlFor="tfNick" className="lab_g lab_txt lab_placeholder" id="tfNick_label">
                                                <span aria-hidden="true">이메일 또는 전화번호</span>
                                                <span className="screen_out">이메일 또는 전화번호</span>
                                            </label>
                                            <input datatype="text" className="tf_g" name="email_or_phone" id="tfNick" formNoValidate="email_or_phone" data-error-empty="비밀번호를 재설정할 네이버계정의 이메일 또는 전화번호를 입력해 주세요." type="text" data-error-oninvalid={"카카오계정을 정확하게 입력해 주세요."} />
                                        </div>
                                    </div>
                                    <div className="wrap_btn wrap_btn3">
                                        <button type="submit" className="btn_g">다음</button>
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
export default FindPwd;