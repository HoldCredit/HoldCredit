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
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {useDispatch, useSelector} from "react-redux";
import {handleMenu} from "../store/DashboardMenuStore";

export function SidebarMenus() {

  const navigate = useNavigate();
  const menu = useSelector((state) => {return state.selectMenu.name});

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => {return navigate('/Dashboard'); dispatch(handleMenu('report')); }}>
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary="Reports Summary" />
      </ListItemButton>

      <ListItemButton onClick={() => {navigate('/Dashboard/Myassets'); dispatch(handleMenu('My Assets'));}}>
        <ListItemIcon>
          <AttachMoneyIcon/>
        </ListItemIcon>
        <ListItemText primary="My Assets" />
      </ListItemButton>

      <ListItemButton onClick={() => {navigate('/Dashboard/Mycredit'); dispatch(handleMenu('My Credit')); }}>
        <ListItemIcon>
          <CreditCardIcon/>
        </ListItemIcon>
        <ListItemText primary="My Credit"/>
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <RunningWithErrorsIcon/>
        </ListItemIcon>
        <ListItemText primary="Lisk Analysis" onClick={() => {navigate('/Dashboard/liskanalysis'); dispatch(handleMenu('Lisk Analysis'));}}/>
      </ListItemButton>

      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset>
        고객 센터
      </ListSubheader>

      <ListItemButton onClick={() => {navigate('/Dashboard/Notice'); dispatch(handleMenu('공지사항'));}}>
        <ListItemIcon>
          <TelegramIcon/>
        </ListItemIcon>
        <ListItemText primary="공지사항" />
      </ListItemButton>

      <ListItemButton onClick={() => {navigate('/Dashboard/Qna'); dispatch(handleMenu('Q & A'));}}>
        <ListItemIcon>
          <HelpOutlineIcon/>
        </ListItemIcon>
        <ListItemText primary="Q & A" />
      </ListItemButton>

      <ListItemButton onClick={() => {navigate('/Dashboard/Faq'); dispatch(handleMenu('자주 묻는 질문'));}}>
        <ListItemIcon>
          <ChatIcon/>
        </ListItemIcon>
        <ListItemText primary="자주 묻는 질문" />
      </ListItemButton>
    </React.Fragment>
  )
}
