import * as React from 'react';

// Types
import { IHeader } from '../../types/Layout';

// Styles
import './styles.css';

const Header: React.FC<IHeader> = ({ history, location, logout }: IHeader) => {
  const goTo = (path: string) => {
    history.push(path);
  };
  return (
    <header className="app-header">
      <span className="app-header--logo" onClick={() => { goTo('/') }}>logo</span>
      <nav className="app-header--nav">
        <span className={`app-header--nav__link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => { goTo('/profile') }}>Profile</span>
        <span className={`app-header--nav__link ${location.pathname === '/messages' ? 'active' : ''}`} onClick={() => { goTo('/messages') }}>Messages</span>
        <span className={`app-header--nav__link ${location.pathname === '/notifications' ? 'active' : ''}`} onClick={() => { goTo('/notifications') }}>Notifications</span>
        <span className="app-header--nav__link" onClick={logout}>Log Out</span>
      </nav>
    </header>
  )
};

export default Header;
