import React, { useState } from 'react';
import { CiSearch, CiViewList } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import { IoLanguage } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Input, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const HorizontalNavbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (typeof value === 'string') {
      setSearch(value);
      onSearch(value);
    }
  };

  const changeItems = () => {
    console.log('Switching items view');
  };

  return (
    <div className="horizontal-navbar">
      <div className="navbar-logo">
        <img src="./LogoFlyingTeapot.jpg" alt="Logo" />
      </div>
      <div className="navbar-search">
        <CiSearch />
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </div>
      <div className="navbar-phone">
        <Button variant="text" onClick={() => navigate('/phone')}>
          Phone: 05*-***-****
        </Button>
      </div>
      <div className="navbar-bottom-row">
        <Button variant="text" onClick={() => navigate('/about')}>
          About
        </Button>
        <Button variant="text" onClick={changeItems}>
          <PiDotsNineBold />
          <CiViewList style={{ display: 'none' }} />
        </Button>
        <Button variant="text" onClick={() => navigate('/change-language')}>
          <IoLanguage />
        </Button>
        <Button variant="text" onClick={() => navigate('/cart')}>
          <BsCart2 />
        </Button>
        <Button variant="contained" onClick={() => navigate('/register')}>
          Registration
        </Button>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default HorizontalNavbar;
