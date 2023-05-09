import React, { useState } from "react";
import '../styles/FindPwd.css';


function FindPwd() {
    return (
        <div className="container_doc2">
            <div className="inner_container2">
                <main className="doc_main2">
                    <div className="doc_title2">
                        <h1 className="tit_service2">
                            <a href="/LoginPage" className="Login_name2">
                                <span className="ir_wa2">HOLD CREDIT</span>
                            </a>
                        </h1>
                    </div>
                    <article id="mArticle2" className="content_article2">
                        <div className="cont_find2">
                            <h2 className="tit_content2">
                                네이버계정의
                                <br />
                                임시비밀번호를 보내드립니다.
                            </h2>
                            <p className="desc_main2">
                                비밀번호를 재설정할
                                <br />
                                메일계정의 이메일 또는 전화번호를 입력해 주세요.
                            </p>
                            <form id="findByEmailForm">
                                <fieldset className="fld_apply">
                                    <legend className="screen_out2">정보입력 폼</legend>
                                    <strong className="tf_required2">네이버 계정</strong>
                                    <div className="item_tf2">
                                        <div className="item_tf2 item_inp2">
                                            <label htmlFor="tfNick" className="lab_g lab_txt lab_placeholder2" id="tfNick_label">
                                                <span aria-hidden="true">이메일 또는 전화번호</span>
                                                <span className="screen_out2">이메일 또는 전화번호</span>
                                            </label>
                                            <input datatype="text" className="tf_g2" name="email_or_phone" id="tfNick" formNoValidate="email_or_phone" data-error-empty="비밀번호를 재설정할 네이버계정의 이메일 또는 전화번호를 입력해 주세요." type="text" data-error-oninvalid={"카카오계정을 정확하게 입력해 주세요."} />
                                        </div>
                                    </div>
                                    <div className="wrap_btn2 wrap_btn3">
                                        <button type="submit" className="btn_g2">다음</button>
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