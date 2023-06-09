import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import BoardList from "../components/BoardList";
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MyAssets.css"; // Import CSS module
import { Card, CardContent, Typography } from "@mui/material";
import { useState } from 'react';


export default function MyAssets() {
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

  // 고객 인포에 모든 정보 담기
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
      <Toolbar />
        <div style={{ marginLeft: "30px" }}>
            <Container>
            <div style={{  marginBottom: "30px",  textAlign: "center"}}>
                <Typography variant="h4" style={{fontWeight: "bold", color:"#fff"}}> 전체 정보와 인구별 지역을 비교해보세요! </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "50px", marginLeft:"30px", marginRight:"30px" }}>
              <Card variant="outlined" style={{ width: "80%", marginRight: "10px" }}>
                <CardContent>
                  <Typography variant="h4" style={{fontWeight: "bold", color: "#000"}}>환영합니다. {memberInfo.name}님의 정보입니다.</Typography>
                  {creditInfo && (
                    <div>
                      <Typography variant="h6">✅고객 번호: <strong>{creditInfo.customerNo}</strong></Typography>
                      <Typography variant="h6">✅대출 번호: <strong>{creditInfo.adNo}</strong></Typography>
                      <Typography variant="h6">✅나의 지역: <strong>{creditInfo.res_Add}</strong></Typography>
                      <Typography variant="h6">✅나의 수익률: <strong>{creditInfo.pre_RT}%</strong></Typography>
                      <Typography variant="h6">✅대출 한도: <strong>{creditInfo.pre_LMT}원</strong></Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card style={{ width: "20%", marginRight: "10px" }}>
                 <CardContent style={{backgroundColor:"#eee", height:"35%"}}>
                   <Typography variant="h4" style={{ fontFamily:'Yoon 윤고딕', marginBottom: "40px", textAlign: "center",fontWeight: "bold" , marginTop:"5px"}}> 신용등급</Typography>
                    <Typography variant="h1" style={{ textAlign: "center"}}> {cbScore} </Typography>
                 </CardContent>
              </Card>
            </div>
            </Container>
          </div>


    <div style={{ marginLeft: "30px"}}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} style={{ display: "flex", gap: "30px" }}>
        <Grid container spacing={3}>
          {/* Left Graph: 전체 인구 별 지역 비율 */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
                marginBottom: 20,
                backgroundColor:"#fafafa"
              }}
            >
              <h1>전체 인구 별 지역 비율</h1>
              <iframe
                src="http://192.168.30.156:5601/app/visualize#/create?embed=true&type=pie&indexPattern=7b6dc170-0a86-11ee-9786-9f3f90fca4c7&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),savedQuery:locationData,uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(field:column1),schema:metric,type:sum),(enabled:!t,id:'2',params:(field:column2,missingBucket:!t,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:27),schema:segment,type:terms)),params:(addLegend:!t,addTooltip:!t,isDonut:!t,labels:(last_level:!t,show:!f,truncate:100,values:!t),legendPosition:right,row:!f,type:pie),title:'',type:pie))"
                height="100%"
                width="100%"
              ></iframe>
            </Paper>
          </Grid>

          {/* Right Graph: 전체 지역 별 등급 순위 */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 600,
                marginBottom: 20,
                backgroundColor:"#fafafa"
              }}
            >
              <h1>전체 지역 별 등급 순위</h1>
              <iframe
                src="http://192.168.30.156:5601/app/visualize#/edit/690ba2c0-0b55-11ee-92c5-5d18061afd01?embed=true&type=table&indexPattern=ac5c3c90-0aad-11ee-b66d-9b7d79f3dacc&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:%EB%93%B1%EA%B8%89,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:12),schema:bucket,type:terms),(enabled:!t,id:'3',params:(field:%EC%A7%80%EC%97%AD,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:split,type:terms)),params:(perPage:10,percentageCol:'',row:!f,showMetricsAtAllLevels:!f,showPartialRows:!f,showToolbar:!f,showTotal:!t,totalFunc:sum),title:'CB%20by%20Loc',type:table))"
                height="100%"
                width="100%"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>


        <div>
              <Card>
                <CardContent style={{backgroundColor:"#fafafa"}}>
                  <Typography variant="h5" style={{ marginBottom: "20px" , fontWeight: "bold", textAlign: "center",   }}> 시각화 설명 </Typography>
                  <p>1️⃣️ 신용 평가를 실시한 전체 인구 중 지역 비율입니다.</p>
                  <p> ➜ 가장 많은 지역은 27.05%로 경기도 지역이 차지하였습니다.</p>
                  <p>️ ➜ 가장 적은 지역은 0.02%로 전라도 지역이 차지하였습니다.</p>

                  <p style={{ marginTop: "50px"}}>2️⃣ 신용 평가를 실시한 전체 인구 중 등급 비율입니다.</p>
                  <p> ➜ 각 지역 별 가장 많은 등급순으로 나열하였습니다.</p>
                </CardContent>
              </Card>
       </div>
      </Container>
      </div>
                  <DashboardFooter sx={{marginTop:"30px", marginBottom:"30px", pt: 4}}/>
     </>
   );
 }