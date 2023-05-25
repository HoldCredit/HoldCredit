import "../styles/EditMember.css";
import CheckIcon from '@mui/icons-material/Check';

//근주추가
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";


function EditMember() {
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

    const navigate = useNavigate();
        const [memberInfo, setMemberInfo] = useState({});

    useEffect(() => {
     axios.get(`/customerModify/${21}`)
     .then((res) => {
        console.log(res.data);
        setMemberInfo(res.data);
     })
     .catch((error) => {
        console.log('회원수정 페이지 에러:' + error);
     });
    }, []);


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
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    //아래는 작업중 비번만 바꿔볼까?
                                 const updateCustomer = (event) => {
                                                 event.preventDefault();

                                                 const update = {
                                                     password: memberInfo.password
                                                 };

                                                 console.log("customer 수정하는부분이야 => " + JSON.stringify(memberInfo));
                                                   axios.put(`/customerModify/Modify/21`, update, {
                                                    headers:{
                                                        'Content-type': 'application/json'
                                                    }
                                                  })
                                                   .then(res => {
                                                   alert('수정되었습니다.');
                                                           navigate(`/customerModify/21`); // 수정

                                                 });
                                               };



    return (
        <div id="wrap">
            <div id="header1" className="join_membership">
                <h1>
                    <span className="h_logo">
                        <span className="blind">HOLD CREDIT</span>
                    </span>
                </h1>
            </div>
            <div id="container1">
                <div id="content1">
                    <h2 className="EditM">회원 정보 수정</h2>
                    <div className="join_content">
                        <div className="row_group1">
                            <div className="join_row">
                                <h3 className="join_title1">
                                    <label htmlFor="id">아이디</label>
                                </h3>
                                <span className="edit_box int_id">
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        className="edit1"
                                        title="ID"
                                        maxLength={20}
                                        disabled
                                        value={memberInfo.customer_id}
                                    />
                                </span>

                            </div>
                            <div className="join_row">
                                <h3 className="join_title1">
                                    <label htmlFor="password">비밀번호</label>
                                </h3>
                                <span className="edit_box">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="edit"
                                        title="비밀번호"
                                        maxLength={20}
                                        value={password}
                                        //여기를 바꿔야할듯?
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
                                <span className="edit_box">
                                    <input
                                        type="password"
                                        id="passwordCheck"
                                        name="passwordCheck"
                                        className="edit"
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
                                    <span className="edit_box box_right_space">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            title="이름"
                                            className="int"
                                            maxLength="40"
                                            value={memberInfo.customer_name}
                                            disabled
                                        />
                                    </span>

                                </div>
                            </div>

          <div className="join_birthday">
                                <h3 className="join_title"><label htmlFor="yy">생년월일</label></h3>
     <div className="birthday">
                                    <span className="edit_box">
                                        <input
                                            type="text"
                                            id="birthday"
                                            className="int"
                                            maxLength="8"
                                            disabled
                                            value={memberInfo.birth}
                                        />
                                    </span>
                                </div>
                                </div>
                                
                            </div>
                            <div className="join_row join_occupation">
                                <h3 className="join_title">
                                    <label htmlFor="occupation">직업구분</label>
                                </h3>
                                <div className="edit_box occupation_code">
                                    <select
                                        id="occupation"
                                        name="occupation"
                                        className="sel1"
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
                                <div className="edit_box education_code">
                                    <select
                                        id="education"
                                        name="education"
                                        className="sel1"
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
                                    <span className="edit_box int_email box_right_space">
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
                            <div className="join_row join_mobile1" id="mobDiv">
                                <div className="join_row join_mobile">
                                    <h3 className="join_title">
                                        <label htmlFor="pphoneNo">휴대전화</label>
                                    </h3>
                                    <div className="int_mobile_area1">
                                        <span className="edit_box int_mobile1">
                                            <input type="tel" id="pphoneNo" name="pphoneNo" placeholder="전화번호 입력" aria-label="전화번호 입력" className="int" maxLength="16" />
                                        </span>
                                        <a href="#" className="btn_verify1 btn_primary1" id="btnPrtsSend" role="button">
                                            <span>인증번호 받기</span>
                                        </a>
                                    </div>
                                    <div className="edit_box_disable box_right_space" id="pauthNoBox">
                                        <input type="tel" id="pauthNo" name="pauthNo" placeholder="인증번호 입력하세요" aria-label="인증번호 입력하세요" aria-describedby="pwa_verify" className="int" disabled maxLength="6" />
                                        <label id="pwa_verify" htmlFor="pauthNo" className="lbl">
                                            <span className="wa_blind">인증받은 후 인증번호를 입력해야 합니다.</span>
                                            <span className="input_code" id="pauthNoCode">일치 <CheckIcon /></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            

//알단 수정하기 누르면 서비스페이지로 가게끔 한다음에 어디로 보내지고 싶은지 생각하기~
                            <div className="btn_area">
                                <button type="button" id="btnJoin" className="btn_type1 btn_primary1"><span>수정</span></button>
                                <button type="button" id="btnJoin" className="btn_type2 btn_primary2"><span>삭제</span></button>
                            </div>


                        <div class="btn_wrap">
                            <a onClick={updateCustomer} class="btn_insert">완료</a>
                            <a href="/MainNotice" class="btn_update">취소</a>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
    );
}

export default EditMember;