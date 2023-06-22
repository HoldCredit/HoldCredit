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

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginLeft:"30px", marginRight:"30px" }}>
                <Card style={{ width: "80%", marginRight: "10px" ,  backgroundColor: "#FAFBFD" }}>
                  <CardContent>
                    <h2 style={{  marginBottom: "10px", fontWeight: "bold",  textAlign: "center" }}> 수익 현황</h2>
                    <img src="/reditDash.png" alt="수익 대쉬보드" style={{ width: "100%", height: "300px" }} />
                  </CardContent>
                </Card>

                <Card style={{ width: "40%", marginLeft: "8px" }}>
                  <CardContent>
                    <Typography variant="h5" style={{ marginBottom: "20px" , fontWeight: "bold", textAlign: "center"  }}> 수익 현황 설명 </Typography>
                    <Typography variant="body1" style={{ marginBottom: "10px", fontWeight: "bold" }}>
                      1️⃣️ 신용 평가를 실시한 전체 인구의 평균 수익률입니다.
                    </Typography>
                    <Typography variant="body1">➜ 전체 등급의 평균 수익률은 7.695 입니다.</Typography>
                    <Typography variant="body1" style={{ marginTop: "20px" , fontWeight: "bold" }}> 2️⃣ 등급 및 지역 별 평균 수익률입니다.</Typography>
                    <Typography variant="body1">➜ 모든 등급의 평균 수익률은 서울이 가장 높습니다.</Typography>
                  </CardContent>
                </Card>
        </div>

     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginLeft:"30px", marginRight:"30px"  }}>
         <Card style={{ width: "80%", marginRight: "10px" ,  backgroundColor: "#FAFBFD" }}>
           <CardContent>
             <h2 style={{  marginBottom: "10px", fontWeight: "bold",  textAlign: "center" }}> 부채 현황</h2>
             <img src="/debtDash.png" alt="부채 대쉬보드" style={{ width: "100%", height: "400px" }}/>
           </CardContent>
         </Card>
         <Card style={{ width: "40%", marginLeft: "10px" }}>
           <CardContent>
             <Typography variant="h5" style={{  marginBottom: "20px" , fontWeight: "bold", textAlign: "center" }}> 대출 설명</Typography>
             <Typography style={{ fontWeight: "bold", marginTop: "10px" }}>1️⃣️ 신용 평가를 실시한 전체 인구의 평균 대출 횟수 및 금액입니다.</Typography>
             <Typography>➜ 전체 등급의 평균 대출 횟수는 2.6회 입니다.</Typography>
             <Typography>️➜ 전체 등급의 평균 대출 금액은 약 42,236원 입니다.</Typography>
             <Typography style={{ fontWeight: "bold", marginTop: "50px" }}>2️⃣ 등급 별 평균 대출 횟수 및 금액입니다.</Typography>
             <Typography>➜ 0등급 평균 대출 횟수는 1.2회로 가장 낮고, 금액은 23,683으로 등급 중 가장 낮습니다.</Typography>
             <Typography>➜ 6등급이 평균 대출 횟수가 2.9회로 가장 높고, 금액은 41,354로 평균 금액보다는 낮습니다.</Typography>
           </CardContent>
         </Card>
     </div>


     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginLeft:"30px", marginRight:"30px"  }}>
        <Card style={{ width: "80%", marginRight: "10px" ,  backgroundColor: "#FAFBFD" }}>
          <CardContent>
            <h2 style={{  marginBottom: "10px", fontWeight: "bold",  textAlign: "center" }}> 상환 현황</h2>
            <img src="/redemptionDash.png" alt="상환 대쉬보드" style={{ width: "100%", height: "400px" }} />
         </CardContent>
        </Card>

      <Card style={{ width: "40%", marginLeft: "10px" }}>
        <CardContent>
          <Typography variant="h5" style={{  marginBottom: "20px" , fontWeight: "bold", textAlign: "center" }}> 상환 설명</Typography>
          <Typography style={{ fontWeight: "bold", marginTop: "10px" }}>1️⃣️ 신용 평가를 실시한 전체 인구의 평균 연체 횟수 입니다.</Typography>
          <Typography>➜ 6개월 동안의 평균 연체 횟수는 1.6회 입니다.</Typography>
          <Typography>➜ 1년 동안의 평균 연체 횟수는 2.6회 입니다.</Typography>

          <Typography style={{ fontWeight: "bold", marginTop: "50px" }}>2️⃣ 등급 별 평균 연체 횟수 비율 입니다.</Typography>
          <Typography>➜ 0등급의 연체 횟수가 1.1로 가장 낮습니다.</Typography>
          <Typography>➜ 6등급의 연체 횟수가 2.8로 평균보다 높습니다.</Typography>
        </CardContent>
      </Card>
     </div>

      <DashboardFooter sx={{pt: 4}}/>
    </>

  )
}