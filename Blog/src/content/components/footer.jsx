import '../../App.css';
import { Link } from 'react-router-dom';
import { Register } from '../pages/Loginpage';

export function Footer() {
    return (
        <footer className="footer">
            
            <section className="footer-Content">
                <Link to= "register">
                <p>Jessica van der Zwaag</p>
                </Link>
                <p>Copyright</p>
            </section>

            <section className="footer-Content">
                <p>Instagram</p>
                <p>LinkedIn</p>
            </section>

        </footer>
    );
}
