import React, { useState } from "react";
import "../styles/FindId.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindId() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [foundId, setFoundId] = useState("");
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


  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneNumberBlur = () => {
    if (!phoneNumber) {
      setPhoneNumberError("전화번호를 입력해 주세요.");
    } else {
      setPhoneNumberError("");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 값 유효성 검사
    if (!name) {
      setNameError("이름을 입력해 주세요.");
      return;
    }
    if (!phoneNumber) {
      setPhoneNumberError("전화번호를 입력해 주세요.");
      return;
    }

    // 유효한 경우 서버로 요청 보내기
    axios
      .post("http://localhost:8080/auth/findId", {
        customer_name: name,
        phone_num: phoneNumber,
      })
      .then((response) => {
        // 응답 처리
        const { email } = response.data;

        if (email) {
          setFoundId(email);
          // 알림창에 찾은 아이디(이메일) 표시
          window.alert(`찾은 이메일: ${email}`);
          // 로그인 페이지로 이동
          navigate("/LoginPage");
        } else {
          // 등록되지 않은 이메일인 경우 알림창 표시
          window.alert("등록되지 않은 이메일입니다.");
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error("아이디 찾기 오류:", error);
      });
  };

  return (
    <div className="container_doc1">
      <div className="inner_container1">
        <main className="doc_main1">
          <div className="doc_title1">
            <h1 className="tit_service1">
              <a href="LoginPage" className="Login_name">
                <span className="ir_wa1">HOLD CREDIT</span>
              </a>
            </h1>
          </div>
          <article id="mainContent" className="content_article1">
            <div className="cont_find">
              <h2 className="tit_g">
                아이디를 찾으시겠습니까?
              </h2>
              <p className="desc_main1">
                아이디를 찾기위해
                <br />
                이름과 전화번호를 입력해 주세요.
                                          </p>
              <form onSubmit={handleSubmit}>
                <div className={"box_tf1" + (nameError && " error")}>
                  <label className="screen_out1" htmlFor="account_name--1">
                    입력
                  </label>
                  <input
                    type="text"
                    id="account_name--1"
                    name="account_name"
                    placeholder="이름"
                    maxLength={64}
                    className="tf_g"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                  />
                </div>
                {nameError && <p className="info_tf error">{nameError}</p>}
                <div className={"box_tf1" + (phoneNumberError && " error")}>
                  <label className="screen_out" htmlFor="phone_number">
                    입력
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="전화번호"
                    maxLength={11}
                    className="tf_g"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onBlur={handlePhoneNumberBlur}
                  />
                </div>
                {phoneNumberError && (
                  <p className="info_tf error">{phoneNumberError}</p>
                )}
                <div className="confirm_btn1">
                  <button type="submit" className="btn_g1 submit">
                    찾기
                  </button>
                </div>
              </form>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

export default FindId;
