import React, {useEffect, useState} from "react";
import "../styles/JoinForm.css";
import {FormControl, FormControlLabel, RadioGroup, Radio, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import CreditCardCompany from "../components/CreditCardCompany";

export default function CreditForm() {
  // 연봉
  const [income, setIncome] = useState("");
  const [isCredit, setIsCredit] = useState(false);
  const [addCredit, setAddCredit] = useState('신용카드 추가');

  // 신용카드 추가 미구현임
  const [creditCards, setCreditCards] = useState([]);
  const addCreditCard = () => {
    const copyCard = creditCards;
    setCreditCards([...copyCard, <CreditCardCompany/>]);
    setIsCredit(!isCredit);
    if(isCredit) setAddCredit('신용카드 추가');
    else setAddCredit('취소');
  };

  // 대출 추가 미구현임
  const [debt, setDebts] = useState([]);
  const addDebt = () => {
    const copydebt = debt;

    setDebts([...copydebt, /*<Debt/>*/]);
  }


  return (
    <>
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
            <FormControl>
              <div className="join_content">
                <div className="row_group">
                  <div className="join_row">

                    {/* 금융 */}
                    <hr className="join_hr"/>
                    <h3 className="join_row_flex">금융 정보 입력</h3>
                    <div className="row_group">
                      <div className="join_row">
                        <h3 className="join_title">
                          <label htmlFor="name">연봉</label>
                        </h3>
                        <span className="ps_box box_right_space">
                      <input type="text" id="name" name="name"
                             className="int" maxLength="40" value={income}
                             onChange={(e) => setIncome(e.target.value)}/> </span>
                      </div>
                    </div>

                    <div className="join_row">
                      <h3 className="join_title">
                        <label htmlFor="continuousService">근속 연 수</label>
                      </h3>
                      <div className="ps_box occupation_code">
                        <select id="continuousService" name="continuousService" className="sel" aria-label="근속 연 수">
                          <option value="" defaultValue> 근속 연 수</option>
                          <option value="1">1년 이하</option>
                          <option value="2">1년 이상</option>
                          <option value="3">3년 이상</option>
                          <option value="4">6년 이상</option>
                          <option value="5">9년 이상</option>
                          <option value="5">15년 이상</option>
                        </select>
                      </div>
                    </div>

                    <div className="join_row">
                      <h3 className="join_title">
                        <label htmlFor="extraFund">매달 여유 자금</label>
                      </h3>
                      <div className="ps_box occupation_code">
                        <select id="extraFund" name="extraFund" className="sel" aria-label="매달 여유 자금">
                          <option value="" defaultValue>매달 여유 자금</option>
                          <option value="1">30만원 이하</option>
                          <option value="2">30만원 이상</option>
                          <option value="3">60만원 이상</option>
                          <option value="4">100만원 이상</option>
                          <option value="5">200만원 이상</option>
                          <option value="5">300만원 이상</option>
                        </select>
                      </div>
                    </div>

                    {/* 비금융 */}
                    <hr className="join_hr"/>
                    <h3>비금융 정보 입력</h3>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 16}}>
                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">결혼 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">자녀 수</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">주택 소유 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">자동차 소유 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">건강보험 납부 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">통신요금 납부 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">소득금액 증명 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <div className="join_row">
                          <h3 className="join_title">
                            <label htmlFor="extraFund">국민연금 증명 여부</label>
                          </h3>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label" defaultValue="notMarried"
                            name="radio-buttons-group" sx={{display: 'flex', flexDirection: 'row',}}>
                            <FormControlLabel value="isMarried" control={<Radio/>} label="기혼"/>
                            <FormControlLabel value="notMarried" control={<Radio/>} label="미혼"/>
                          </RadioGroup>
                        </div>
                      </Grid>
                    </Grid>

                    {/* 신용카드 형태 정보 (추가 기능 미구현) */}
                    <hr className="join_hr"/>
                    <h3>신용카드 정보 입력</h3>
                    <div className="join_row_flex">
                      <Button variant="outlined" onClick={addCreditCard}>{addCredit}</Button>
                    </div>
                    {isCredit && <CreditCardCompany/>}


                    {/*
              - 사용하는 신용카드 회사
              - 거래기간
              - 한도
              - 연체 횟수
              - 연체 기간 */}
                    <hr className="join_hr"/>
                    <h3>대출 및 상환이력 정보 입력</h3>
                    <div className="join_row_flex">
                      <Button variant="outlined" onCilck={() => {
                        addDebt()
                      }}>대출 이력 추가</Button>
                    </div>

                    {/* 부채 수준 (추가가능)
              - 대출 금액
              - 남은 대출기간
              - 대출 횟수*/}
                    {/* 부채 상환이력 (부채수준 추가한것 만큼 추가)
              - 대출 금액
              - 남은 대출 기간
              - 대출 횟수*/}

                  </div>
                </div>
              </div>
            </FormControl>
          </div>
        </div>
      </div>

    </>
  )
    ;
}