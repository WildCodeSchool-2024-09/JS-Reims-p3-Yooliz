import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <header>
      <div className="header-mobile">
        <div className="header-logo">
          <h2>Insert Logo here</h2>
          <button
            type="button"
            className="menu-burger"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 200 200"
              className="menu-icon"
            >
              <title>Menu Icon</title>
              <g stroke-width="6.5" stroke-linecap="round">
                <path
                  d="M72 82.286h28.75"
                  fill="#009100"
                  fill-rule="evenodd"
                  stroke=" #000000"
                />

                <path
                  d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                  fill="none"
                  stroke=" #000000"
                />
                <path
                  d="M72 125.143h28.75"
                  fill="#009100"
                  fill-rule="evenodd"
                  stroke=" #000000"
                />
                <path
                  d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                  fill="none"
                  stroke=" #000000"
                />
                <path
                  d="M100.75 82.286h28.75"
                  fill="#009100"
                  fill-rule="evenodd"
                  stroke=" #000000"
                />
                <path
                  d="M100.75 125.143h28.75"
                  fill="#009100"
                  fill-rule="evenodd"
                  stroke=" #000000"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className={isClicked ? "navbar-mobile" : "none"}>
          <Link to="/compte" className="navbar-button-mobile">
            Compte
          </Link>
          <Link to="/info" className="navbar-button-mobile">
            Infos env.
          </Link>
          <Link to="/contact" className="navbar-button-mobile">
            Contact
          </Link>
        </div>
      </div>
      <div className="nav">
        <Link to="/contact">
          <button type="button" className="button-desktop">
            <p>Contact</p>
          </button>
        </Link>
        <Link to="/info">
          <button type="button" className="button-desktop">
            <p>Info</p>
          </button>
        </Link>
        <Link to="/comparer">
          <button type="button" className="button-desktop">
            <p>Comparer</p>
          </button>
        </Link>
        <Link to="/compte">
          <button type="button" className="button-desktop">
            <p>Compte</p>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
