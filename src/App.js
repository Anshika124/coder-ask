import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Register';



function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
