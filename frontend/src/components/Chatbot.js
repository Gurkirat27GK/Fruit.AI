import React from 'react';
import './Chatbot.css';

const fruits = [
  { name: 'Orange', price: '$8.00', quantity: 2 },
  { name: 'Cucumber', price: '$1.76', quantity: 1 },
  { name: 'Tangerine', price: '$6.40', quantity: 4 },
];

const Chatbot = () => {
  return (
    <div className="chatbot-container">
      <h2>Chatbot</h2>
      {fruits.map((fruit, index) => (
        <div key={index} className="fruit-card">
          <h3>{fruit.name}</h3>
          <p>Price: {fruit.price}</p>
          <p>Quantity: {fruit.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Chatbot;
