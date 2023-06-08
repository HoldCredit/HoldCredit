import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";

export default function CreditCardCompany ( props ) {
  const [cardCompany, setCardCompany] = useState("");
  const [transactionPeriod, setTransactionPeriod] = useState("");
  const [limit, setLimit] = useState("");
  const [overdueCount, setOverdueCount] = useState("");
  const [overduePeriod, setOverduePeriod] = useState("");


  const deleteCreditCard = () => {
    props.deleteCreditCard();
  };


  useEffect(() => {
    if (props.isSubmitClicked) {
      const creditCard = {
        cardCompany: cardCompany,
        transactionPeriod: transactionPeriod,
        limit: limit,
        overdueCount: overdueCount,
        overduePeriod: overduePeriod,
      };
      props.handleCreditCardData(creditCard);
    }
  }, [cardCompany, transactionPeriod, limit, overdueCount, overduePeriod, props.isSubmitClicked, props.handleCreditCardData]);


  return(
    <>
      <div className="join_row">
        <h3 className="join_title">
          <label htmlFor="cardCompany">카드 회사</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="cardCompany" name="cardCompany" className="sel"  onChange={(e) => setCardCompany(e.target.value)}>
            <option value="" defaultValue>카드 회사</option>
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
