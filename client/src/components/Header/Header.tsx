import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/drive_insight_logo.png";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="header-container">
      <div className="sub-header-container">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Drive Insight Logo" className="logo-image" />
          </Link>
        </div>
        <button
          className={`btn-menu ${isClicked ? "show" : ""}`}
          type="button"
          id="check"
          onClick={() => {
            handleClick();
          }}
        >
          <span className="burger-bars" />
        </button>
      </div>
      <nav className={`nav ${isClicked ? "show" : ""}`}>
        <Navigation handleClick={handleClick} />
      </nav>
    </div>
  );
}

export default Header;
