import './App.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Service from './screens/Service';
import Home from './screens/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import CreditRating from './screens/CreditRating';
import LoginPage from './login/LoginPage';
import JoinForm from './login/JoinForm';
import FindId from './login/FindId';
import FindPwd from './login/FindPwd';
import EditMember from './login/EditMember';

function App(){
  return(
    <Router>
      <Header />
      
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path ="/Service" element = {<Service />} />
        <Route path ="/CreditRating" element = {<CreditRating />} />
        <Route path ="/LoginPage" element = {<LoginPage />} />
        <Route path ="/JoinForm" element = {<JoinForm />} />
        <Route path ="/FindId" element = {<FindId />} />
        <Route path ="/FindPwd" element = {<FindPwd />} />
        <Route path ="/EditMember" element = {<EditMember />} />
      </Routes>
 
      <Footer />
    </Router>
    
  );
}

export default App;