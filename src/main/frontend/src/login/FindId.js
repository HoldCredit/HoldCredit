import React, { useState } from "react";
import '../styles/FindId.css';


function FindId() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [birthday, setBirthday] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleNameBlur = (e) => {
        if (!e.target.value) {
            setNameError("이름을 입력해 주세요.");
        } else {
            setNameError("");
        }
    };

    const handleBirthdayChange = (e) => {
        setBirthday(e.target.value);
    };

    const handleBirthdayBlur = (e) => {
        if (!e.target.value) {
            setBirthdayError("생년월일을 입력해 주세요.");
        } else {
            setBirthdayError("");
        }
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handlePhoneNumberBlur = (e) => {
        if (!e.target.value) {
            setPhoneNumberError("네이버 메일로 인증받을 휴대폰 번호를 입력해 주세요.");
        } else {
            setPhoneNumberError("");
        }
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailBlur = (e) => {
        if (!e.target.value) {
            setEmailError("네이버 메일을 입력해 주세요.");
        } else {
            setEmailError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setNameError("이름을 입력해 주세요.");
        }
        if (!birthday) {
            setBirthdayError("생년월일을 입력해 주세요.");
        }
        if (!phoneNumber) {
            setPhoneNumberError("네이버 메일로 인증받을 휴대폰 번호를 입력해 주세요.");
        }
        if (!email) {
            setEmailError("네이버 메일을 입력해 주세요.");
        }
        
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
                                    네이버 메일로
                                    <br />
                                    ID를 보내드립니다.
                                </h2>
                                <p className="desc_g">
                                    네이버 메일의 인증하기 위해
                                    <br />
                                    휴대폰 번호를 입력해 주세요.
                                </p>
                                <div className={"box_tf1" + (nameError && " error")}>
                                    <label className="screen_out1" htmlFor="account_name--1">입력</label>
                                    <input
                                        type="text"
                                        id="account_name--1"
                                        name="account_name"
                                        placeholder="이름"
                                        maxLength={64}
                                        className="tf_g"
                                        onChange={handleNameChange}
                                        onBlur={handleNameBlur}
                                    />
                                </div>
                                {nameError && (
                                    <p className="info_tf error">{nameError}</p>
                                )}
                                <div className={"box_tf1" + (birthdayError && " error")}>
                                    <label className="screen_out1" htmlFor="birthday_yyyymmdd--2">입력</label>
                                    <input 
                                    type="tel" 
                                    id="birthday_yyyymmdd--2" 
                                    name="birthday_yyyymmdd" 
                                    placeholder="생년월일(YYYYMMDD)"
                                    maxLength={8} 
                                    className="tf_g"
                                    onChange={handleBirthdayChange}
                                    onBlur={handleBirthdayBlur} />
                                </div>
                                {birthdayError && (
                                    <p className="info_tf error">{birthdayError}</p>
                                )}
                                <div className={"box_tf1" + (phoneNumberError && " error")}>
                                    <label className="screen_out" htmlFor="phone_number">입력</label>
                                    <input 
                                    type="tel" 
                                    id="phone_number" 
                                    name="phone_number" 
                                    placeholder="휴대폰 번호" 
                                    maxLength={11} 
                                    className="tf_g"
                                    onChange={handlePhoneNumberChange}
                                    onBlur={handlePhoneNumberBlur}
                                    />
                                </div>
                                {phoneNumberError && (

                                <p className="info_tf error">{phoneNumberError}</p>
                                )}
                                  <div className={"box_tf1" + (emailError && " error")}>
                                    <label className="screen_out" htmlFor="email">입력</label>
                                    <input 
                                    type="text" 
                                    id="email" 
                                    name="emil" 
                                    placeholder="이메일" 
                                    maxLength={64} 
                                    className="tf_g"
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    />
                                </div>
                                {emailError && (

                                <p className="info_tf error">{emailError}</p>
                                )}
                                <div className="confirm_btn1">
                                    <button type="submit" className="btn_g1 submit">보내기</button>
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>

        )
    }
    export default FindId;