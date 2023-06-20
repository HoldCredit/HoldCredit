import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashBoardHeader from "../dashboard/DashboardHeader";
import {Outlet} from "react-router-dom";

const mdTheme = createTheme();

function Dashboard() {

  return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>

          <DashBoardHeader/>

          {/* Content */}
          <Box component="main"
               sx={{padding:"25px 0px",position:"relative", zIndex: "0",
                 flexGrow: 1, height: '100vh', overflow: 'auto', backgroundColor:'#f8f9fa'}}>
            {/*<Provider PageTitleStore={PageTitleStore}>*/}
              <Outlet/>
            {/*</Provider>*/}
          </Box>

        </Box>
      </ThemeProvider>
  );
}

export default Dashboard;