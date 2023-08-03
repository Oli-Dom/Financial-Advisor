import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from "./Header";
import FinancialAdvisorApp from "./FinancialAdvisorApp";

function App() {
  return (
    <div className="App">
       <Router>
        <Header/>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/advisor" element={<FinancialAdvisorApp/>}/>
          {/* <Route path="/achivement" element={<Achivements/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
