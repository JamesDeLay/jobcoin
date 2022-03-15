import React, { useState } from 'react';
import Store from './store';

const GlobalStore = ({ children }) => {
  const [userAddress, setUserAddress] = useState('');
  
  return (
    <Store.Provider
      value={{
        userAddress,
        setUserAddress
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default GlobalStore;
