import { Link } from "react-router-dom";
import essensLogo from "../../assets/essens_logo_e.svg";


function Header({ onClearAnswers }) {
    return (
        <header className="site-header">
            <Link onClick={onClearAnswers} className="site-brand" to="/" aria-label="Essens home">
                <img src={essensLogo} alt="" />
                <span>ESSENS</span>
            </Link>
            <nav aria-label="Main navigation">
                <ul>
                    <li><Link onClick={onClearAnswers} to="/">Home</Link></li>
                    <li><a href="https://www.essens.cz/about_essens">About us</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header