import Toolbar from "@mui/material/Toolbar";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Container } from "@mui/material";


export default function MyCredit() {
  // 세션에 저장된 토큰값 가져오기
  const storedToken = sessionStorage.getItem("loginData");
  // 토큰값 해석
  const decodedToken = jwtDecode(storedToken);
  // 해석한 정보에서 회원번호만 추출
  const customerNo = decodedToken.sub;

  const navigate = useNavigate();
  const customerName = useSelector((state) => state.customerName);

  useEffect(() => {
    console.log(customerName);
  }, [customerName]);

  const memberInfo = {
    name: customerName,
  };

  return (
    <>
      <Toolbar/>
            <div style={{ flex: 1, marginLeft: "30px" }}>
                  <h1>환영합니다. {memberInfo.name}님의 정보입니다. </h1>
                  <h3>여기 신용 정보 불러올 예정{memberInfo.financial_no} </h3>
                  <h3>나의 등급 : {memberInfo.financial_no} </h3>
                  <h3>나의 한도 : {memberInfo.financial_no} </h3>
                  <h1>전체 정보와 비교해보세요</h1>
            </div>

             <div>
                                <div style={{ display: "flex" , marginLeft: "30px" }}>
                                 <iframe src="http://192.168.30.156:5601/app/dashboards#/create?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:'54999c5e-fea1-4262-8610-9276a8df8bf9',w:24,x:0,y:0),id:bd08dc80-0c22-11ee-9f9b-a5cedd435e90,panelIndex:'54999c5e-fea1-4262-8610-9276a8df8bf9',type:lens,version:'7.11.1'),(embeddableConfig:(),gridData:(h:15,i:bf054f88-b19c-48ef-b151-62f6defbbeb1,w:24,x:24,y:0),id:f1dd3240-0c26-11ee-9f9b-a5cedd435e90,panelIndex:bf054f88-b19c-48ef-b151-62f6defbbeb1,type:lens,version:'7.11.1')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'',viewMode:edit)&hide-filter-bar=true" height="600" width="800"
                                    height="600"
                                    width="800"
                                  ></iframe>
                                  <div style={{ flex: 1, marginLeft: "30px" }}>
                                    <h2 style={{ fontWeight: 'bold' }}>시각화 설명</h2>
                                    <p style={{ fontWeight: 'bold' }}>1️⃣️  신용 평가 등급 별 한도 수준</p>
                                    <p> ➜ 1등급의 가장 많은 한도 수준은 1,200만원이며,</p>
                                    <p> ➜ 7등급의 가장 많은 한도 수준은 520만원으로 결과가 나왔습니다.</p>

                                    <p style={{ fontWeight: 'bold' }}>2️⃣  신용 평가 등급 별 1년간 총 연체 건수</p>
                                    <p> ➜ 가장 많은 연체 건수 : 10건</p>
                                    <p> 5등급 = 18명</p>
                                    <p> 8등급 = 12명</p>
                                    <p> ➜ 가장 적은 연체 건수 : 0건</p>
                                    <p> 2등급 = 2,880명</p>
                                    <p> 4등급 = 1,796명</p>
                                  </div>

                                </div>
              </div>
    </>
  );
}
