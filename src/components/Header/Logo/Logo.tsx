import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  image: string;
  to: string; 
}

const Logo: React.FC<LogoProps> = ({image, to}) => {

  return (
    <Link to={to}>
      <img 
        src={image}
        alt="Логотип"
      />
    </Link>
  );

};

export default Logo;
