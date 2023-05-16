import React from "react";
import {Button} from "@mui/material";

export default function Debt ( props ) {

  const deleteDebt = () => {
    const deleteDebt = props.deleteDebt(props.i);
  };

  return(
    <>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="name">대출 금액</label>
          </h3>
          <span className="ps_box box_right_space">
                      <input type="text" id="name" name="name"
                             className="int" maxLength="40"/>
          </span>
      </div>

      <div className="join_row_flex">
        <h3 className="join_title">
          <label htmlFor="name">남은 대출 기간</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="continuousService" name="continuousService" className="sel">
            <option value="" defaultValue>남은 대출 기간</option>
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
            <label htmlFor="name">남은 대출 금액</label>
          </h3>
          <span className="ps_box box_right_space">
                      <input type="text" id="name" name="name"
                             className="int" maxLength="40"/>
          </span>
      </div>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="name">연체 기간</label>
          </h3>
        <div className="ps_box occupation_code">
          <select id="continuousService" name="continuousService" className="sel">
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
              <Button variant="outlined" onClick={() => deleteDebt()}>삭제</Button>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
