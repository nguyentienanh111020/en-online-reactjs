import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseLevel2({ image, name, description, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="chooseLevel"
      onClick={() => {
        navigate("/intermediatelevel/" + id);
      }}
    >
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p>{description}</p>
    </div>
  );
}

export default ChooseLevel2;
