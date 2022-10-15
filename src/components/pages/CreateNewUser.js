import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth, db, storage } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function CreateNewUser() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
        beginner: [],
        intermediate: [],
        advanced: [],
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <Form onSubmit={handleAdd}>
        <h1>Create New Account</h1>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Full Name</Form.Label>
          <Form.Control onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={handleInput} required />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ marginBottom: "20px" }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateNewUser;
