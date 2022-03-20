import React, { useState } from 'react';
import Store from './store';

const GlobalStore = ({ children }) => {
  const [userAddress, setUserAddress] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  const handleSignOut = () => {
    setUserAddress('');
    setUserInfo({});
    setTransactionHistory([]);
  }

  return (
    <Store.Provider
      value={{
        userAddress,
        setUserAddress,
        userInfo,
        setUserInfo,
        transactionHistory,
        setTransactionHistory,
        handleSignOut
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default GlobalStore;
