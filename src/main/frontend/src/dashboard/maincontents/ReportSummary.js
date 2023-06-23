import Toolbar from "@mui/material/Toolbar";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Container } from "@mui/material";
import "../../styles/MyAssets.css"; // Import CSS module
import { Grid, Card, CardContent, Typography } from "@mui/material";
import creditscoreImage from "../../images/creditscore.png"; // Import the image
import { useState } from 'react';



export default function ReportSummary() {
  // 세션에 저장된 토큰값 가져오기
   const storedToken = sessionStorage.getItem("loginData");
   // 토큰값 해석
   const decodedToken = jwtDecode(storedToken);
   // 해석한 정보에서 회원번호만 추출
   const customerNo = decodedToken.sub;
   // 지정한 곳으로 가
   const navigate = useNavigate();
   // 고객 이름 가져오기
   const customerName = useSelector((state) => state.customerName);
   //콘솔에 이름찍어서 확인
   useEffect(() => {
     console.log(customerName);
   }, [customerName]);

   // 고객 인포에 모든 정보 담아
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

  //cb등급
     const [cbScore, setCbScore] = useState(null);

     useEffect(() => {
        const fetchCbScore = async () => {
          try {
            const response = await fetch(`http://localhost:8080/score/cb/${customerNo}`);
            if (response.ok) {
              const scoreData = await response.json();
              setCbScore(scoreData);
            } else {
              console.error('신용등급 실패:', response.status);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchCbScore();
      }, [customerNo]);

   return (
     <>
       <Toolbar/>
             <Container>
             <div style={{  marginBottom: "30px",  textAlign: "center"}}>
                <Typography variant="h4" style={{fontWeight: "bold"}}> 나의 등급 별 점수를 전체 점수와 비교해보세요! </Typography>
             </div>
             <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "50px", marginLeft:"30px", marginRight:"30px" }}>
               <Card variant="outlined"  style={{ width: "80%", marginRight: "10px" }}>
                 <CardContent>
                   <Typography variant="h4">Report Summary for {memberInfo.name}님</Typography>
                   {creditInfo && (
                     <div style={{ marginTop: "20px" }}>
                       <Typography variant="h6">🔸고객 번호: {creditInfo.customerNo}</Typography>
                       <Typography variant="h6">🔸대출 번호: {creditInfo.adNo}</Typography>
                       <Typography variant="h6">🔸수익률: {creditInfo.pre_RT}%</Typography>

                     </div>
                   )}
                 </CardContent>
               </Card>

               <Card style={{ width: "20%", marginRight: "10px" }}>
                 <CardContent>
                   <Typography variant="h4" style={{  marginBottom: "30px", textAlign: "center", fontWeight: "bold" }}> 신용등급</Typography>
                   <Typography variant="h1" style={{ textAlign: "center"}}> {cbScore} </Typography>
                 </CardContent>
               </Card>
             </div>
             </Container>

         <Container>
           <Card style={{ marginTop: '30px' }}>
             <Card>
               <img src={creditscoreImage} alt="Credit Score" className={"image"} />
             </Card>

           </Card>


               <Grid container spacing={2} style={{ marginTop: '30px' }}>
                 <Grid item xs={12} sm={6}>
                   <Card variant="outlined">
                     <CardContent>
                       <Typography variant="h6" style={{ fontWeight: 'bold' }}>등급제 설명</Typography>
                       <Typography variant="body1" style={{ fontWeight: 'bold' }}>1️⃣️  신용 평가 등급 별 점수를 더 세세하게 변경했습니다.</Typography>
                       <Typography variant="body2">➜ 664점과 665점은 ‘하늘과 땅 차이’?
                        기존 등급제는 개인별 신용점수를 산정한 뒤 1~10등급으로 나누는 방식이다. 대다수 금융회사는 신용정보회사(CB사)가 정한 등급을 그대로 넘겨받아 대출 심사에 활용하고 있다. 은행들은 통상 6등급까지만 돈을 빌려준다.
                        하지만 일정 구간에 따라 기계적으로 등급을 매기다 보니 일부 소비자가 불이익을 본다는 지적이 적지 않았다. 예를 들어 신용점수가 664점인 사람은 7등급(600~664점·NICE 기준)으로 분류돼 1금융권 대출이 사실상 불가능하다. 실제 신용 상태는 6등급 최하위인 사람과 큰 차이가 없는데도 ‘간발의 차’로 탈락한 셈이다. 이런 사람들은 대부업체나 비제도권 금융회사로 내몰릴 가능성이 컸다.</Typography>
                       <Typography variant="body2">➜ -한경 신문 인용 (임현우 기자)의 기사를 토대로 조사하여 등급을 세세하게 나누었습니다.</Typography>
                     </CardContent>
                   </Card>
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <Card variant="outlined">
                     <CardContent>
                       <Typography variant="h6" style={{ fontWeight: 'bold' }}>등급 결과 설명</Typography>
                       <Typography variant="body1" style={{ fontWeight: 'bold' }}>2️⃣  신용 평가 등급 별 산출 목록</Typography>
                       <Typography variant="body2">➜ 부채 수준 24.5%</Typography>
                       <Typography variant="body2">➜ 나의 자산 28.4%</Typography>
                       <Typography variant="body2">➜ 비금융/마이데이터 7.3%</Typography>
                       <Typography variant="body2">➜ 상환 이력 28.4%</Typography>
                       <Typography variant="body2">➜ 신용 거래 기간 12.3%</Typography>
                       <Typography variant="body2">➜ 신용 형태 27.5%</Typography>
                       <Typography variant="body2"> 총 합 계 100.00%</Typography>
                     </CardContent>
                   </Card>
                 </Grid>
               </Grid>
             </Container>
           </>
   );
 }
