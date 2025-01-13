import "./Footer.css";
import { Link } from "react-router-dom";
import github from "../../assets/icons/github.png";
import instagram from "../../assets/icons/instagram.png";
import linkdn from "../../assets/icons/linkedin.png";
import web from "../../assets/icons/web.png";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-link-container">
          <Link to="/catalouge" className="footer-link">
            Catalogue
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/info" className="footer-link">
            Info environnement
          </Link>
          <Link to="/about-us" className="footer-link">
            Qui sommes-nous ?
          </Link>
          <Link to="/termes" className="footer-link">
            Termes
          </Link>
        </div>
        <div className="footer-icon-container">
          <a href="https://www.instagram.com/yooliz_france/">
            <img src={instagram} alt="insta" className="footer-icon" />
          </a>
          <a href="https://www.linkedin.com/company/yooliz/">
            <img src={linkdn} alt="linkdn" className="footer-icon" />
          </a>
          <a href="https://github.com/login">
            <img src={github} alt="github" className="footer-icon" />
          </a>
          <a href="https://www.yooliz.com/">
            <img src={web} alt="website" className="footer-icon" />
          </a>
        </div>
        <p className="footer-copyright">
          &copy; 2025 SparkJam, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
