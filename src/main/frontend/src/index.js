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
import LoginPage from "./login/LoginPage";
import JoinForm from "./login/JoinForm";
import FindId from "./login/FindId";
import FindPwd from "./login/FindPwd";
import EditMember from "./login/EditMember";
import ReportSummary from "./dashboard/maincontents/ReportSummary";
import MyAssets from "./dashboard/maincontents/MyAssets";
import MyCredit from "./dashboard/maincontents/MyCredit";
import LiskAnalysis from "./dashboard/maincontents/LiskAnalysis";
import Notice from "./dashboard/subcontents/Notice";
import QNA from "./dashboard/subcontents/QNA";
import FAQ from "./dashboard/subcontents/FAQ";
import Error404 from "./pages/Error404";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/Service" element={<Service/>}/>
          <Route path="/CreditRating" element={<CreditRating/>}/>
          <Route path="/LoginPage" element={<LoginPage/>}/>
          <Route path="/JoinForm" element={<JoinForm/>}/>
          <Route path="/FindId" element={<FindId/>}/>
          <Route path="/FindPwd" element={<FindPwd/>}/>
          <Route path="/EditMember" element={<EditMember/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="" element={<ReportSummary/>}/>
          <Route path="myassets" element={<MyAssets/>}/>
          <Route path="mycredit" element={<MyCredit/>}/>
          <Route path="liskanalysis" element={<LiskAnalysis/>}/>
          <Route path="notice" element={<Notice/>}/>
          <Route path="qna" element={<QNA/>}/>
          <Route path="faq" element={<FAQ/>}/>
        </Route>
        <Route path="*" element={ <Error404/> } />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
