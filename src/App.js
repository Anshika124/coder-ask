import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import Questions from './pages/Questions';
import Ask from './pages/Ask';
import SignOut from './pages/SignOut';
import Profile from './pages/Profile';
import QuestionInfo from './pages/QuestionInfo';
import EditAsk from './pages/EditAsk';
import Search from './pages/Search';
import { githubDomain, localDBUrl } from './controller/URLManager';
import axios from 'axios';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);


  useEffect(() => {
    const checkUser = async () => {
      console.log("Checking")
      if (localStorage.getItem("userData") && localStorage.getItem("userData") !== '{}') {
        const local = JSON.parse(localStorage.getItem("userData"))
        try {
          let res = await axios.post(localDBUrl + "/users/login", {
            email: local.email,
            password: local.password
          });
          console.log(res.data.message)
          if (res.data.success) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('userData');
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    checkUser();
  },[])
  
  return (
    <div >
      
      <Router>
      <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path={`${githubDomain}`} element={<Home />} />
          <Route path={`${githubDomain}login`} element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path={`${githubDomain}register`} element={<Registration setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path={`${githubDomain}questions`} element={<Questions />} />
          {/* <Route path={`${githubDomain}ask`} element={<Ask />} /> */}
          <Route path={`${githubDomain}ask`} element={<Ask />} />
          <Route path={`${githubDomain}editask/:id`} element={<EditAsk/>} />
          <Route path={`${githubDomain}signout`} element={<SignOut setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path={`${githubDomain}profile/:id`} element={<Profile />} />
          <Route path={`${githubDomain}question/:title/:id`} element={<QuestionInfo/>} />
          <Route path={`${githubDomain}search`} element={<Search />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
