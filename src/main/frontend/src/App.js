import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {

  const [hello, SetHello] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(result => SetHello(result.data))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="App">

      <h2>백에서 뭐래?? : {hello}</h2>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
