import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth, db, storage } from "../firebase-config";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResetPassword() {
  const [data, setData] = useState({});
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleResetEmail = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, data.email);
    console.log("Password reset email sent");
  };
  return (
    <div className="container" style={{ paddingBottom: "220px" }}>
      <Form onSubmit={handleResetEmail}>
        <h1>Reset Password</h1>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleInput}
          />
          <Form.Text className="text-muted">
            Please check the message in your email to change password
          </Form.Text>
          <br />
          <Form.Text className="text-muted">
            (Maybe is in your spam mail).
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
