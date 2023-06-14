import React, { useState } from "react";
import axios from "axios";
import "../styles/FindPwd.css";
import { useNavigate } from "react-router-dom";

function FindPwd() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    if (!name) {
      setNameError("이름을 입력해 주세요.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/auth/findPwd", {
        customer_name: name,
        email: email,
      })
      .then(() => {
        setErrorMessage("");
        window.alert("이메일이 성공적으로 전송되었습니다.");
        navigate("/LoginPage");
      })
      .catch((error) => {
        console.error("비밀번호 찾기 실패:", error);
        setErrorMessage("일치하는 계정을 찾을 수 없습니다.");
        window.alert("이메일 전송에 실패했습니다."); // 메일 전송 실패 알림창
      });
  };

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
                임시 비밀번호를
                <br />
                네이버 메일에 보내드립니다.
              </h2>
              <p className="desc_main2">
                비밀번호를 재설정할
                <br />
                이름과 이메일을 입력해 주세요.
              </p>
              <form onSubmit={handleSubmit} id="findByEmailForm">
                <fieldset className="fld_apply">
                  <div className={"box_tf2" + (nameError && " error")}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="이름"
                      maxLength={65}
                      className="tf_g"
                      value={name}
                      onChange={handleNameChange}
                      onBlur={handleNameBlur}
                    />
                  </div>
                  {nameError && <p className="info_tf error">{nameError}</p>}

                  <div className="item_tf2">
                    <div className="item_tf2 item_inp2">
                      <input
                        type="email"
                        className="tf_g2"
                        name="email"
                        id="email"
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="info_tf error">{errorMessage}</p>
                  )}
                  <div className="wrap_btn2 wrap_btn3">
                    <button type="submit" className="btn_g2">
                      비밀번호 찾기
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

export default FindPwd;
