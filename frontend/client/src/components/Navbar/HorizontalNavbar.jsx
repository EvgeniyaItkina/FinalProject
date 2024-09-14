import React, { useContext, useEffect, useState } from 'react';
import { CiSearch, CiViewList } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import { IoLanguage } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { Input, Button, Dialog, DialogTitle, DialogContent, DialogActions, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './Navbar.css';
import { UserContext } from '../../../UserContext';
import { jwtDecode } from "jwt-decode";

const HorizontalNavbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [isListView, setIsListView] = useState(true);
  const [qrOpen, setQrOpen] = useState(false); // Для модального окна с QR-кодом
  const [anchorEl, setAnchorEl] = useState(null); // Для меню профиля
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(UserContext);


  const handlePhoneClick = () => {
    setQrOpen(true); //Open QR window
  };

  // Close QR window
  const handleClose = () => {
    setQrOpen(false);
  };

  //Open/close profile window
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserState('unregistered');
    handleCloseProfileMenu();
    navigate('/');
  };

  //table-row cards list
  const toggleView = () => {
    setIsListView(!isListView);
    console.log('Switching items view');
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
          onChange={(e) => setSearch(e.target.value)} // Добавляем поиск
          placeholder="Search..."
        />
      </div>

      <div className="navbar-phone">
        <Button variant="text" onClick={handlePhoneClick}>
          Phone: 054-687650
        </Button>
      </div>

      <div className="navbar-bottom-row">
        {/* Общие страницы для всех пользователей */}
        <Button variant="text" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button variant="text" onClick={() => navigate('/about')}>
          About
        </Button>

        {/* unregistered user */}
        {userState === 'unregistered' && (
          <>
            <Button variant="text" onClick={toggleView}>
              {isListView ? <PiDotsNineBold /> : <CiViewList />}
            </Button>
            <Button variant="text" onClick={() => navigate('/change-language')}>
              <IoLanguage />
            </Button>
            <Button variant="contained" onClick={() => navigate('/register')}>
              Registration
            </Button>
            <Button variant="contained" onClick={() => navigate('/login')}>
              Login
            </Button>
          </>
        )}

        {/* redistered user */}
        {userState === 'loggedIn' && (
          <>
            <Button variant="text" onClick={() => navigate('/favorites')}>
              Favorite
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
            {/* Иконка профиля */}
            <IconButton onClick={handleProfileClick}>
              <Avatar>A</Avatar> {/* Используем "A" для администратора */}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}

        {/* admin */}
        {userState === 'admin' && (
          <>
            <Button variant="text" onClick={() => navigate('/favorites')}>
              Favorite
            </Button>
            <Button variant="text" onClick={() => navigate('/crm')}>
              CRM
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
            {/* Иконка профиля */}
            <IconButton onClick={handleProfileClick}>
              <Avatar>A</Avatar> {/* Используем "A" для администратора */}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}

      </div>

      {/* Модальное окно с QR-кодом */}
      <Dialog open={qrOpen} onClose={handleClose}>
        <DialogTitle>Contact via WhatsApp</DialogTitle>
        <DialogContent>
          <QRCode value="https://wa.me/0546287650" size={256} />
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
