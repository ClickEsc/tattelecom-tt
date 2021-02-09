import './Header.css';
import headerLogo from '../images/header__logo.png';

function Header() {
  return (
    <div className="header">
      <img className="header__logo" alt="Логотип в виде планшета с заданиями, отмеченными как выполненные" src={headerLogo} />
      <p className="header__title">Тестовое задание</p>
    </div>
  );
}

export default Header;