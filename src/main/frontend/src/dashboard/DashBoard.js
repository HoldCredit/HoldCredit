import Header from "../components/Header";
import SideBar from "./SideBar";
import {css, Grid} from "@mui/material";
import Board from "./Board";
import {useState} from "react";
import "../styles/index.css";

function DashBoard() {

  const sideMenus = ["Home", "내 자산", "내 신용점수", "신용 모형", "소비 소득 내역"];
  const serviceMenus = ["공지사항", "Q & A", "자주 묻는 질문"];
  const allMenu = [sideMenus, serviceMenus];

  const [menu, selectMenu] = useState(allMenu[0][0]);

  return (
    <>
      <Header></Header>
      <Grid container spacing={2} sx={{height:"100vh"}}>
        <Grid item fixed xs={2.2} >
          <SideBar selectMenu={selectMenu} sideMenus={sideMenus} serviceMenus={serviceMenus}></SideBar>
        </Grid>
        <Grid className="under" item xs={9.8} sx={{padding:"25px 0px", backgroundColor:"#F4F5FA", position:"relative", zIndex: "0"}}>
          <Board menu={menu}></Board>
        </Grid>
      </Grid>
    </>
  );
}

export default DashBoard;