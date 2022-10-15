import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { db } from "../firebase-config";
import { doc, addDoc, serverTimestamp, collection } from "firebase/firestore";

function Contact() {
  const [data, setData] = useState("");
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value.replace(/\n/g, "\\n");

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "contact"), {
      ...data,
      timeStamp: serverTimestamp(),
    });
    alert("Your message has been sent");
  };

  return (
    <div className="container" style={{ marginBottom: "30px" }}>
      <Form onSubmit={handleAdd} style={{ width: "700px" }}>
        <h1>Contact Page</h1>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="input" onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="input" onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" onChange={handleInput} required />
        </Form.Group>
        <Form.Group className="mb-3" type="input" controlId="message">
          <Form.Label>
            Please leave your message below. Thanks for taking the time to
            write.
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Contact;
