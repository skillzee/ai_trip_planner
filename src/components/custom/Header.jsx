import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const Header = ({ onLogout }) => { // Receive logout function as a prop to trigger parent updates if needed
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check for user data in local storage on component mount
    const user = localStorage.getItem('user');
    if (user) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage on logout
    localStorage.removeItem('user');
    setIsUserLoggedIn(false);
    if (onLogout) {
      onLogout(); // Call optional parent callback
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' alt='Logo' />
      <div>
        {isUserLoggedIn ? (
          <Button onClick={handleLogout}>Log Out</Button>
        ) : (
          <Button>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
