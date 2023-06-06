import React, {useEffect, useState} from "react";
import "../styles/JoinForm.css";
import {FormControl, FormControlLabel, RadioGroup, Radio, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import CreditCardCompany from "../components/CreditCardCompany";
import Debt from "../components/Debt";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../store/CustomerNameStore";
import { Classification } from './Classification';

export default function CreditForm() {
  // 세션에 저장된 토큰값 가져오기
  const storedToken = sessionStorage.getItem("loginData");
  // 토큰값 해석
  const decodedToken = jwtDecode(storedToken);
  // 해석한 정보에서 회원번호만 추출
  const customerNo = decodedToken.sub;
  const [memberInfo, setMemberInfo] = useState({});

  /* 개인금융 정보 */
  const [annulIncome, setAnnulIncome] = useState(""); //연봉
  const [continuousService, setContinuousService] = useState(""); //근속년수
  const [extraMonthlyFund, setExtraMonthlyFund] = useState(""); //매달여유자금

  /* 비금융 정보*/
  const [marital, setMarital] = useState(""); //결혼
  const [childrenCnt, setChildrenCnt] = useState(""); //자녀수
  const [realestate, setRealestate] = useState(""); //주택소유
  const [vehicle, setVehicle] = useState(""); //자동차
  const [healthInsurance, setHealthInsurance] = useState(""); //건강보험
  const [phoneBillPayment, setPhoneBillPayment] = useState(""); //통신요금
  const [proofOfIncomeAmount, setProofOfIncomeAmount] = useState(""); //소득금액
  const [nationalPension, setNationalPension] = useState(""); //국민연금

  /* 신용카드 정보 */
  const [creditCardData, setCreditCardData] = useState([]);

  const handleCreditCardData = (data) => {
    setCreditCardData([...creditCardData, data]);
  };

  /* 대출/상환 정보 */
  const [debtData, setDebtData] = useState([]);

  useEffect(() => {
      if (debtData.length > 0) {
        handleSubmit();
      }
    }, [debtData]);

  const handleDebtData = (data) => {
    setDebtData([...debtData, data]);
  };

  /* 저장 시작 */
  const handleSubmit = () => {
    //Finance 개인금융
    const financeData = {
      customerNo: customerNo,
      annulIncome: parseInt(annulIncome),
      continuousService: parseInt(continuousService),
      extraMonthlyFund: parseInt(extraMonthlyFund)
    };
    console.log(memberInfo)
    console.log(financeData)
    axios.post("http://localhost:8090/finance/save", financeData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

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
    console.log(memberInfo)
    console.log(nonFinanceData)
    axios.post("http://localhost:8090/nonFinancial/save", nonFinanceData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    };

    //CreditCard 신용카드
    creditCardData.forEach((data) => {
      const creditData = {
        customerNo: customerNo,
        creditCardCompany: data.creditCardCompany,
        transactionPeriod: data.transactionPeriod,
        limit: data.limit,
        overdueCount: data.overdueCount,
        overduePeriod: data.overduePeriod,
      };
      console.log(memberInfo)
      console.log(creditData)
      axios.post("http://localhost:8090/creditCard/save", creditData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    //Debt 대출및상환
    debtData.forEach((data) => {
      const debtItem = {
        customerNo: parseInt(customerNo),
        loanAmount: data.loanAmount,
        loanPeriod: data.loanPeriod,
        loanCount: data.loanCount,
      };
      console.log(memberInfo)
      console.log(debtItem)
      axios.post("http://localhost:8090/debt/save", debtItem)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  /* 저장 끝*/

    // 신용카드
    const [creditCards, setCreditCards] = useState([]);
    //추가
    const addCreditCard = () => {
      const newCreditCard = (
        <CreditCardCompany
          key={creditCards.length}
          i={creditCards.length}
          deleteCreditCard={deleteCreditCard}
          handleCreditCardData={handleCreditCardData} //데이터 업테이트
        />
      );
      setCreditCards((prevCards) => [...prevCards, newCreditCard]);
    };
    //삭제
    const deleteCreditCard = (index) => {
      setCreditCards((prevCards) =>
        prevCards.filter((card, i) => i !== index)
      );
      setCreditCardData((prevData) =>
        prevData.filter((data, i) => i !== index)
      );
    };



    // 대출
    const [debts, setDebts] = useState([]);
    //추가
    const addDebt = () => {
    setDebts((prevDebts) => [...prevDebts,
       <Debt
        key={prevDebts.length}
        i={prevDebts.length}
        deleteDebt={deleteDebt}
        debtData={debtData}
        handleDebtData={handleDebtData} //데이터 업테이트
       />,
    ]);
    }
    //삭제
    const deleteDebt = (i) => {
    setDebts((prevCards) => {
    const updatedCards = [...prevCards];
    updatedCards.splice(i - 1, 1);
    return updatedCards;
    });
    }



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
                            <label htmlFor="extraFund">매달 여유 자금</label>
                          </h3>
                          <div className="ps_box occupation_code">
                          <select id="extraFund" name="extraFund" className="sel" aria-label="매달 여유 자금"
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
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="single"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
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
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="noHome"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="yesHome" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noHome" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="vehicle">자동차 소유 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="noCar"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="yesCar" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noCar" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="healthInsurance">건강보험 납부 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="noHealth"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="yesHealth" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noHealth" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="phoneBillPayment">통신요금 납부 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="noPhone"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="yesPhone" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noPhone" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="proofOfIncomeAmount">소득금액 증명 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="noProof"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="yesProof" control={<Radio/>} label="YES"/>
                            <FormControlLabel value="noProof" control={<Radio/>} label="NO"/>
                          </RadioGroup>
                       </Grid>
                       <Grid item xs={6}>
                          <h3 className="join_title">
                            <label htmlFor="nationalPension">국민연금 증명 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="noNational"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
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
                       { creditCards.map((creditCard, i) => (
                          <div key={i}>
                             {creditCard}
                          </div> ))
                       }
                    </div>

                    {/* 부채 수준 (추가가능) / 대출 금액 / 남은 대출기간 / 대출 횟수*/}
                    {/* 부채 상환이력 (부채수준 추가한것 만큼 추가) / 대출 금액 / 연체 기간 */}
                    <hr className="join_hr"/>
                    <h3>대출 및 상환이력 정보 입력</h3>
                    <div className="join_row_flex">
                       <Button variant="outlined" onClick={addDebt}>대출 이력 추가</Button>
                       { debts.map((debt, i) => (
                          <div key={i}>
                            {debt}
                          </div> ))
                       }
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