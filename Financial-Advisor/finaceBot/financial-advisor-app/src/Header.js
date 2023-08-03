import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <h1 className="logo"> Kira</h1>
            <div className="links">
                <Link to="/home">Home</Link>
               
                <Link to="/advisor">Try Me</Link>
            </div>
        </div>
    );
}

export default Header;