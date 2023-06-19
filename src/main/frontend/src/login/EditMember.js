import "../styles/EditMember.css";
import CheckIcon from '@mui/icons-material/Check';

//근주추가
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {setName} from "../store/CustomerNameStore";

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
    const[update, setUpdate] = useState({});
      // 세션에 저장된 토큰 값을 가져옵니다.
      const storedToken = sessionStorage.getItem("loginData");
      // 토큰이 존재할 경우 해독합니다.
      const decodedToken = storedToken ? jwtDecode(storedToken) : null;
      // 해독된 정보에서 고객 번호를 추출합니다.
      const customerNo = decodedToken ? decodedToken.sub : null;

    const navigate = useNavigate();
    const [memberInfo, setMemberInfo] = useState({});

    const dispatch = useDispatch();
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (customerNo) {
          axios.get(`/customerModify/${customerNo}`)
            .then((res) => {
              console.log(res.data);
              setMemberInfo(res.data);
            })
            .catch((error) => {
              console.log('회원수정 페이지 에러:' + error);
            });
        }
      }, [customerNo]);

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
    setMemberInfo({ ...memberInfo, password: e.target.value });
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

    const newPassword =password;

const updatePassword = async () => {
  try {
    const newPassword = password;

    // 서버로 요청을 보낼 때 JWT를 헤더에 포함시킴
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`, // JWT를 가져와서 헤더에 첨부
      },
    };

    // 서버로 비밀번호 수정 요청을 보냄
    await axios.put('/api/updatePassword', { newPassword }, config);

    // 비밀번호 수정이 성공적으로 이루어졌을 때의 처리
    console.log('비밀번호가 성공적으로 수정되었습니다.');
  } catch (error) {
    // 요청이 실패했을 때의 처리
    console.error('비밀번호 수정에 실패했습니다.', error);
  }
};

// 비밀번호 수정 버튼 클릭 시 updatePassword 함수 호출
const handleUpdatePassword = () => {
  updatePassword();
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

    // 휴대폰
      const [mobileNumber, setMobileNumber] = useState("");
      const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
      const [isMobileNumberRequired, setIsMobileNumberRequired] = useState(false);

      const handleMobileNumberBlur = (e) => {
        const mobileNumberValue = e.target.value;
        const pattern = /^\d{3}-\d{3,4}-\d{4}$/;

        if (mobileNumberValue.length === 0) {
          setIsMobileNumberValid(true);
          setIsMobileNumberRequired(true);
        } else if (!pattern.test(mobileNumberValue)) {
          setIsMobileNumberValid(false);
          setIsMobileNumberRequired(false);
        } else {
          setIsMobileNumberValid(true);
          setIsMobileNumberRequired(false);
        }
      };

      const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
        setIsMobileNumberRequired(false);
      };


    //아래는 작업중 비번만 바꿔볼까?
 // 수정
const updateCustomer = (event) => {
  // Send updated memberInfo to server

  event.preventDefault();
  const update = {
    password: memberInfo.password,
    occupation: memberInfo.job,
    education: memberInfo.education_level,
    phoneNo: memberInfo.phone_num,
    email: memberInfo.email
  };
    console.log(update);
  console.log("근주지금해봄 memberInfo 다 나와=> " + memberInfo);
    axios.put(`/customerModify/Modify/${customerNo}`, update)
    .then(res => {
        alert('정보가 수정되었습니다.');
        console.log(res);
        navigate(`/`);
  });
};

  // 회원 수정시 콘솔에 찍어봄
  const changeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setMemberInfo({...memberInfo, education_level: value});
  };

    return (
        <div id="wrap">
            <div id="header1" className="join_membership">
                <h1>
                   <a href="/" className="h_logo">
                   <span className="blind1">HOLD CREDIT</span>
                    </a>
                </h1>
            </div>
            <div id="container1">
                <div id="content1">
                    <h2 className="EditM">회원 정보 수정</h2>
                    <div className="join_content">
                        <div className="row_group1">
                            <div className="join_row">
                                <h3 className="join_title">
                                <label htmlFor="email">
                                    본인 이메일
                                    <span className="terms_choice"></span>
                                </label>
                            </h3>
                            <span className="edit_box int_email box_right_space">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="int"
                                    maxLength="100"
                                    disabled
                                    value={memberInfo.email}
//                                            onChange={handleEmailChange}
                                    onChange={(e) => setMemberInfo({ ...memberInfo, email: e.target.value})}
//                                            onBlur={handleEmailBlur}
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
                                        placeholder="변경하고자 하는 비밀번호를 입력해주세요."
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
                                {password.length > 0 && password.length < 4 && (
                                    <span className="error_next_box" id="passwordMsg">
                                        일단 4자 이상 입력해주세요. 귀차나 나중에 바꿀꺼임
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
                                        placeholder="변경하고자 하는 비밀번호를 입력해주세요."
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
                                             onChange={changeHandler}
                                           />
                                    </span>

                                </div>
                            </div>
                             <h3 className="join_title1">

                                        <label htmlFor="id">성별</label>
                                    </h3>
                                    <span className="edit_box int_id">
                                        <input
                                            type="text"
                                            id="gender"
                                            name="gender"
                                            className="edit1"
                                            title="gender"
                                            maxLength={20}
                                            disabled
                                            value = {
                                                memberInfo.gender == "MALE" ? "남자" :  "여자"
                                            }
//                                            value={memberInfo.gender}
                                        />
                                    </span>

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
                                          className={`int${isOccupation ? " required" : ""}`}
                                          value={memberInfo.job}
                                          aria-label="직업구분"
                                          onBlur={occupationBlur}
                                          // onChange={changeHandler}
                                          onChange={(e) => setMemberInfo({ ...memberInfo, job: e.target.value})}
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
                                <div className="edit_box education_code">
                                    <select
                                        id="education"
                                        name="education"
                                        aria-label="교육 수준"
                                        className={`int${isEducation ? " required" : ""}`}
                                        value={memberInfo.education_level}
                                        onBlur={educationBlur}
                                        onChange={changeHandler}
                                    >
                                        <option value="memberInfo.education_level" defaultValue>
                                            교육 수준
                                        </option>
                                        <option value="ELEMENTARY">초졸</option>
                                          <option value="MIDDLE">중졸</option>
                                          <option value="HIGH">고졸</option>
                                          <option value="UNIVERSITY">대졸</option>
                                          <option value="DOCTORATE">석박사</option>
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
                                      type="text"
                                      id="phoneNo"
                                      name="phoneNo"
                                      placeholder="전화번호 입력"
                                      aria-label="전화번호 입력"
                                      className="int"
                                      maxLength="11"
                                      value={memberInfo.phone_num}
                                      onChange={(e) => setMemberInfo({ ...memberInfo, phone_num: e.target.value})}
                                    />
                                  </span>
                           </div>
                            <div className="btn_area">
                                <button type="button" id="btnJoin" className="btn_type1 btn_primary1" onClick={updateCustomer}><span>수정</span></button>
                                <button type="button" className="btn_type2 btn_primary2" onClick={() => { window.location.href = '/DeleteMember'; }}>회원탈퇴</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default EditMember;