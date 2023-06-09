import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";
import { CardCompany } from "../pages/CardCompany";


export default function CreditCardCompany ( props ) {

  const deleteCreditCard = () => {
    props.deleteCreditCard();
  };

  // 입력된 데이터를 객체로 구성하여 handleCreditCardData 전달
  const handleCreditCardData = () => {
    const creditCardData = {
      customerNo: props.customerNo,
      cardCompany: props.cardCompany,
      transactionPeriod: props.transactionPeriod,
      limit: props.limit,
      overdueCount: props.overdueCount,
      overduePeriod: props.overduePeriod
    };
    props.handleCreditCardData(creditCardData);
  };



  return(
    <>
      <div className="join_row">
        <h3 className="join_title">
          <label htmlFor="cardCompany">카드 회사</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="cardCompany" name="cardCompany" className="sel"  onChange={(e) => props.setCardCompany(e.target.value)}>
            <option value="">카드 회사</option>
            <option value="FIRST">1금융</option>
            <option value="SECOND">2금융</option>
            <option value="THIRD">3금융</option>
          </select>
        </div>
      </div>
      <div className="join_row_flex">
        <h3 className="join_title">
          <label htmlFor="transactionPeriod">거래 기간</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="transactionPeriod" name="transactionPeriod" className="sel" onChange={(e) => props.setTransactionPeriod(e.target.value)}>
            <option value="" >거래 기간</option>
            <option value="0">1년 이하</option>
            <option value="1">1년 이상</option>
            <option value="3">3년 이상</option>
            <option value="6">6년 이상</option>
            <option value="9">9년 이상</option>
            <option value="15">15년 이상</option>
          </select>
        </div>
      </div>
      <div className="join_row_flex">
        <div className="join_row">
          <h3 className="join_title">
            <label htmlFor="limit">한도</label>
          </h3>
          <span className="ps_box box_right_space">
            <select id="limit" name="limit" className="sel" onChange={(e) => props.setLimit(e.target.value)} >
              <option value="" >한도</option>
              <option value="0">500만원</option>
              <option value="0">1000만원</option>
              <option value="3">3000만원</option>
              <option value="5">5000만원</option>
              <option value="7">7000만원</option>
            </select>
          </span>
        </div>
      </div>
      <div className="join_row_flex">
        <div className="join_row">
          <h3 className="join_title">
            <label htmlFor="overdueCount">연체 횟수</label>
          </h3>
          <span className="ps_box box_right_space">
            <select id="overdueCount" name="overdueCount" className="sel" onChange={(e) => props.setOverdueCount(e.target.value)} >
              <option value="" >연체 횟수</option>
              <option value="0">1회 미만</option>
              <option value="1">1회 </option>
              <option value="2">2회</option>
              <option value="3">3회</option>
              <option value="4">4회</option>
            </select>
          </span>
        </div>
      </div>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="overduePeriod">연체 기간</label>
          </h3>
        <div className="ps_box occupation_code">
          <select id="overduePeriod" name="overduePeriod" className="sel" onChange={(e) => props.setOverduePeriod(e.target.value)} >
            <option value="" >연체 기간</option>
            <option value="0">1개월 미만</option>
            <option value="3">3개월 이하</option>
            <option value="6">6개월 이하</option>
            <option value="9">9개월 이하</option>
            <option value="12">1년 이상</option>
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
