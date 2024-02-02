import React from 'react';
import UserButton from '../UserButton/UserButton';
import { ReactComponent as NotificationIcon } from '../../../local/svg/notification.svg';
import { ReactComponent as UserIcon } from '../../../local/svg/login.svg';
import { ReactComponent as LogoutIcon } from '../../../local/svg/logout.svg';
import { logout } from '../../../api';


interface UserBlockProps {
  username: string;
  isLoginOpen?: (state: boolean) => void;
  setUsername?: (username: string) => void;
}

const UserBlock: React.FC<UserBlockProps> = ({ username, isLoginOpen, setUsername }) => {
  async function handleLogout() {    
    try {
      const response = await logout();
      if (response.status === 200 && setUsername) {
        setUsername('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    username ? (
      <div className="user-block">
        <UserButton to="/notifications" icon={<NotificationIcon />} />
        <UserButton to="/profile" icon={<UserIcon />} text={username} />
        <UserButton onClick={handleLogout} icon={<LogoutIcon />} />
      </div>
    ) : (
      <div className="user-block">
        <UserButton to="/notifications" icon={<NotificationIcon />} />
        {isLoginOpen && <UserButton onClick={() => isLoginOpen(true)} icon={<UserIcon />} />}
      </div>
    )
  );
};

export default UserBlock;