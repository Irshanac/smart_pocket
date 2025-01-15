import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => (
  <button
    type={type}
    className="w-full hover:bg-buttonBackground text-white py-2 px-4 rounded-md bg-cyan-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {children}
  </button>
);

export default Button;
