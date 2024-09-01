import React, { useState } from 'react';
import './Navbar.css';
import { Button } from '@mui/material';

const VerticalNavbar = () => {
  const [activeCategory, setActiveCategory] = useState('');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    fetchProductsForCategory(category);
  };

  const fetchProductsForCategory = (category) => {
    console.log(`Fetching products for category: ${category}`);
  };

  return (
    <div className="vertical-navbar">
      <h3 className="main-category">Tea</h3>
      <Button
        className={activeCategory === 'english-tea' ? 'active' : ''}
        onClick={() => handleCategoryClick('english-tea')}
      >
        English Tea
      </Button>
      <Button
        className={activeCategory === 'china-taiwan-tea' ? 'active' : ''}
        onClick={() => handleCategoryClick('china-taiwan-tea')}
      >
        Tea from China and Taiwan
      </Button>
      <Button
        className={activeCategory === 'herbal-mix-tea' ? 'active' : ''}
        onClick={() => handleCategoryClick('herbal-mix-tea')}
      >
        Special Herbal Mix Tea
      </Button>
      <Button
        className={activeCategory === 'other-tea' ? 'active' : ''}
        onClick={() => handleCategoryClick('other-tea')}
      >
        Other Tea
      </Button>
      <h3 className="main-category">Tea Accessories</h3>
      <Button
        className={activeCategory === 'teapots' ? 'active' : ''}
        onClick={() => handleCategoryClick('teapots')}
      >
        Teapots
      </Button>
      <Button
        className={activeCategory === 'cups' ? 'active' : ''}
        onClick={() => handleCategoryClick('cups')}
      >
        Cups
      </Button>
      <Button
        className={activeCategory === 'other-accessories' ? 'active' : ''}
        onClick={() => handleCategoryClick('other-accessories')}
      >
        Others
      </Button>
      <h3 className="main-category">Something more</h3>
      <Button
        className={`main-category ${activeCategory === 'jam' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('jam')}
      >
        Jam
      </Button>
      <Button
        className={`main-category ${activeCategory === 'tea-procedures' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('tea-procedures')}
      >
        Tea procedures
      </Button>    </div>
  );
};

export default VerticalNavbar;
