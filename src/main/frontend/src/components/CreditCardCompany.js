import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";

export default function CreditCardCompany ( props ) {

  const [creditCardCompany, setCreditCardCompany] = useState("");
  const [transactionPeriod, setTransactionPeriod] = useState(""); // 거래기간
  const [limit, setLimit] = useState(""); // 한도
  const [overdueCount, setOverdueCount] = useState(""); // 연체횟수
  const [overduePeriod, setOverduePeriod] = useState(""); // 연체기간

  const deleteCreditCard = () => {
    props.deleteCreditCard(props.i);
  };

  useEffect(() => {
      const creditCardData = {
        creditCardCompany,
        transactionPeriod: parseInt(transactionPeriod),
        limit: parseInt(limit),
        overdueCount: parseInt(overdueCount),
        overduePeriod: parseInt(overduePeriod),
      };
      props.handleCreditCardData(creditCardData);
  }, [creditCardCompany, transactionPeriod, limit, overdueCount, overduePeriod]);


  return(
    <>
      <div className="join_row">
        <h3 className="join_title">
          <label htmlFor="creditCardCompany">카드 회사</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="creditCardCompany" name="creditCardCompany" className="sel" value={creditCardCompany} onChange={(e) => setCreditCardCompany(e.target.value)}>
            <option value="" defaultValue>카드 회사</option>
            <option value="shinhan">신한</option>
            <option value="hyundai">현대</option>
            <option value="samsung">삼성</option>
            <option value="lotte">롯데</option>
            <option value="toss">토스</option>
            <option value="hana">하나</option>
            <option value="woori">우리</option>
            <option value="kb">KB국민</option>
            <option value="bc">BC</option>
            <option value="nh">농협</option>
            <option value="suhyup">수협</option>
            <option value="city">씨티</option>
            <option value="gwangju">광주</option>
            <option value="junbuk">전북</option>
            <option value="jeju">제주</option>
            <option value="sinhyup">신협</option>
            <option value="post">우체국</option>
            <option value="mg">MG새마을</option>
            <option value="kakao">카카오</option>
          </select>
        </div>
      </div>
      <div className="join_row_flex">
        <h3 className="join_title">
          <label htmlFor="transactionPeriod">거래 기간</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="transactionPeriod" name="transactionPeriod" className="sel" onChange={(e) => setTransactionPeriod(e.target.value)}>
            <option value="" defaultValue>거래 기간</option>
            <option value="1">1년 이하</option>
            <option value="2">1년 이상</option>
            <option value="3">3년 이상</option>
            <option value="4">6년 이상</option>
            <option value="5">9년 이상</option>
            <option value="6">15년 이상</option>
          </select>
        </div>
      </div>
      <div className="join_row_flex">
        <div className="join_row">
          <h3 className="join_title">
            <label htmlFor="limit">한도</label>
          </h3>
          <span className="ps_box box_right_space">
            <input type="text" id="limit" name="limit" className="int" maxLength="40"
                   value={limit} onChange={(e) => setLimit(e.target.value)}/>
          </span>
        </div>
      </div>
      <div className="join_row_flex">
        <div className="join_row">
          <h3 className="join_title">
            <label htmlFor="overdueCount">연체 횟수</label>
          </h3>
          <span className="ps_box box_right_space">
            <input type="text" id="overdueCount" name="overdueCount" className="int" maxLength="40"
                    value={overdueCount} onChange={(e) => setOverdueCount(e.target.value)}/>
          </span>
        </div>
      </div>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="overduePeriod">연체 기간</label>
          </h3>
        <div className="ps_box occupation_code">
          <select id="overduePeriod" name="overduePeriod" className="sel" onChange={(e) => setOverduePeriod(e.target.value)} >
            <option value="" defaultValue>연체 기간</option>
            <option value="1">1주일 이하</option>
            <option value="2">1주일 이상</option>
            <option value="3">1개월 이상</option>
            <option value="4">3개월 이상</option>
            <option value="5">6개월 이상</option>
            <option value="6">1년 이상</option>
          </select>
        </div>

        <div className="join_row_flex" style={{margin: "20px"}}>
          <div className="join_row">
            <div className="join_row_flex">
              <Button variant="outlined" onClick={deleteCreditCard}>삭제</Button>
            </div>

          </div>
        </div>
      </div>
   </>
  );
}
