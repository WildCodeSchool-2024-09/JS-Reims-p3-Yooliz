import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ handleClick }: { handleClick: () => void }) {
  return (
    <nav className="nav-container" aria-label="Navigation principale">
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
        to="/info"
        className="nav-link"
        aria-current={window.location.pathname === "/info" ? "page" : undefined}
      >
        Info
      </Link>
      <Link
        onClick={handleClick}
        to="/comparer"
        className="nav-link"
        aria-current={
          window.location.pathname === "/comparer" ? "page" : undefined
        }
      >
        Comparer
      </Link>
      <Link
        onClick={handleClick}
        to="/compte"
        className="nav-link"
        aria-current={
          window.location.pathname === "/compte" ? "page" : undefined
        }
      >
        Compte
      </Link>
    </nav>
  );
}

export default Navigation;
