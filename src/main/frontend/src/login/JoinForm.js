import React, { useState } from "react";
import "../styles/JoinForm.css";
import CheckIcon from '@mui/icons-material/Check';


function JoinForm() {
    const [isIdRequired, setIsIdRequired] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
    const [isPasswordCheckRequired, setIsPasswordCheckRequired] = useState(false);
    const [isIdLengthValid, setIsIdLengthValid] = useState(true);
    const [isIdValid, setIsIdValid] = useState(true);
    const [showBirthdayMsg, setShowBirthdayMsg] = useState(false);

    // 아이디
    const handleIdChange = (e) => {
        const idValue = e.target.value;
        if (idValue === "") {
            setIsIdRequired(true);
            setIsIdValid(true);
        } else if (idValue.length <= 5 || !/^[a-z0-9_-]{5,20}$/.test(idValue)) {
            setIsIdValid(false);
        } else {
            setIsIdRequired(false);
            setIsIdValid(true);
        }
    };

    // 비밀번호
    const handlePasswordBlur = (e) => {
        const passwordValue = e.target.value;
        if (passwordValue.length === 0) {
            setIsPasswordValid(false);
            setIsPasswordRequired(true);
        } else if (passwordValue.length < 8) {
            setIsPasswordValid(false);
            setIsPasswordRequired(false);
        } else {
            setIsPasswordValid(true);
            setIsPasswordRequired(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length > 0) {
            setIsPasswordRequired(false);
        }
    };
    // 비밀번호 체크
    const handlePasswordCheckChange = (e) => {
        const passwordCheckValue = e.target.value;
        setPasswordCheck(passwordCheckValue);
        if (passwordCheckValue.length === 0) {
            setIsPasswordCheckValid(false);
            setIsPasswordCheckRequired(true);
        } else if (passwordCheckValue !== password) {
            setIsPasswordCheckValid(false);
            setIsPasswordCheckRequired(false);
        } else {
            setIsPasswordCheckValid(true);
            setIsPasswordCheckRequired(false);
        }
    };

    const handlePasswordCheckBlur = (e) => {
        const passwordCheckValue = e.target.value;
        if (passwordCheckValue.length === 0) {
            setIsPasswordCheckRequired(true);
        } else if (passwordCheckValue !== password) {
            setIsPasswordCheckRequired(false);
        } else {
            setIsPasswordCheckRequired(false);
        }
    };

    // 이름
    const [name, setName] = useState("");
    const [showNameMsg, setShowNameMsg] = useState(false);

    const handleNameBlur = () => {
        if (name === "") {
            setShowNameMsg(true);
        } else {
            setShowNameMsg(false);
        }
    };

    // 생년 월 일
    const [message, setMessage] = useState('');

    function handleYearClick() {
        setMessage('태어난 년도 4자리를 정확하게 입력하세요.');
    }

    function handleMonthClick() {
        setMessage('태어난 월을 선택하세요.');
    }

    function handleDayClick() {
        setMessage('태어난 일 (날짜) 2자리를 정확하게 입력하세요.');
    }
    function handleBlur() {
        setMessage('');
    }

    // 성별
    const [isRequired, setIsRequired] = useState(false);
    
    const [gender, setGender] = useState('');
    
    function genderBlur() {
        setIsRequired(document.querySelector("#gender").value === "");
    }

    // 직업구분
    const [isOccupation, setIsOccupation] = useState(false);
    
    const [occupation, setOccupation] = useState('');

    function occupationBlur() {
        setIsOccupation(document.querySelector("#occupation").value === "");
    }

    // 교육 수준
    const [isEducation, setIsEducation] = useState(false);
    
    const [education, setEducation] = useState('');

    function educationBlur() {
        setIsEducation(document.querySelector("#education").value === "");
    }



    // 메일
    const [email, setEmail] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailBlur = () => {
        if (!isValidEmail(email)) {
            setEmailErrorMsg("이메일 주소를 다시 확인해주세요.");
        } else {
            setEmailErrorMsg("");
        }
    };


    const isValidEmail = (email) => {
        // 이메일 형식이 맞는지 검증하는 로직을 작성합니다.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  


    return (
        <div id="wrap">
            <div id="header" className="join_membership">
                <h1>
                    <a href="/LoginPage" className="h_logo">
                        <span className="blind">HOLD CREDIT</span>
                    </a>
                </h1>
            </div>
            <div id="container">
                <div id="content">
                    <h2 className="blind1">holdcredit 회원가입</h2>
                    <div className="join_content">
                        <div className="row_group">
                            <div className="join_row">
                                <h3 className="join_title">
                                    <label htmlFor="id">아이디</label>
                                </h3>
                                <span className="ps_box int_id">
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        className="int1"
                                        title="ID"
                                        maxLength={20}
                                        onBlur={(e) => {
                                            if (e.target.value === "") {
                                                setIsIdRequired(true);
                                            } else {
                                                setIsIdRequired(false);
                                            }
                                        }}
                                        onChange={handleIdChange}
                                    />
                                    <span className="step_url">@holdcredit.com</span>
                                </span>
                                {isIdRequired && (
                                    <span className="error_next_box" id="idMsg" style={{ display: isIdRequired ? "block" : "none" }}>
                                        필수 정보입니다.
                                    </span>
                                )}
                                {!isIdValid && (
                                    <span style={{ color: "red" }}>
                                        5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
                                    </span>
                                )}
                            </div>
                            <div className="join_row">
                                <h3 className="join_title">
                                    <label htmlFor="password">비밀번호</label>
                                </h3>
                                <span className="ps_box">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="int"
                                        title="비밀번호"
                                        maxLength={20}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordBlur}
                                    />
                                </span>
                                {isPasswordRequired && (
                                    <span className="error_next_box" id="passwordMsg">
                                        필수 정보입니다.
                                    </span>
                                )}
                                {password.length > 0 && password.length < 8 && (
                                    <span className="error_next_box" id="passwordMsg">
                                        8자 이상 입력해주세요.
                                    </span>
                                )}
                            </div>
                            <div className="join_row">
                                <h3 className="join_title">
                                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                                </h3>
                                <span className="ps_box">
                                    <input
                                        type="password"
                                        id="passwordCheck"
                                        name="passwordCheck"
                                        className="int"
                                        title="비밀번호 확인"
                                        maxLength={20}
                                        value={passwordCheck}
                                        onChange={handlePasswordCheckChange}
                                        onBlur={handlePasswordCheckBlur}
                                    />
                                </span>
                                {isPasswordCheckRequired && (
                                    <span className="error_next_box" id="passwordCheckMsg">
                                        필수 정보입니다.
                                    </span>
                                )}
                                {passwordCheck !== password && (
                                    <span className="error_next_box" id="passwordCheckMsg">
                                        비밀번호가 일치하지 않습니다.
                                    </span>
                                )}
                            </div>

                            <div className="row_group">
                                <div className="join_row">
                                    <h3 className="join_title">
                                        <label htmlFor="name">이름</label>
                                    </h3>
                                    <span className="ps_box box_right_space">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            title="이름"
                                            className="int"
                                            maxLength="40"
                                            value={name}
                                            onBlur={handleNameBlur}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </span>
                                    <span
                                        className="error_next_box"
                                        id="nameMsg"
                                        aria-live="assertive"
                                        style={{ display: showNameMsg ? "block" : "none" }}
                                    >
                                        이름을 입력해주세요.
                                    </span>
                                </div>
                            </div>

                            <div className="join_birthday">
                                <h3 className="join_title"><label htmlFor="yy">생년월일</label></h3>
                                <div className="bir_yy">
                                    <span className="ps_box">
                                        <input type="text" id="yy" placeholder="년(4자)" aria-label="년(4자)" className="int" maxLength="4" onClick={handleYearClick} onBlur={handleBlur} />
                                    </span>
                                </div>
                                <div className="bir_mm">
                                    <span className="ps_box">
                                        <select id="mm" className="sel" aria-label="월" onClick={handleMonthClick}>
                                            <option value="" defaultValue>월</option>
                                            <option value="01">1</option>
                                            <option value="02">2</option>
                                            <option value="03">3</option>
                                            <option value="04">4</option>
                                            <option value="05">5</option>
                                            <option value="06">6</option>
                                            <option value="07">7</option>
                                            <option value="08">8</option>
                                            <option value="09">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </span>
                                </div>
                                <div className="bir_dd">
                                    <span className="ps_box">
                                        <input type="text" id="dd" placeholder="일" aria-label="일" className="int" maxLength="2" onClick={handleDayClick} onBlur={handleBlur} />
                                        <label htmlFor="dd" className="lbl"></label>
                                    </span>
                                </div>
                                <span className="error_next_box" id="birthdayMsg" style={{ display: message ? 'block' : 'none' }} aria-live="assertive">{message}</span>
                            </div>

                            <div className="join_row join_gender">
                                <h3 className="join_title">
                                    <label htmlFor="gender">성별</label>
                                </h3>
                                <div className="ps_box gender_code">
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="sel"
                                        aria-label="성별"
                                        onBlur={genderBlur}
                                    >
                                        <option value="" defaultValue>
                                            성별
                                        </option>
                                        <option value="M">남자</option>
                                        <option value="F">여자</option>
                                        <option value="U">선택 안함</option>
                                    </select>
                                </div>
                                {isRequired && (
                                    <span className="error_next_box" id="genderMsg">
                                        필수 정보입니다.
                                    </span>
                                )}
                            </div>
                            <div className="join_row join_occupation">
                                <h3 className="join_title">
                                    <label htmlFor="occupation">직업구분</label>
                                </h3>
                                <div className="ps_box occupation_code">
                                    <select
                                        id="occupation"
                                        name="occupation"
                                        className="sel"
                                        aria-label="직업구분"
                                        onBlur={occupationBlur}
                                    >
                                        <option value="" defaultValue>
                                            직업구분
                                        </option>
                                        <option value="1">개인사업자</option>
                                        <option value="2">법인사업자</option>
                                        <option value="3">공무원</option>
                                        <option value="4">회사원</option>
                                        <option value="5">기타</option>
                                    </select>
                                </div>
                                {isOccupation && (
                                    <span className="error_next_box" id="occupationMsg">
                                        필수 정보입니다.
                                    </span>
                                )}
                            </div>
                            <div className="join_row join_education">
                                <h3 className="join_title">
                                    <label htmlFor="ed_level">교육 수준</label>
                                </h3>
                                <div className="ps_box education_code">
                                    <select
                                        id="education"
                                        name="education"
                                        className="sel"
                                        aria-label="교육 수준"
                                        onBlur={educationBlur}
                                    >
                                        <option value="" defaultValue>
                                            교육 수준
                                        </option>
                                        <option value="1">중학교 졸업</option>
                                        <option value="2">고등학교 졸업</option>
                                        <option value="3">대학교 졸업</option>
                                        <option value="4">석박사 졸업</option>
                                    </select>
                                </div>
                                {isEducation && (
                                    <span className="error_next_box" id="education">
                                        필수 정보입니다.
                                    </span>
                                )}
                            </div>


                            <div>
                                <div className="join_row join_email">
                                    <h3 className="join_title">
                                        <label htmlFor="email">
                                            본인 확인 이메일
                                            <span className="terms_choice">(선택)</span>
                                        </label>
                                    </h3>
                                    <span className="ps_box int_email box_right_space">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="선택입력"
                                            aria-label="선택입력"
                                            className="int"
                                            maxLength="100"
                                            value={email}
                                            onChange={handleEmailChange}
                                            onBlur={handleEmailBlur}
                                        />
                                    </span>
                                </div>
                                <span className="error_next_box" id="emailMsg" aria-live="assertive">
                                    {emailErrorMsg}
                                </span>
                            </div>
                            <div>

                            </div>
                            <div className="join_row join_mobile" id="mobDiv">
                                <div className="join_row join_mobile">
                                    <h3 className="join_title">
                                        <label htmlFor="pphoneNo">휴대전화</label>
                                    </h3>
                                    <div className="int_mobile_area">
                                        <span className="ps_box int_mobile">
                                            <input type="tel" id="pphoneNo" name="pphoneNo" placeholder="전화번호 입력" aria-label="전화번호 입력" className="int" maxLength="16" />
                                        </span>
                                        <a href="#" className="btn_verify btn_primary" id="btnPrtsSend" role="button">
                                            <span>인증번호 받기</span>
                                        </a>
                                    </div>
                                    <div className="ps_box_disable box_right_space" id="pauthNoBox">
                                        <input type="tel" id="pauthNo" name="pauthNo" placeholder="인증번호 입력하세요" aria-label="인증번호 입력하세요" aria-describedby="pwa_verify" className="int" disabled maxLength="6" />
                                        <label id="pwa_verify" htmlFor="pauthNo" className="lbl">
                                            <span className="wa_blind">인증받은 후 인증번호를 입력해야 합니다.</span>
                                            <span className="input_code" id="pauthNoCode">일치 <CheckIcon /></span>
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div className="btn_area">
                                <button type="button" id="btnJoin" className="btn_type btn_primary"><span>가입하기</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinForm;