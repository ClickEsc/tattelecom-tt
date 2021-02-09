import './Footer.css';

function Footer() {
  const today = new Date();
  const thisYear = today.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; { thisYear } Скубилина-Бурцева Ирина</p>
    </footer>
    );
  }
  
export default Footer;