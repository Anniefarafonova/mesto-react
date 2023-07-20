import imageLogo from '../../images/logo.svg'
import { Outlet } from 'react-router-dom';

export default function Header({ children }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={imageLogo}
        alt="Логотип"
      />
        <Outlet />
      {children}
    </header>
  )
}