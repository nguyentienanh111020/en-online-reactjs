import React from "react";
import Beginnner from "../img/img-1.jpg";
import Intermediate from "../img/img-2.jpg";
import Advanced from "../img/img-3.jpg";
import { Link } from "react-router-dom";
import "../../components/Level.css";

function Level() {
  return (
    <div className="level">
      <h1 className="levelTitle">Select Your Level!</h1>
      <div className="levelList">
        <Link to="/beginnerlevel" className="chooseLevel">
          <div style={{ backgroundImage: `url(${Beginnner})` }}> </div>
          <h1> Beginnner </h1>
          <p>Conversations with grammar points for beginners.</p>
        </Link>

        <Link to="/intermediatelevel" className="chooseLevel">
          <div style={{ backgroundImage: `url(${Intermediate})` }}> </div>
          <h1> Intermediate </h1>
          <p>Lessons that feature grammar for intermediate learners.</p>
        </Link>

        <Link to="/advancedlevel" className="chooseLevel">
          <div style={{ backgroundImage: `url(${Advanced})` }}> </div>
          <h1> Advanced </h1>
          <p>Hear naturally fast conversations with advanced vocabulary.</p>
        </Link>
      </div>
    </div>
  );
}

export default Level;
