import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashBoardHeader from "../dashboard/DashboardHeader";
import {useState} from "react";
import ReportSummary from "../dashboard/maincontents/ReportSummary";

const mdTheme = createTheme();

function Dashboard() {

  const [menu, setMenu] = useState(<ReportSummary/>);

  return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>

          <DashBoardHeader setMenu={setMenu}/>

          {/* Content */}
          <Box component="main" className="under"
               sx={{padding:"25px 0px",position:"relative", zIndex: "0",
                 flexGrow: 1, height: '100vh', overflow: 'auto', }}>
          {menu}
          </Box>

        </Box>
      </ThemeProvider>
  );
}

export default Dashboard;