import React from "react";

export default function CreditCardCompany () {
  return(
    <>
      <div className="join_row">
        <h3 className="join_title">
          <label htmlFor="name">카드 회사</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="continuousService" name="continuousService" className="sel">
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
          <label htmlFor="name">거래 기간</label>
        </h3>
        <div className="ps_box occupation_code">
          <select id="continuousService" name="continuousService" className="sel">
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
            <label htmlFor="name">한도</label>
          </h3>
          <span className="ps_box box_right_space">
                      <input type="text" id="name" name="name"
                             className="int" maxLength="40"/>
          </span>
        </div>
      </div>
      <div className="join_row_flex">
        <div className="join_row">
          <h3 className="join_title">
            <label htmlFor="name">연체 횟수</label>
          </h3>
          <span className="ps_box box_right_space">
                      <input type="text" id="name" name="name"
                             className="int" maxLength="40"/>
          </span>
        </div>
      </div>
      <div className="join_row_flex">
          <h3 className="join_title">
            <label htmlFor="name">연체 횟수</label>
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

      </div>
    </>
  )
}
