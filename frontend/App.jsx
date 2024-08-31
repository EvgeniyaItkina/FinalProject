import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './shared/login/Login.jsx';
import HorizontalNavbar from './client/src/components/Navbar/HorizontalNavbar.jsx';
import VerticalNavbar from './client/src/components/Navbar/VerticalNavbar.jsx';
import HomePage from './client/src/components/MainContent/HomePage.jsx';


function App() {

  return (
    <>
      <Router>
        <div className='app-container'>
          <HorizontalNavbar />
          <div className='main-container'>
            <VerticalNavbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
