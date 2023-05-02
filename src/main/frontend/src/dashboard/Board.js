import {Box, Card, CardContent, Container, Paper, Typography} from "@mui/material";
import Home from "./body/Home";
import MyAssets from "./body/Assets";
import CreditScore from "./body/CreditScore";
import CreditModel from "./body/CreditModel";
import ConsumptionIncome from "./body/ConsumptionIncome";
import Notice from "./body/Notice";
import QnA from "./body/QnA";
import FAQ from "./body/FAQ";

function Board(props) {


  return (

    <Container maxWidth='lg' sx={{width: "80vw"}}>
      {/*Board Header*/}
      <Card elevation={0}>
        <h2> {props.menu} </h2>
      </Card>
      <br/>

      {/* Board Body*/}
      {
        props.menu == "Home" ? <Home/> :
        props.menu == "내 자산" ? <MyAssets/> :
        props.menu == "내 신용점수" ? <CreditScore/> :
        props.menu == "신용 모형" ? <CreditModel/> :
        props.menu == "소비 소득 내역" ? <ConsumptionIncome/> :
        props.menu == "공지사항" ?<Notice/> :
        props.menu == "Q & A" ? <QnA/> :
        props.menu == "자주 묻는 질문" ? <FAQ/> : null
      }
    </Container>
  );
}

export default Board;
