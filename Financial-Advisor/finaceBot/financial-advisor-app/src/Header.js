import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src = {logo} alt = "logo" className="logo_icon" />

            <div className="links">
                <Link to="/home">HOME</Link>
                <Link to="/home">ABOUT</Link>
                <Link to="/home">CONTACT US</Link>
                <Link to="/advisor"><p className="logo">TRY ME!</p></Link>
            </div>
            
        </div>
    );
}

export default Header;