import React, { useState, useEffect} from "react";
import "../styles/JoinForm.css";
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function JoinForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [isEmailAvailable, setIsEmailAvailable] = useState(true);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleEmailBlur = () => {
        if (email.trim() !== '' && !isValidEmail(email)) {
            alert("이메일 형식이 맞지 않습니다. 다시 입력해 주세요.");
        }
    };

    const handleCheckEmailAvailability = () => {
        if (!isValidEmail(email)) {
            alert("이메일 형식이 맞지 않습니다. 다시 입력해 주세요.");
            return;
        }
        checkEmailAvailability(email);
    };

    const validateEmail = (email) => {
        if (!isValidEmail(email)) {
            setIsEmailAvailable(false);
        } else {
            setEmailErrorMsg("");
            setIsEmailAvailable(true);
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const checkEmailAvailability = async (email) => {
      try {
        const response = await fetch('/auth/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('이메일 중복 확인에 실패했습니다.');
        }

        const data = await response.json();

        if (data.available) {
          setIsEmailAvailable(true);
          alert('사용 가능한 이메일입니다.');
        } else {
          setIsEmailAvailable(false);
          alert('중복된 이메일입니다. 다른 이메일을 입력해 주세요.');
        }
      } catch (error) {
        console.error(error);
        alert('이메일 중복 확인 중 오류가 발생했습니다.'); // 에러 알림을 추가하거나 적절한 처리를 해주세요.
      }
    };




    // 비밀번호
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);

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
    const [passwordCheck, setPasswordCheck] = useState("");
    const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
    const [isPasswordCheckRequired, setIsPasswordCheckRequired] = useState(false);

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

    const handlePasswordCheckChange = (e) => {
        const passwordCheckValue = e.target.value;
        setPasswordCheck(passwordCheckValue);
        if (passwordCheckValue.length === 0) {
            setIsPasswordCheckValid(false);
            setIsPasswordCheckRequired(true);
        } else if (passwordCheckValue !== passwordCheck) {
            setIsPasswordCheckValid(false);
            setIsPasswordCheckRequired(false);
        } else {
            setIsPasswordCheckValid(true);
            setIsPasswordCheckRequired(false);
        }
    };

    // 이름
    const [name, setName] = useState("");
    const [isNameEmpty, setIsNameEmpty] = useState(false);

    const handleNameChange = (e) => {
    const enteredName = e.target.value;
    setName(enteredName);
    };

    const handleNameBlur = () => {
        if (name.trim() === "") {
            setIsNameEmpty(true);
        } else {
        // 이름 값이 비어 있지 않으면 서버로 전송 또는 다른 작업 수행
        setIsNameEmpty(false);
        // 추가적인 로직 수행
        }
    };

        // 생년 월 일
        const [birth, setBirth] = useState('');
        const [year, setYear] = useState("");
        const [month, setMonth] = useState("");
        const [day, setDay] = useState("");

        const handleYearChange = (e) => {
            setYear(e.target.value);
        };

        const handleMonthChange = (e) => {
            setMonth(e.target.value);
        };

        const handleDayChange = (e) => {
            setDay(e.target.value);
        };

        useEffect(() => {
                if (year !== '' && month !== '' && day !== '') {
                    const birth = `${year}-${month}-${day}`;
                    setBirth(birth);
                } else {
                    setBirth('');
                }
            }, [year, month, day]);


    // 성별
    const [isRequired, setIsRequired] = useState(false);
    const [gender, setGender] = useState('');

    function genderBlur() {
        setIsRequired(document.querySelector("#gender").value === "");
    }

    // 성별 선택에 대한 이벤트 리스너 등록
    useEffect(() => {
    const genderSelect = document.querySelector("#gender");
    genderSelect.addEventListener("change", handleGenderChange);

    return () => {
        genderSelect.removeEventListener("change", handleGenderChange);
    };
    }, []);

    const handleGenderChange = (e) => {
    const selectedGender = e.target.value;

    setGender(selectedGender);
    };

    // 직업구분
    const [isOccupation, setIsOccupation] = useState(false);
    const [occupation, setOccupation] = useState('');

    function occupationBlur() {
        setIsOccupation(document.querySelector("#occupation").value === "");
    }

    // 직업 선택에 대한 이벤트 리스너 등록
    useEffect(() => {
    const occupationSelect = document.querySelector("#occupation");
    occupationSelect.addEventListener("change", handleOccupationChange);

    return () => {
        occupationSelect.removeEventListener("change", handleOccupationChange);
    };
    }, []);

    const handleOccupationChange = (e) => {
    const selectedOccupation = e.target.value;

    // 유효성 검사: "ENTREPRENEUR", "PUBLICOFFICIAL", "WORKER", "ETC" 중 하나만 허용
    if (
       selectedOccupation === "ENTREPRENEUR" ||
       selectedOccupation === "PUBLICOFFICIAL" ||
       selectedOccupation === "WORKER" ||
       selectedOccupation === "ETC"
     ) {
       setOccupation(selectedOccupation);
     }
   };

  // 교육 수준
  const [isEducation, setIsEducation] = useState(false);
  const [education, setEducation] = useState('');

  function educationBlur() {
    setIsEducation(document.querySelector("#education").value === "");
  }

  // 교육 수준 선택에 대한 이벤트 리스너 등록
  useEffect(() => {
    const educationSelect = document.querySelector("#education");
    educationSelect.addEventListener("change", handleEducationChange);

    return () => {
      educationSelect.removeEventListener("change", handleEducationChange);
    };
  }, []);

  const handleEducationChange = (e) => {
    const selectedEducation = e.target.value;

    // 유효성 검사: "ELEMENTARY", "MIDDLE", "HIGH", "UNIVERSITY", "DOCTORATE" 중 하나만 허용
    if (
      selectedEducation === "ELEMENTARY" ||
      selectedEducation === "MIDDLE" ||
      selectedEducation === "HIGH" ||
      selectedEducation === "UNIVERSITY" ||
      selectedEducation === "DOCTORATE"
    ) {
      setEducation(selectedEducation);
    }
  };
  //휴대전화
  const [phoneNo, setPhone] = useState('');

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };


    // 회원가입 버튼 클릭 이벤트
    const handleJoinClick = () => {
        if (!isValidEmail(email)) {
            alert("이메일 형식이 맞지 않습니다. 다시 입력해 주세요.");
            return;
          }
          if (!isEmailAvailable) {
            alert("중복된 이메일로 회원가입을 할 수 없습니다.");
            return;
          }
        // 이 부분에 회원가입 요청을 보내는 로직을 작성합니다.
        axios.post('http://localhost:8080/auth/signup', {
            email: email,
            password: password,
            customer_name: name,
            birth: birth,
            gender: gender,
            occupation: occupation,
            education: education,
            phoneNo: phoneNo
        })
            .then((response) => {
               alert('회원가입이 완료되었습니다.');
                navigate("/LoginPage");
            })
            .catch((error) => {
                // 회원가입 요청이 실패한 경우, 에러 메시지를 출력합니다.
                console.error("회원가입 요청 실패:", error);
            });
    };


    return (
        <div id="wrap">
            <div id="header" className="join_membership">
                <h1>
                    <a href="/LoginPage" className="h_logo">
                        <span className="blind1">HOLD CREDIT</span>
                    </a>
                </h1>
            </div>
            <div id="container">
                <div id="content">
                    <div className="join_content">
                        <div className="row_group">
                            <div>
                               <div className="join_row join_email">
                                 <h3 className="join_title">
                                   <label htmlFor="email">
                                     이메일
                                     <span className="terms_choice">(필수)</span>
                                   </label>
                                 </h3>
                                 <span className="ps_box1 int_email box_right_space1">
                                   <input
                                     type="email"
                                     id="email"
                                     name="email"
                                     placeholder="이메일을 입력해주세요"
                                     className="int"
                                     maxLength="100"
                                     value={email}
                                     onChange={handleEmailChange}
                                     onBlur={handleEmailBlur}
                                   />
                                 </span>
                                <button type="button" className="emailBtn" onClick={handleCheckEmailAvailability}>중복 확인</button>

                               </div>
                               <span className="error_next_box" id="emailMsg" aria-live="assertive">
                                 {!isEmailAvailable}
                               </span>
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
                                    <span className="ps_box box_right_space1">
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
                                        style={{ display: isNameEmpty ? "block" : "none" }}
                                    >
                                        이름을 입력해주세요.
                                    </span>
                                </div>
                            </div>

                            <div className="join_birthday">
                                <h3 className="join_title"><label htmlFor="yy">생년월일</label></h3>
                                <div className="bir_yy">
                                    <span className="ps_box">
                                        <input
                                            type="text"
                                            id="yy"
                                            placeholder="년(4자)"
                                            className="int"
                                            maxLength="4"
                                            value={year}
                                            onChange={handleYearChange}
                                        />
                                    </span>
                                </div>
                                <div className="bir_mm">
                                    <span className="ps_box">
                                        <select
                                            id="mm"
                                            className="sel"
                                            aria-label="월"
                                            value={month}
                                            onChange={handleMonthChange}
                                        >
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
                                        <input
                                            type="text"
                                            id="dd"
                                            placeholder="일"
                                            aria-label="일"
                                            className="int"
                                            maxLength="2"
                                            value={day}
                                            onChange={handleDayChange}
                                        />
                                    </span>
                                </div>
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
                                        <option value="MALE">남자</option>
                                        <option value="FEMALE">여자</option>
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
                                        <option value="ENTREPRENEUR">개인사업자</option>
                                        <option value="PUBLICOFFICIAL">공무원</option>
                                        <option value="WORKER">회사원</option>
                                        <option value="ETC">기타</option>
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
                                        <option value="ELEMENTARY">초등학교 졸업</option>
                                        <option value="MIDDLE">중학교 졸업</option>
                                        <option value="HIGH">고등학교 졸업</option>
                                        <option value="UNIVERSITY">대학교 졸업</option>
                                        <option value="DOCTORATE">석박사 졸업</option>
                                    </select>
                                </div>
                                {isEducation && (
                                    <span className="error_next_box" id="education">
                                        필수 정보입니다.
                                    </span>
                                )}
                            </div>
                               <div className="join_row join_phone">
                                 <h3 className="join_title">
                                   <label htmlFor="phoneNo">전화번호</label>
                                 </h3>
                                   <span className="ps_box join_phone">
                                     <input
                                       type="tel"
                                       id="phoneNo"
                                       name="phoneNo"
                                       placeholder="전화번호 입력"
                                       aria-label="전화번호 입력"
                                       className="int"
                                       maxLength="16"
                                       value={phoneNo}
                                       onChange={handlePhoneChange}
                                     />
                                   </span>
                                 </div>
                            <div className="btn_area">
                                <button type="button" id="btnJoin" className="btn_type btn_primary" onClick={handleJoinClick}><span>가입하기</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinForm;