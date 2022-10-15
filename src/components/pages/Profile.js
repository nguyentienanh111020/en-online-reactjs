import React from "react";
import "../Profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Profile() {
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  const [userpro5, setUserpro5] = useState("");
  const [beginner, setBeginner] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const [advanced, setAdvanced] = useState([]);
  const [created, setCreated] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef).then((doc) => {
      const newData = doc.data();
      setUserpro5(newData);
      console.log(newData);
    });

    const questRef0 = doc(db, "users", user.uid);
    getDoc(questRef0).then((doc) => {
      const newData = doc.data();
      setCreated(Object(newData.timeStamp));
    });

    const questRef = doc(db, "users", user.uid);
    getDoc(questRef).then((doc) => {
      const newData = doc.data();
      setBeginner(Object(newData.beginner));
    });

    const questRef2 = doc(db, "users", user.uid);
    getDoc(questRef2).then((doc) => {
      const newData = doc.data();
      setIntermediate(Object(newData.intermediate));
    });

    const questRef3 = doc(db, "users", user.uid);
    getDoc(questRef3).then((doc) => {
      const newData = doc.data();
      setAdvanced(Object(newData.advanced));
    });
  }, []);

  const [data, setData] = useState("");
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value.replace(/\n/g, "\\n");

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "users", user.uid), {
      ...data,
    });
    alert("Data updated successfully!");
  };

  const fireBaseTime = new Date(
    created.seconds * 1000 + created.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();
  return (
    <div className="profile-container">
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
        style={{ paddingTop: "40px" }}
      >
        <Tab eventKey="profile" title="Profile">
          <ListGroup style={{ width: "100%", textAlign: "center" }}>
            <ListGroup.Item>
              <h3>Name: {userpro5.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Email: {userpro5.email}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Phone Number: {userpro5.phone}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Country: {userpro5.country}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>
                Started: {date}, {atTime}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Level: {userpro5.level}</h3>
              <button onClick={() => navigate("/leveltest")}>
                Check your level
              </button>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Lessons have been learned.</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Beginner</th>
                    <th>Intermediate</th>
                    <th>Advanced</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {beginner.map((doc, idx) => {
                        return <li>{doc}</li>;
                      })}
                    </td>
                    <td>
                      {intermediate.map((doc, idx) => {
                        return <li>{doc}</li>;
                      })}
                    </td>
                    <td>
                      {advanced.map((doc, idx) => {
                        return <li>{doc}</li>;
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </ListGroup.Item>
          </ListGroup>
        </Tab>
        <Tab eventKey="longer-tab" title="Change Profile">
          <Form onSubmit={handleAdd} style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label style={{ color: "black" }}>Name</Form.Label>
              <Form.Control type="name" onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label style={{ color: "black" }}>Country</Form.Label>
              <Form.Control type="country" onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label style={{ color: "black" }}>Phone Number</Form.Label>
              <Form.Control type="phone" onChange={handleInput} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginBottom: "50px" }}
            >
              Submit
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Profile;
