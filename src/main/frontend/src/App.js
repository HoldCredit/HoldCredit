import './App.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Service from './screens/Service';
import Home from './screens/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import CreditRating from './screens/CreditRating';

function App(){
  return(
    <Router>
      <Header />
      <div className="main">
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path ="/Service" element = {<Service />} />
        <Route path ="/CreditRating" element = {<CreditRating />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;