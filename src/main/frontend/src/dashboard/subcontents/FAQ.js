import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import BoardList from "../components/BoardList";
import DashboardFooter from "../DashboardFooter";
import * as React from "react";

export default function FAQ() {
  return (
    <>
      <Toolbar/>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>

          {/* FAQ 내용 */}
          <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height:'74vh'}}>
              <BoardList/>
            </Paper>
          </Grid>

        </Grid>

      </Container>
      <DashboardFooter sx={{pt: 4}}/>
    </>
  )
}
