import Toolbar from "@mui/material/Toolbar";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Container } from "@mui/material";
import styles from "../../styles/MyAssets.css"; // Import CSS module
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useState } from 'react';


export default function MyCredit() {
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
                <Typography variant="h4" style={{fontWeight: "bold", color: "#fff"}}> 나의 한도 수준을 전체 정보와 비교해보세요! </Typography>
            </div>

           <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "50px", marginLeft:"30px", marginRight:"30px" }}>
              <Card variant="outlined" style={{ width: "80%", marginRight: "10px" }}>
                <CardContent>
                  <Typography variant="h4" style={{fontWeight: "bold"}}>환영합니다. {memberInfo.name}님의 정보입니다.</Typography><br/>
                  {creditInfo && (
                    <div>
                      <Typography variant="h6">✅고객 번호: <strong>{creditInfo.customerNo}</strong></Typography>
                      <Typography variant="h6">✅대출 번호: <strong>{creditInfo.adNo}</strong></Typography>
                      <Typography variant="h6">✅신용평가 점수: <strong>{creditInfo.res_Add}</strong></Typography>
                      <Typography variant="h6">✅대출 한도: <strong>{creditInfo.pre_LMT}원</strong></Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card style={{ width: "20%", marginRight: "10px" }}>
                 <CardContent style={{backgroundColor:"#eee", height:"35%"}}>
                   <Typography variant="h4" style={{ fontFamily:'Yoon 윤고딕', marginBottom: "30px", textAlign: "center",fontWeight: "bold" , marginTop:"5px"}}> 신용등급</Typography>
                    <Typography variant="h1" style={{ marginTop:"16px", textAlign: "center"}}> {cbScore} </Typography>
                </CardContent>
              </Card>
           </div>
         </Container>

            <Container>
            <Card style={{ marginTop: '30px' }}>
            <iframe src="http://192.168.30.156:5601/app/dashboards#/create?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:15,i:'54999c5e-fea1-4262-8610-9276a8df8bf9',w:24,x:0,y:0),id:bd08dc80-0c22-11ee-9f9b-a5cedd435e90,panelIndex:'54999c5e-fea1-4262-8610-9276a8df8bf9',type:lens,version:'7.11.1'),(embeddableConfig:(),gridData:(h:15,i:bf054f88-b19c-48ef-b151-62f6defbbeb1,w:24,x:24,y:0),id:f1dd3240-0c26-11ee-9f9b-a5cedd435e90,panelIndex:bf054f88-b19c-48ef-b151-62f6defbbeb1,type:lens,version:'7.11.1')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'',viewMode:edit)&hide-filter-bar=true" height="600" width="800"
                                                                    height="600"
                                                                    width="800"
                                                                  ></iframe>
            </Card>
              <Grid container spacing={2} style={{ marginTop: '30px' }}>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" style={{backgroundColor:"#fafafa"}}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontWeight: 'bold', }}>시각화 설명</Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>1️⃣️  신용 평가 등급 별 한도 수준</Typography>
                      <Typography variant="body2">➜ 1등급의 가장 많은 한도 수준은 1,200만원이며,</Typography>
                      <Typography variant="body2">➜ 7등급의 가장 많은 한도 수준은 520만원으로 결과가 나왔습니다.</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" style={{backgroundColor:"#fafafa"}}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>시각화 설명</Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>2️⃣  신용 평가 등급 별 1년간 총 연체 건수</Typography>
                      <Typography variant="body2">➜ 가장 많은 연체 건수 : 10건</Typography>
                      <Typography variant="body2">5등급 = 18명</Typography>
                      <Typography variant="body2">8등급 = 12명</Typography>
                      <Typography variant="body2">➜ 가장 적은 연체 건수 : 0건</Typography>
                      <Typography variant="body2">2등급 = 2,880명</Typography>
                      <Typography variant="body2">4등급 = 1,796명</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
                  <DashboardFooter sx={{marginTop:"30px", marginBottom:"30px", pt: 4}}/>
         </>
       );
     }