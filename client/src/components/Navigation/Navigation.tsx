import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="nav-container">
      <Link onClick={handleClick} to="/contact" className="navbar-button">
        Contact
      </Link>
      <Link onClick={handleClick} to="/info" className="navbar-button">
        Info
      </Link>
      <Link onClick={handleClick} to="/comparer" className="navbar-button">
        Comparer
      </Link>
      <Link onClick={handleClick} to="/compte" className="navbar-button">
        Compte
      </Link>
    </div>
  );
}

export default Navigation;
