import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "./Button";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/home" className="social-logo">
              EnOnline <i class="fa-solid fa-graduation-cap"></i>
            </Link>
          </div>
          <small className="website-rights">© EnOnline, Inc.</small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/home"
              target="_blank"
              arial-label="facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/home"
              target="_blank"
              arial-label="youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/home"
              target="_blank"
              arial-label="twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
