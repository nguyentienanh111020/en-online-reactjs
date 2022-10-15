import React from "react";
import ChooseLevel2 from "../components/ChooseLevel2";
import "./../components/Level.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function IntermediateLevel() {
  const [intermediate, setIntermediate] = useState([]);
  useEffect(() => {
    const getIntermediate = async () => {
      const intermediateCollectionRef = collection(db, "intermediate");
      const data = await getDocs(intermediateCollectionRef);
      setIntermediate(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getIntermediate();
  }, []);
  return (
    <div className="level">
      <h1 className="levelTitle">Welcome to Intermediate Course!</h1>
      <div className="levelList">
        {intermediate.map((intermediate, idx) => {
          return (
            <ChooseLevel2
              key={idx}
              id={intermediate.id}
              image={intermediate.image}
              name={intermediate.name}
              description={intermediate.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default IntermediateLevel;
