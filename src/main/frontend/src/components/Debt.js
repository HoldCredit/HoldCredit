import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";

export default function Debt ( props ) {

  const [loanAmount, setLoanAmount] = useState(""); //대출금액
  const [loanPeriod, setLoanPeriod] = useState(""); // 남은대출기간
  const [loanCount, setLoanCount] = useState(""); // 대출횟수

  const deleteDebt = () => {
    const deleteDebt = props.deleteDebt(props.i);
  };

  useEffect(() => {
    if(props.isSubmitClicked){
      const debtData = {
        loanAmount: parseInt(loanAmount),
        loanPeriod: parseInt(loanPeriod),
        loanCount: parseInt(loanCount),
      };
      props.handleDebtData(debtData);
    }
  }, [loanAmount, loanPeriod, loanCount,props.isSubmitClicked,props.handleCreditCardData]);


  return(
    <>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="loanAmount">대출 금액</label>
          </h3>
          <span className="ps_box box_right_space">
             <input type="text" id="loanAmount" name="loanAmount" className="int" maxLength="40"
                    value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}/>
          </span>
      </div>
      <div className="join_row_flex">
        <h3 className="join_title">
          <label htmlFor="loanPeriod">남은 대출 기간</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="loanPeriod" name="loanPeriod" className="sel" onChange={(e) => setLoanPeriod(e.target.value)}>
            <option value="" defaultValue> 남은 대출 기간 </option>
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
          <h3 className="join_title">
            <label htmlFor="loanCount"> 대출 횟수</label>
          </h3>
          <span className="ps_box box_right_space">
            <input type="text" id="loanCount" name="loanCount" className="int" maxLength="40"
               value={loanCount} onChange={(e) => setLoanCount(e.target.value)}/>
          </span>
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
