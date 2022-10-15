import React from "react";
import ChooseLevel from "../components/ChooseLevel";
import "./../components/Level.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function BeginnerLevel() {
  const [beginner, setBeginner] = useState([]);
  useEffect(() => {
    const getBeginner = async () => {
      const beginnerCollectionRef = collection(db, "beginner");
      const data = await getDocs(beginnerCollectionRef);
      setBeginner(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBeginner();
  }, []);
  return (
    <div className="level">
      <h1 className="levelTitle">Welcome to Beginner Course!</h1>
      <div className="levelList">
        {beginner.map((beginner, idx) => {
          return (
            <ChooseLevel
              key={idx}
              id={beginner.id}
              image={beginner.image}
              name={beginner.name}
              description={beginner.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BeginnerLevel;
