import React, { useContext, useState } from 'react';
import { CiSearch, CiViewList } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import { IoLanguage } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Input, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './Navbar.css';
import { userContext } from '../../../userContext';

const HorizontalNavbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [isListView, setIsListView] = useState(true);
  const [qrOpen, setQrOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(userContext)
  console.log(context);
  // console.log(userState);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (typeof value === 'string') {
      setSearch(value);
      onSearch(value);
    }
  };

  const toggleView = () => {
    setIsListView(!isListView); // Переключаем состояние
    console.log('Switching items view');
  };

  const handlePhoneClick = () => {
    setQrOpen(true); // Открываем модальное окно с QR-кодом
  };

  const handleClose = () => {
    setQrOpen(false); // Закрываем модальное окно
  };

  return (
    <div className="horizontal-navbar">
      <div className="navbar-logo" onClick={() => { navigate('/') }} style={{ cursor: 'pointer' }}>
        <img src="/LogoFlyingTeapot.jpg" alt="Logo" />
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
        <Button variant="text" onClick={handlePhoneClick}>
          Phone: 054-687650
        </Button>
      </div>
      <div className="navbar-bottom-row">
        <Button variant="text" onClick={() => navigate('/about')}>
          About
        </Button>
        <Button variant="text" onClick={toggleView}>
          {isListView ? <PiDotsNineBold /> : <CiViewList />}
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
      {/* Модальное окно с QR-кодом */}
      <Dialog open={qrOpen} onClose={handleClose}>
        <DialogTitle>Contact via WhatsApp</DialogTitle>
        <DialogContent>
          <QRCode value="https://wa.me/0546287650" size={256} /> {/* Генерация QR-кода */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default HorizontalNavbar;
