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
import GroupsIcon from '@mui/icons-material/Groups';
import jwtDecode from "jwt-decode";

export function SidebarMenus() {

  const navigate = useNavigate();
  const menu = useSelector((state) => {return state.selectMenu.name});
  // 세션에 저장된 토큰값 가져오기
  const storedToken = sessionStorage.getItem("loginData");
  const decodedToken = jwtDecode(storedToken);
  const auth = decodedToken.auth;
  const dispatch = useDispatch();
  console.log(auth)

  return (
    <React.Fragment>
      <ListItemButton onClick={() => {return navigate('/Dashboard'); dispatch(handleMenu('report')); }}>
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary="개인 신용등급" />
      </ListItemButton>

      <ListItemButton onClick={() => {navigate('/Dashboard/Myassets'); dispatch(handleMenu('My Assets'));}}>
        <ListItemIcon>
          <AttachMoneyIcon/>
        </ListItemIcon>
        <ListItemText primary="지역별 데이터" />
      </ListItemButton>

      <ListItemButton onClick={() => {navigate('/Dashboard/Mycredit'); dispatch(handleMenu('My Credit')); }}>
        <ListItemIcon>
          <CreditCardIcon/>
        </ListItemIcon>
        <ListItemText primary="등급별 한도수준"/>
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <RunningWithErrorsIcon/>
        </ListItemIcon>
        <ListItemText primary="전체 현황" onClick={() => {navigate('/Dashboard/liskanalysis'); dispatch(handleMenu('Lisk Analysis'));}}/>
      </ListItemButton>

      {
        decodedToken.auth == 'ADMIN' ?
        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon/>
          </ListItemIcon>
          <ListItemText primary="Customer List" onClick={() => {navigate('/Dashboard/customerList'); dispatch(handleMenu('customerList'));}}/>
        </ListItemButton>

          : null

      }

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
