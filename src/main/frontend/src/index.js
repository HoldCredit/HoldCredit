import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./screens/Home";
import Service from "./screens/Service";
import CreditRating from "./screens/CreditRating";
import MainNotice from './screens/MainNotice';
import MainQnA from './screens/MainQnA';
import MainFaQ from './screens/MainFaQ';
import NoticeView from './screens/NoticeView';
import NoticeWrite from './screens/NoticeWrite';
import NoticeEdit from './screens/NoticeEdit';
import QnaView from './screens/QnaView';
import QnaWrite from './screens/QnaWrite';
import QnaEdit from './screens/QnaEdit';
import LoginPage from "./login/LoginPage";
import JoinForm from "./login/JoinForm";
import FindId from "./login/FindId";
import FindPwd from "./login/FindPwd";
import EditMember from "./login/EditMember";
import DeleteMember from './login/DeleteMember';
import ReportSummary from "./dashboard/maincontents/ReportSummary";
import MyAssets from "./dashboard/maincontents/MyAssets";
import MyCredit from "./dashboard/maincontents/MyCredit";
import LiskAnalysis from "./dashboard/maincontents/LiskAnalysis";
import Board from "./dashboard/Board";
import BoardPost from "./dashboard/BoardPost";
import Error404 from "./pages/Error404";
import CreditForm from "./pages/CreditForm";
import {Provider} from "react-redux";
import Store from "./store/Store";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/Service" element={<Service/>}/>
            <Route path="/CreditRating" element={<CreditRating/>}/>
            <Route path="/MainNotice" element={<MainNotice/>}/>
            <Route path="/MainQnA" element={<MainQnA/>}/>
            <Route path="/MainFaQ" element={<MainFaQ/>}/>
            <Route path="/NoticeView/:id" element={<NoticeView/>}/>
            <Route path="/NoticeWrite" element={<NoticeWrite/>}/>
            <Route path="/NoticeEdit/:id" element={<NoticeEdit/>}/>
            <Route path="/QnaView/:id" element={<QnaView/>}/>
            <Route path="/QnaEdit/:id" element={<QnaEdit/>}/>
            <Route path="/QnaWrite" element={<QnaWrite/>}/>
            <Route path="/LoginPage" element={<LoginPage/>}/>
            <Route path="/JoinForm" element={<JoinForm/>}/>
            <Route path="/FindId" element={<FindId/>}/>
            <Route path="/FindPwd" element={<FindPwd/>}/>
            <Route path="/EditMember" element={<EditMember/>}/>
            <Route path="/DeleteMember" element={<DeleteMember/>}/>
            <Route path="/CreditForm" element={<CreditForm/>}/>
          </Route>

          <Route path="/Dashboard" element={<Dashboard/>}>
            <Route path="" element={<ReportSummary/>}/>
            <Route path="Myassets" element={<MyAssets/>}/>
            <Route path="Mycredit" element={<MyCredit/>}/>
            <Route path="Liskanalysis" element={<LiskAnalysis/>}/>
            <Route path="Notice/" element={<Board/>}/>
            <Route path="Notice/:id" element={<Board/>}/>
            <Route path="Notice/post" element={<BoardPost/>}/>
            <Route path="Notice/:id/edit" element={<BoardPost/>}/>
            <Route path="Qna" element={<Board/>}/>
            <Route path="Qna/:id" element={<Board/>}/>
            <Route path="Qna/post" element={<BoardPost/>}/>
            <Route path="Qna/:id/edit" element={<BoardPost/>}/>
            <Route path="Faq" element={<Board/>}/>
            <Route path="Faq/post" element={<BoardPost/>}/>
          </Route>
          <Route path="*" element={<Error404/>}/>
        </Routes>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
