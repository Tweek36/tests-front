import React from 'react';
import { Link } from 'react-router-dom';
import './NavButton.css'

interface NavButtonProps {
  to: string;
  text: string;
  icon: React.ReactElement;
}

const NavButton: React.FC<NavButtonProps> = ({ to, text, icon }) => {
  return (
    <Link to={to} className="nav-button">
      {icon}
      {text}
    </Link>
  );
};


export default NavButton;