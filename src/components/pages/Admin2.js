import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import "../../App.css";
import "../Admin.css";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";

function Admin2() {
  const { dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [bgn, setBgn] = useState("");
  const [itm, setItm] = useState("");
  const [adv, setAdv] = useState("");
  const [user, setUser] = useState("");
  const [beginner, setBeginner] = useState("");
  const [intermediate, setIntermediate] = useState("");
  const [advanced, setAdvanced] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();

    onSnapshot(collection(db, "intermediate"), (snapshot) => {
      const intermediateLength = snapshot.docs.length;
      setItm(intermediateLength);
    });

    onSnapshot(collection(db, "beginner"), (snapshot) => {
      const length = snapshot.docs.length;
      setBgn(length);
    });

    onSnapshot(collection(db, "advanced"), (snapshot) => {
      const length = snapshot.docs.length;
      setAdv(length);
    });

    onSnapshot(collection(db, "users"), (snapshot) => {
      const length = snapshot.docs.length;
      setUser(length);
    });

    const q = query(collection(db, "users"), where("level", "==", "Beginner"));
    onSnapshot(q, (snapshot) => {
      const length = snapshot.docs.length;
      setBeginner(length);
    });

    const q2 = query(
      collection(db, "users"),
      where("level", "==", "Intermediate")
    );
    onSnapshot(q2, (snapshot) => {
      const length = snapshot.docs.length;
      setIntermediate(length);
    });

    const q3 = query(collection(db, "users"), where("level", "==", "Advanced"));
    onSnapshot(q3, (snapshot) => {
      const length = snapshot.docs.length;
      setAdvanced(length);
    });
  }, []);

  return (
    <div className="container" style={{ paddingBottom: "150px" }}>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <h1 id="admin-title">Statistic</h1>
        <div className="other-pages">
          <button
            className="logout"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Logout
          </button>
        </div>
        <br />

        <Accordion.Item eventKey="0">
          <Accordion.Header>Statistic </Accordion.Header>
          <Accordion.Body>
            <h4>Number of Beginner Lessons: {bgn}</h4>
            <h4>Number of Intermediate Lessons: {itm}</h4>
            <h4>Number of Advanced Lessons: {adv}</h4>
            <h4>Number of Users: {user}</h4>
            <h4>Number of Users who have Beginner Level: {beginner}</h4>
            <h4>Number of Users who have Intermediate Level: {intermediate}</h4>
            <h4>Number of Users who have Advanced Level: {advanced}</h4>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
export default Admin2;
