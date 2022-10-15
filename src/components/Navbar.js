import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";
import { createContext, useReducer } from "react";
import AuthReducer from "./context/AuthReducer";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
  };

  const AuthContext1 = createContext(INITIAL_STATE);
  const { currentUser } = useContext(AuthContext1);
  const { dispatch } = useContext(AuthContext);
  useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  let user = JSON.parse(localStorage.getItem("user"));
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          EnOnline
          <i className="fa-solid fa-graduation-cap"></i>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/levels" className="nav-links" onClick={closeMobileMenu}>
              Levels
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dictionary"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Dictionary
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/quizmenu"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Vocabulary
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            {currentUser && user.uid === "XVKzJtN6E2U9SeszT3BNuyqtFtp1" && (
              <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
                Admin
              </Link>
            )}
            {currentUser && user.uid === "r3TgvPIIWcPx0JlUieHh4Nr1jnA3" && (
              <Link
                to="/beginneradmin"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            )}
            {currentUser && user.uid === "l7ZBNjqEQDck9DNH1o9NO4lz8Xg1" && (
              <Link
                to="/intermediateadmin"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            )}
            {currentUser && user.uid === "SWAIVNzjZ7T3ZPKRJtwbIojKULB2" && (
              <Link
                to="/advancedadmin"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            )}
            {currentUser && user.uid === "rylZO9eBNgdJExxHm9bw0ser89J2" && (
              <Link
                to="/contactadmin"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            )}
          </li>
          <li className="nav-item">
            {currentUser && (
              <Link
                to="/profile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            )}
          </li>
          <li>
            {!currentUser && (
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                {button && <Button buttonStyle="btn--outline">LOGIN</Button>}
              </Link>
            )}
            {currentUser && (
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                {button && <Button buttonStyle="btn--outline">LOGOUT</Button>}
              </Link>
            )}
          </li>
        </ul>
        {currentUser && button && (
          <button
            style={{ marginBottom: "15px", padding: "10px 10px 10px 10px" }}
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              refreshPage();
            }}
          >
            LOGOUT
          </button>
        )}
        {!currentUser && button && (
          <Button buttonStyle="btn--outline">LOGIN</Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
