import React from "react";
import '../styles/DeleteMember.css';


function DeleteMember() {
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
                            <h2 className="delete_content">
                                계정을 삭제하시겠습니까?
                            </h2>
                            <p className="desc_delete">
                                삭제하면 되돌릴수 없습니다.
                                <br/>
                                삭제하려면 비밀번호를 입력하시오.
                            </p>
                            <form id="DeleteByPhone">
                                <fieldset className="fld_apply">
                                    <legend className="screen_out3">정보입력 폼</legend>
                                    <strong className="tf_required3">비밀번호 입력</strong>
                                    <div className="item_tf3">
                                        <div className="item_tf3 item_inp3">
                                            <input type="password" className="tf_g3" name="email_or_phone" id="tfNick" placeholder="비밀번호를 입력하세요."/>
                                        </div>
                                    </div>
                                    <div className="wrap_btn3 wrap_btn4">
                                        <button type="submit" className="btn_g3">삭제</button>
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