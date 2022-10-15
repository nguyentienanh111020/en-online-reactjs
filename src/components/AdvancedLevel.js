import React from "react";
import ChooseLevel3 from "../components/ChooseLevel3";
import "./../components/Level.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function AdvancedLevel() {
  const [advanced, setAdvanced] = useState([]);
  useEffect(() => {
    const getAdvanced = async () => {
      const advancedCollectionRef = collection(db, "advanced");
      const data = await getDocs(advancedCollectionRef);
      setAdvanced(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAdvanced();
  }, []);
  return (
    <div className="level">
      <h1 className="levelTitle">Welcome to Advanced Course!</h1>
      <div className="levelList">
        {advanced.map((advanced, idx) => {
          return (
            <ChooseLevel3
              key={idx}
              id={advanced.id}
              image={advanced.image}
              name={advanced.name}
              description={advanced.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AdvancedLevel;
