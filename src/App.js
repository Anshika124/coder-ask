import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import Questions from './pages/Questions';
import Ask from './pages/Ask';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    
    if (localStorage.getItem("userData") && localStorage.getItem("userData") !== '{}')
      {
        setIsLoggedIn(true);
      }
  },[isLoggedIn])
  
  return (
    <div className="container">
      
      <Router>
      <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/register' element={<Registration setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/ask' element={<Ask />} />
          <Route path='/signout' element={<SignOut setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/profile' element={<Profile />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
