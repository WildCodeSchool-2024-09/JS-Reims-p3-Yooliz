import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ handleClick }: { handleClick: () => void }) {
  return (
    <nav className="nav-container" aria-label="Navigation principale">
      <Link
        onClick={handleClick}
        to="/moncomparatif"
        className="nav-link"
        aria-current={
          window.location.pathname === "/moncomparatif" ? "page" : undefined
        }
      >
        Mon comparatif
      </Link>
      <Link
        onClick={handleClick}
        to="/versdemain"
        className="nav-link"
        aria-current={
          window.location.pathname === "/versdemain" ? "page" : undefined
        }
      >
        Vers demain
      </Link>
      <Link
        onClick={handleClick}
        to="/contact"
        className="nav-link"
        aria-current={
          window.location.pathname === "/contact" ? "page" : undefined
        }
      >
        Contact
      </Link>
      <Link
        onClick={handleClick}
        to="/compte"
        className="nav-link"
        aria-current={
          window.location.pathname === "/compte" ? "page" : undefined
        }
      >
        Mon compte
      </Link>
    </nav>
  );
}

export default Navigation;
