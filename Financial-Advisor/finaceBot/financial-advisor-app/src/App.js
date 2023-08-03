import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./Header";
import FinancialAdvisorApp from "./FinancialAdvisorApp";
import Home from "./Home";
function App() {
  return (
    <div className="App">
       <Router>
        <Header/>
        <Routes>
           <Route path="/home" element={<Home/>}/>
          <Route path="/advisor" element={<FinancialAdvisorApp/>}/>
          {/* <Route path="/achivement" element={<Achivements/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
