import React, { createContext, useState } from 'react';
import { maskCardNumber } from '../utils/cardUtils';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [registeredCards, setRegisteredCards] = useState([]);

  const addCard = (cardDetails) => {
    const displayCard = {
      id: Date.now(),
      number: maskCardNumber(cardDetails.cardNumber),
      owner: cardDetails.ownerName,
      expiry: cardDetails.expiryDate,
    };
    setRegisteredCards(prevCards => [displayCard, ...prevCards]);
  };

  const contextValue = {
    registeredCards,
    addCard,
  };

  return (
    <CardContext.Provider value={contextValue}>
      {children}
    </CardContext.Provider>
  );
};
