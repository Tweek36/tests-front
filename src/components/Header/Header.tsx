import React, { useEffect } from 'react';
import Logo from './Logo/Logo';
import Search, { fetchResults } from './Search/Search';
import NavButton from './NavButton/NavButton';
import UserBlock from './UserBlock/UserBlock';
import './Header.css'
import { ReactComponent as HomeIcon } from '../../local/svg/home.svg';
import { ReactComponent as PopularIcon } from '../../local/svg/popular.svg';
import { ReactComponent as CreateIcon } from '../../local/svg/create.svg';


interface HeaderProps {
  username: string;
  isLoginOpen?: (state: boolean) => void;
  setUsername?: (username: string) => void;
}

const Header: React.FC<HeaderProps> = ({ username, isLoginOpen, setUsername }) => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.style.paddingTop = '65px';
    }
    return () => {
      if (root) {
        root.style.paddingTop = 'unset';
      }
    };
  }, []);
  return (
    <header>
      <div className='header-conteiner'>
        <Logo
          image="/logo.png" 
          to="/"
        />
        <Search onSubmit={fetchResults}  />
        <nav>
          <NavButton to="/" text="Главная" icon={<HomeIcon />} />
          <NavButton to="/popular" text="Популярное" icon={<PopularIcon />} />
          <NavButton to="/create" text="Создать" icon={<CreateIcon />} />
        </nav>
        <UserBlock username={username} isLoginOpen={isLoginOpen} setUsername={setUsername} />
      </div>
    </header>
  );
};

export default Header;