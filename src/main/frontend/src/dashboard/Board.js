import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DashboardFooter from "./DashboardFooter";
import * as React from "react";
import BoardList from "./components/BoardList";
import {useParams} from "react-router-dom";
import BoardDetail from "./components/BoardDetail";

export default function Board() {

  const {id} = useParams();

  return (
    <>
      <Toolbar/>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        {/* 공지사항 ,QnA 내용 */}
        <Grid item xs={12}>
          <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            {
              id != null ? <BoardDetail/> : <BoardList/>
            }
          </Paper>
        </Grid>

      </Container>
      <DashboardFooter sx={{pt: 4}}/>
    </>
  )
}
