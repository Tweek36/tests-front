import React from 'react';
import { Link } from 'react-router-dom';
import './UserButton.css';

interface UserButtonProps {
  to?: string;
  text?: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ to, text, icon, onClick }) => {
  return to ? (
    <Link to={to} className="user-button">{icon}{text}</Link>
  ) : (
    <a className="user-button" onClick={onClick}>{icon}{text}</a>
  );
};

export default UserButton;