import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './shared/login/Login.jsx';
import HorizontalNavbar from './client/src/components/Navbar/HorizontalNavbar.jsx';
import VerticalNavbar from './client/src/components/Navbar/VerticalNavbar.jsx';
import HomePage from './client/src/components/MainContent/HomePage.jsx';
import { userContext } from './client/userContext.jsx';
import { useState } from 'react';

function App() {

  const [userState, setUserState] = useState('unregistered');

  console.log(userState);
  return (
    <div className="wave-container">
      <div className="stars">
        {Array(300).fill(0).map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 1}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      <userContext.Provider value={userState}>
        <Router>
          <div className='app-container'>
            <HorizontalNavbar />
            <div className='main-container'>
              <VerticalNavbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login setUserState={setUserState} userState={userState} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </userContext.Provider>
    </div>
  )
}

export default App
