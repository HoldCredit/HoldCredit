import React, {useEffect, useState} from "react";
import "../styles/JoinForm.css";
import {Container, TextField, FormControl, FormControlLabel, RadioGroup, Radio, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import CreditCardCompany from "../components/CreditCardCompany";
import Debt from "../components/Debt";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../store/CustomerNameStore";
import { Classification }  from "./Classification";
import { CardCompany }  from "./CardCompany";

export default function CreditForm() {
  // 세션에 저장된 토큰값 가져오기
  const storedToken = sessionStorage.getItem("loginData");
  // 토큰값 해석
  const decodedToken = jwtDecode(storedToken);
  // 해석한 정보에서 회원번호만 추출
  const customerNo = decodedToken.sub;

  // 저장 함수 완료 시 이동
  const navigate = useNavigate();
  const handleSaveComplete = () => {
    alert("신용평가가 완료되었습니다.");
    navigate("/");
  };

  /* 개인금융 정보 */
  const [annulIncome, setAnnulIncome] = useState(""); //연봉
  const [continuousService, setContinuousService] = useState(""); //근속년수
  const [extraMonthlyFund, setExtraMonthlyFund] = useState(""); //매달여유자금

  /* 비금융 정보*/
  const [marital, setMarital] = useState("single"); //결혼
  const [childrenCnt, setChildrenCnt] = useState(""); //자녀수
  const [realestate, setRealestate] = useState("noHome"); //주택소유
  const [vehicle, setVehicle] = useState("noCar"); //자동차
  const [healthInsurance, setHealthInsurance] = useState("noHealth"); //건강보험
  const [phoneBillPayment, setPhoneBillPayment] = useState("noPhone"); //통신요금
  const [proofOfIncomeAmount, setProofOfIncomeAmount] = useState("noProof"); //소득금액
  const [nationalPension, setNationalPension] = useState("noNational"); //국민연금

  /* 신용카드 정보 */
  const [cardCompany, setCardCompany] = useState(null);
  const [transactionPeriod, setTransactionPeriod] = useState(null);
  const [limit, setLimit] = useState(null);
  const [overdueCount, setOverdueCount] = useState(null);
  const [overduePeriod, setOverduePeriod] = useState(null);

  // CreditCardCompany 컴포넌트에서 입력된 데이터를 받아 creditCards 배열에 추가
  const [creditCards, setCreditCards] = useState([]);
  const handleCreditCardData = (data) => {
    setCreditCards((prevCreditCards) => [...prevCreditCards, data]);
  };

  /* 대출/상환 정보 */
  const [loanAmount, setLoanAmount] = useState(null); //대출금액
  const [loanPeriod, setLoanPeriod] = useState(null); // 남은대출기간
  const [loanCount, setLoanCount] = useState(null); // 대출횟수

  // Debt 컴포넌트에서 입력된 데이터를 받아 creditCards 배열에 추가
  const [debts, setDebts] = useState([]);
  const handleDebtData = (data) => {
      setDebts((prevDebts) => [...prevDebts, data]);
  };


  {/* 추가/삭제 버튼 함수 */}
    // 카드 추가
    const addCreditCard = () => {
     const newCreditCard = {
        customerNo: "",
       cardCompany: "",
       transactionPeriod: "",
       limit: "",
       overdueCount: "",
       overduePeriod: ""
     };
      setCreditCards((prevCreditCards) => [...prevCreditCards, { ...newCreditCard }]);
    };

    // 카드 삭제
    const deleteCreditCard = (index) => {
        setCreditCards((prevCreditCards) =>
          prevCreditCards.filter((_, i) => i !== index)
        );
    };

    // 카드 배열 업데이트
    const updateCreditCardValue = (index, key, value) => {
        setCreditCards((prevCreditCards) => {
          const updateCards = [...prevCreditCards];
          updateCards[index][key] = value;
          return updateCards;
        });
    };

    // 대출 추가
    const addDebt = () => {
      const newDebt = {
        customerNo : "",
        loanAmount: "",
        setLoanAmount : "",
        loanPeriod: "",
        setLoanPeriod : "",
        loanCount: "",
        setLoanCount : ""
      };
      setDebts((prevDebts) => [...prevDebts, { ...newDebt }]);
    };

    // 대출 삭제
    const deleteDebt = (index) => {
        setDebts((prevDebts) =>
          prevDebts.filter((_, i) => i !== index)
        );
    };

    // 대출 배열 업데이트
    const updateDebtValue = (index, key, value) => {
        setDebts((prevDebts) => {
          const updateDebts = [...prevDebts];
          updateDebts[index][key] = value;
          return updateDebts;
        });
    };


  {/* 저장함수 시작 */}
  const handleSubmit = async() => {
    //Finance 개인금융
    const financeData = {
      customerNo: customerNo,
      annulIncome: parseInt(annulIncome),
      continuousService: parseInt(continuousService),
      extraMonthlyFund: parseInt(extraMonthlyFund)
    };

    //NonFinancial 비금융
    const nonFinanceData = {
        customerNo: customerNo,
        marital: marital === 'married' ? Classification.YES : Classification.NO,
        childrenCnt: parseInt(childrenCnt),
        realestate: realestate === 'yesHome' ? Classification.YES : Classification.NO,
        vehicle: vehicle === 'yesCar' ? Classification.YES : Classification.NO,
        healthInsurance: healthInsurance === 'yesHealth' ? Classification.YES : Classification.NO,
        phoneBillPayment: phoneBillPayment === 'yesPhone' ? Classification.YES : Classification.NO,
        proofOfIncomeAmount: proofOfIncomeAmount === 'yesProof' ? Classification.YES : Classification.NO,
        nationalPension: nationalPension === 'yesNational' ? Classification.YES : Classification.NO,
    };

    //CreditCard 신용카드
    // creditCards 배열을 creditData 배열로 변환
    const creditDataArray  = creditCards.map((creditCard) => {
        const cardCompany =
          creditCard.cardCompany === "FIRST" ? CardCompany.FIRST :
          creditCard.cardCompany === "SECOND" ? CardCompany.SECOND :
          creditCard.cardCompany === "THIRD" ? CardCompany.THIRD :
          null;

        return {
          customerNo: customerNo,
          cardCompany: cardCompany,
          transactionPeriod: parseInt(creditCard.transactionPeriod),
          limit: parseInt(creditCard.limit),
          overdueCount: parseInt(creditCard.overdueCount),
          overduePeriod: parseInt(creditCard.overduePeriod),
        };
    });

    //Debt 부채
    //debts 배열을 debtData 배열로 변환
    const debtDataArray = debts.map((debt) => {
        return {
          customerNo: customerNo,
          loanAmount: parseInt(debt.loanAmount),
          loanPeriod: parseInt(debt.loanPeriod),
          loanCount: parseInt(debt.loanCount),
        };
    });

     try {
           const financePromise = await axios.post("http://localhost:8090/finance/save", financeData);
           const nonFinancePromise = await axios.post("http://localhost:8090/nonFinancial/save", nonFinanceData);
           const creditPromise = creditDataArray.map((creditData) =>
             axios.post("http://localhost:8090/creditCard/save", creditData));
           const debtPromise = debtDataArray.map((debtData) =>
             axios.post("http://localhost:8090/debt/save", debtData))

           const financeResponse = await financePromise;
           const nonFinanceResponse = await nonFinancePromise;
           const creditResponse = await Promise.all(creditPromise);
           const debtResponse = await Promise.all(debtPromise);

           console.log("Finance:", financeResponse.data);
           console.log("NonFinancial:", nonFinanceResponse.data);
           creditResponse.forEach((creditResponse, index) => {
             console.log(`CreditCard ${index + 1}:`, creditResponse.data);
           });
           debtResponse.forEach((debtResponse, index) => {
             console.log(`Debt ${index + 1}:`, debtResponse.data);
           });
           handleSaveComplete(); // 저장 완료 후 이동
         } catch (error) {
           console.error("Error:", error);
         }
   };
  /* 저장 끝*/

  return (
    <div id="wrap">
    <div id="header" className="join_membership">
      <h1><a href="/LoginPage" className="h_logo">
      <span className="blind"> HOLD CREDIT </span>
      </a></h1>
    </div>
    <div id="container">
        <div id="content">
            <FormControl>
                <div className="join_content"><div className="row_group"><div className="join_row">
                    {/* 금융 */}
                    <hr className="join_hr"/>
                    <h3 className="join_row_flex">금융 정보 입력</h3>
                    <div className="row_group">
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="annulIncome">연봉</label>
                          </h3>
                          <span className="ps_box box_right_space">
                            <input type="text" id="annulIncome" name="annulIncome" className="int" maxLength="40"
                                    value={annulIncome} onChange={(e) => setAnnulIncome(e.target.value)} />
                          </span>
                       </div>
                       <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="continuousService">근속 연 수</label>
                          </h3>
                          <div className="ps_box occupation_code">
                          <select id="continuousService" name="continuousService" className="sel" aria-label="근속 연 수"
                                  onChange={(e) => setContinuousService(e.target.value)}>
                            <option value="" defaultValue> 근속 연 수</option>
                            <option value="1">1년 이하</option>
                            <option value="2">1년 이상</option>
                            <option value="3">3년 이상</option>
                            <option value="4">6년 이상</option>
                            <option value="5">9년 이상</option>
                            <option value="5">15년 이상</option>
                          </select></div>
                       </div>
                       <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraMonthlyFund">매달 여유 자금</label>
                          </h3>
                          <div className="ps_box occupation_code">
                          <select id="extraMonthlyFund" name="extraMonthlyFund" className="sel" aria-label="매달 여유 자금"
                                  onChange={(e) => setExtraMonthlyFund(e.target.value)}>
                            <option value="" defaultValue>매달 여유 자금</option>
                            <option value="1">30만원 이하</option>
                            <option value="2">30만원 이상</option>
                            <option value="3">60만원 이상</option>
                            <option value="4">100만원 이상</option>
                            <option value="5">200만원 이상</option>
                            <option value="5">300만원 이상</option>
                        </select></div>
                       </div>
                    </div>

                    {/* 비금융 */}
                    <hr className="join_hr"/>
                    <h3>비금융 정보 입력</h3>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 16}}>
                       <Grid item xs={12}>
                          <h3 className="join_title">
                            <label htmlFor="marital">결혼 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row'}}
                            value={marital} onChange={(e) => setMarital(e.target.value)}>
                            <FormControlLabel value="married" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="single" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={12}>
                          <h3 className="join_title">
                            <label htmlFor="childrenCnt">자녀 수</label>
                          </h3>
                          <span className="ps_box box_right_space">
                            <input type="text" id="childrenCnt" name="childrenCnt" className="int" maxLength="40"
                                    value={childrenCnt} onChange={(e) => setChildrenCnt(e.target.value)}/>
                          </span>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="realestate">주택 소유 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}
                            value={realestate} onChange={(e) => setRealestate(e.target.value)}>
                            <FormControlLabel value="yesHome" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noHome" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="vehicle">자동차 소유 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}
                            value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                            <FormControlLabel value="yesCar" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noCar" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="healthInsurance">건강보험 납부 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}
                            value={healthInsurance} onChange={(e) => setHealthInsurance(e.target.value)}>
                            <FormControlLabel value="yesHealth" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noHealth" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="phoneBillPayment">통신요금 납부 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}
                            value={phoneBillPayment} onChange={(e) => setPhoneBillPayment(e.target.value)}>
                            <FormControlLabel value="yesPhone" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noPhone" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="proofOfIncomeAmount">소득금액 증명 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}
                            value={proofOfIncomeAmount} onChange={(e) => setProofOfIncomeAmount(e.target.value)}>
                            <FormControlLabel value="yesProof" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noProof" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="nationalPension">국민연금 증명 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}
                            value={nationalPension} onChange={(e) => setNationalPension(e.target.value)}>
                            <FormControlLabel value="yesNational" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noNational" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                    </Grid>

                    {/* 신용카드 형태 정보 (추가 기능) */}
                    <hr className="join_hr"/>
                    <h3>신용카드 정보 입력</h3>
                    <div className="join_row_flex">
                       <Button variant="outlined" onClick={addCreditCard}> 신용카드 추가 </Button>
                       {creditCards.map((creditCard, i) => (
                          <div key={i}>
                            <CreditCardCompany
                            customerNo={creditCard.customerNo}
                            deleteCreditCard={() => deleteCreditCard(i)}
                            handleCreditCardData={handleCreditCardData}
                            setCardCompany={(value) => updateCreditCardValue(i, "cardCompany", value)}
                            setTransactionPeriod={(value) => updateCreditCardValue(i, "transactionPeriod", value)}
                            setLimit={(value) => updateCreditCardValue(i, "limit", value)}
                            setOverdueCount={(value) => updateCreditCardValue(i, "overdueCount", value)}
                            setOverduePeriod={(value) => updateCreditCardValue(i, "overduePeriod", value)}
                            />
                        </div>
                      ))}
                    </div>

                    {/* 부채 수준 (추가가능) / 대출 금액 / 남은 대출기간 / 대출 횟수*/}
                    {/* 부채 상환이력 (부채수준 추가한것 만큼 추가) / 대출 금액 / 연체 기간 */}
                    <hr className="join_hr"/>
                    <h3>대출 및 상환이력 정보 입력</h3>
                    <div className="join_row_flex">
                       <Button variant="outlined" onClick={addDebt}>대출 이력 추가</Button>
                       { debts.map((debt, i) => (
                          <div key={i}>
                            <Debt
                              customerNo={debt.customerNo}
                              deleteDebt={() => deleteDebt(i)}
                              handleDebtData={handleDebtData}
                              setLoanAmount={(value) => updateDebtValue(i, "loanAmount", value)}
                              setLoanPeriod={(value) => updateDebtValue(i, "loanPeriod", value)}
                              setLoanCount={(value) => updateDebtValue(i, "loanCount", value)}
                            />
                          </div>
                       ))}
                    </div>

                    <div className="btn_area">
                      <button type="button" onClick={handleSubmit} id="btnJoin" className="btn_type btn_primary"><span>제출</span></button>
                    </div>
                </div></div></div>
            </FormControl>
        </div>
    </div>
    </div>
  );
}