import Toolbar from "@mui/material/Toolbar";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/MyAssets.css"; // Import CSS module
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/material";

export default function LiskAnalysis() {
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

  //AnonymousData 정보 담기
    const [creditInfo, setCreditInfo] = React.useState(null);

      useEffect(() => {
        fetch(`http://localhost:8080/api/creditInfo/${customerNo}`)
          .then((response) => response.json())
          .then((data) => setCreditInfo(data))
          .catch((error) => console.error(error));
      }, []);


  const [financeInfo, setFinanceInfo]= useState(null);


  useEffect(() => {
      const fetchFinanceData = async () => {
        try {
            const financeResponse = await fetch(`/finance/${customerNo}`);
            if (financeResponse.ok) {
                const financeData = await financeResponse.json();
                setFinanceInfo(financeData);
            } else {
                console.error("Failed to fetch finance data:", financeResponse.status);
            }
        } catch (error) {
          console.error(error);
        }
      };
      fetchFinanceData();
  }, [customerNo]);


  return (
    <>
      <Toolbar/>
      <Container>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h4">환영합니다. {memberInfo.name}님의 정보입니다.</Typography>
                        {creditInfo && (
                          <div>
                            <Typography variant="h6">🔸고객 번호: {creditInfo.customerNo}</Typography>
                            <Typography variant="h6">🔸대출 번호: {creditInfo.adNo}</Typography>
                            <Typography variant="h6">🔸수익률: {creditInfo.pre_RT}% </Typography>
                            <Typography variant="h6">🔸연체 횟수: {creditInfo.ps0001897}회</Typography>
                            <Typography variant="h6">🔸남은 대출 금액: {creditInfo.l00000002}원</Typography>
                          </div>
                        )}
                        <Typography variant="h5">나의 신용 정보를 전체 정보와 비교해보세요</Typography>
                      </CardContent>
                    </Card>
                  </Container>

    <div style={{ backgroundColor: "#FAFBFD" }}>
      <div style={{ marginTop: "10px", marginBottom: "50px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginLeft: "22px", fontWeight: "bold"}}> 수익 현황</h2>
          <img src="/reditDash.png" alt="수익 대쉬보드" style={{ width: "1000px", height: "400px" }}/>
        </div>
        <div style={{ flex: 1, paddingLeft: "15px" }}>
          <h2 style={{ fontWeight: "bold" }}> 설명</h2>
          <p style={{ fontWeight: "bold", marginTop: "20px" }}>1️⃣️ 신용 평가를 실시한 전체 인구의 평균 수익률 입니다.</p>
          <p>➜ 전체 등급의 평균 수익률은 7.695 입니다.</p>

          <p style={{ fontWeight: "bold", marginTop: "50px" }}>2️⃣ 등급 및 지역 별 평균 수익률 입니다.</p>
          <p>➜ 모든 등급의 평균 수익률은 서울이 가장 높습니다.</p>
        </div>
      </div>

     <div style={{ marginTop: "50px", marginBottom: "50px", display: "flex" }}>
       <div style={{ flex: 1 }}>
         <h2 style={{ marginLeft: "22px", fontWeight: "bold" }}>부채 현황</h2>
         <img src="/debtDash.png" alt="부채 대쉬보드" style={{ width: "1000px", height: "400px" }}/>
       </div>
       <div style={{ flex: 1, paddingLeft: "20px" }}>
         <h2 style={{ fontWeight: "bold" }}> 설명</h2>
         <p style={{ fontWeight: "bold", marginTop: "20px" }}>1️⃣️ 신용 평가를 실시한 전체 인구의 평균 대출 횟수 및 금액입니다.</p>
         <p>➜ 전체 등급의 평균 대출 횟수는 2.6회 입니다.</p>
         <p>️➜ 전체 등급의 평균 대출 금액은 약 42,236원 입니다.</p>

         <p style={{ fontWeight: "bold", marginTop: "50px" }}>2️⃣ 등급 별 평균 대출 횟수 및 금액입니다.</p>
         <p>➜ 0등급 평균 대출 횟수는 1.2회로 가장 낮고, 금액은 23,683으로 등급중 가장 낮습니다.</p>
         <p>➜ 6등급이 평균 대출 횟수가 2.9회로 가장 높고, 금액은 41,354로 평균 금액보다는 낮습니다.</p>
       </div>
     </div>


      <div style={{ marginTop: "50px", marginBottom: "50px",  marginLeft:"10px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginLeft: "20px", fontWeight: "bold"}}> 상환 현황</h2>
          <img src="/redemptionDash.png" alt="상환 대쉬보드" style={{ width: "1000px", height: "400px" }} />
        </div>
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <h2 style={{ fontWeight: "bold" }}> 설명</h2>
          <p style={{ fontWeight: "bold", marginTop: "15px" }}>1️⃣️ 신용 평가를 실시한 전체 인구의 평균 연체 횟수 입니다.</p>
          <p>➜ 6개월 동안의 평균 연체 횟수는 1.6회 입니다.</p>
          <p>➜ 1년 동안의 평균 연체 횟수는 2.6회 입니다.</p>

          <p style={{ fontWeight: "bold", marginTop: "50px" }}>2️⃣ 등급 별 평균 연체 횟수 비율 입니다.</p>
          <p>➜ 0등급의 연체 횟수가 1.1로 가장 낮습니다.</p>
          <p>➜ 6등급의 연체 횟수가 2.8로 평균보다 높습니다.</p>
        </div>
      </div>
    </div>

      <DashboardFooter sx={{pt: 4}}/>
    </>

  )
}