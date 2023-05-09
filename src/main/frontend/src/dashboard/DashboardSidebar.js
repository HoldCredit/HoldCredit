import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatIcon from '@mui/icons-material/Chat';
import TelegramIcon from '@mui/icons-material/Telegram';
import ReportSummary from "./maincontents/ReportSummary";
import MyAssets from "./maincontents/MyAssets";
import MyCredit from "./maincontents/MyCredit";
import QNA from "./subcontents/QNA";
import FAQ from "./subcontents/FAQ";
import Notice from "./subcontents/Notice";
import LiskAnalysis from "./maincontents/LiskAnalysis";

function SidebarMainMenus({setMenu}) {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => setMenu(<ReportSummary/>)}>
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary="Reports Summary" />
      </ListItemButton>

      <ListItemButton onClick={() => setMenu(<MyAssets/>)}>
        <ListItemIcon>
          <AttachMoneyIcon/>
        </ListItemIcon>
        <ListItemText primary="My Assets" />
      </ListItemButton>

      <ListItemButton onClick={() => setMenu(<MyCredit/>)}>
        <ListItemIcon>
          <CreditCardIcon/>
        </ListItemIcon>
        <ListItemText primary="My Credit"/>
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <RunningWithErrorsIcon/>
        </ListItemIcon>
        <ListItemText primary="Lisk Analysis" onClick={() => setMenu(<LiskAnalysis/>)}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon/>
        </ListItemIcon>
        <ListItemText primary="하나 더 뭘 넣을까"/>
      </ListItemButton>
    </React.Fragment>
  )
}


function SidebarSubMenus({setMenu}) {

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        고객 센터
      </ListSubheader>

      <ListItemButton onClick={() => setMenu(<Notice/>)}>
        <ListItemIcon>
          <TelegramIcon/>
        </ListItemIcon>
        <ListItemText primary="공지 사항" />
      </ListItemButton>

      <ListItemButton onClick={() => setMenu(<QNA/>)}>
        <ListItemIcon>
          <HelpOutlineIcon/>
        </ListItemIcon>
        <ListItemText primary="Q & A" />
      </ListItemButton>

      <ListItemButton onClick={() => setMenu(<FAQ/>)}>
        <ListItemIcon>
          <ChatIcon/>
        </ListItemIcon>
        <ListItemText primary="자주 묻는 질문" />
      </ListItemButton>
    </React.Fragment>
  )
}

export {SidebarMainMenus, SidebarSubMenus}