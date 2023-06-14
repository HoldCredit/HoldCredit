import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";
import BoardList from "../components/BoardList";

export default function MyAssets() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>전체 인구 별 지역 비율</h1>
        <Grid container spacing={3}>
          <div style={{ marginTop: "20px" }}>
            <iframe
              src="http://192.168.30.156:5601/app/visualize#/create?embed=true&type=pie&indexPattern=7b6dc170-0a86-11ee-9786-9f3f90fca4c7&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),savedQuery:locationData,uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(field:column1),schema:metric,type:sum),(enabled:!t,id:'2',params:(field:column2,missingBucket:!t,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:27),schema:segment,type:terms)),params:(addLegend:!t,addTooltip:!t,isDonut:!t,labels:(last_level:!t,show:!f,truncate:100,values:!t),legendPosition:right,row:!f,type:pie),title:'',type:pie))"
              height="400"
              width="600"
            ></iframe>
          </div>
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
