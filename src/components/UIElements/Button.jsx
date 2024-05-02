// Button.js
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px', cursor: 'pointer' }}>
      {children}
    </button>
  );
};

export default Button;
