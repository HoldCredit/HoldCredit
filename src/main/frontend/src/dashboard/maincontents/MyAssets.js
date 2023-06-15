import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import BoardList from "../components/BoardList";
import { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function MyAssets() {
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
      <Toolbar />
      <div>
      <h1>환영합니다. {memberInfo.name}님의 정보입니다. </h1>
        <h3>여기 신용 정보 불러와야함{memberInfo.financial_no} </h3>
        <h1>전체 정보와 비교해보세요</h1>
      </div>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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

          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>

          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <BoardList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <DashboardFooter sx={{ pt: 4 }} />
    </>
  );
}
