import './Footer.css';

function Footer() {
const date = new Date().getFullYear()

    return (
        <footer className="footer">
            <p className="footer__copyright">© Developed by Jeremy House</p>
            <p className="footer__production-year">{date}</p>
        </footer>
    )
}

export default Footer;