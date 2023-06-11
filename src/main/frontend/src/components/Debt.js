import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";

export default function Debt ( props ) {

  const deleteDebt = () => {
    const deleteDebt = props.deleteDebt(props.i);
  };

  // 입력된 데이터를 객체로 구성하여 handleDebtData 함수 전달
    const handleDebtData = () => {
      const debtData = {
        customerNo: props.customerNo,
        debtId: props.debtId,
        loanAmount: props.loanAmount,
        loanPeriod: props.loanPeriod,
        loanCount: props.loanCount,
        debtPeriod: props.debtPeriod,
        index: props.index,
      };
      props.handleDebtData(debtData);
    };




  return(
    <>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="loanAmount">대출 금액</label>
          </h3>
          <div className="ps_box occupation_code">
          <select id="loanAmount" name="loanAmount" className="sel" onChange={(e) => props.setLoanAmount(e.target.value)}>
            <option value="" > 대출 금액 </option>
            <option value="500">1000만원 이하</option>
            <option value="1000">5000만원 이하</option>
            <option value="2000">5000만원 이상</option>
          </select>
        </div>
      </div>
      <div className="join_row_flex">
        <h3 className="join_title">
          <label htmlFor="loanPeriod">남은 대출 기간</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="loanPeriod" name="loanPeriod" className="sel" onChange={(e) => props.setLoanPeriod(e.target.value)}>
            <option value="" > 남은 대출 기간 </option>
            <option value="0">1개월 미만 </option>
            <option value="3">3개월 이하</option>
            <option value="6">6개월 이하</option>
            <option value="12">1년 이하</option>
            <option value="18">2년 이하</option>
            <option value="20">2년 이상</option>
          </select>
        </div>
      </div>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="loanCount"> 대출 횟수</label>
          </h3>
          <div className="ps_box occupation_code">
             <select id="loanCount" name="loanCount" className="sel" onChange={(e) => props.setLoanCount(e.target.value)}>
                <option value="" > 대출 횟수 </option>
                <option value="1">1회</option>
                <option value="3">3회 이하</option>
                <option value="5">5회 이하</option>
                <option value="10">5회 이상</option>
             </select>
          </div>
      </div>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="debtPeriod"> 연체 기간</label>
          </h3>
          <div className="ps_box occupation_code">
             <select id="debtPeriod" name="debtPeriod" className="sel" onChange={(e) => props.setDebtPeriod(e.target.value)}>
                <option value="" > 연체 기간 </option>
                <option value="0">1개월 미만</option>
                <option value="3">3개월 이하</option>
                <option value="6">6개월 이하</option>
                <option value="12">1년 이하</option>
                <option value="18">2년 이하</option>
                <option value="20">2년 이상</option>
             </select>
          </div>
      </div>

      <div className="join_row_flex" style={{margin: "20px"}}>
         <div className="join_row">
           <div className="join_row_flex">
             <Button variant="outlined" onClick={deleteDebt}>삭제</Button>
           </div>
         </div>
      </div>
    </>
  )
}
