import React from "react";
import { useState, useContext } from "react";
import "../../App.css";
import "../LogIn.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LogIn() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/home");
        // ...
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <Form onSubmit={handleLogin}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="btn-login">
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Login
          </Button>
          {error && <span>Wrong email or password</span>}
        </div>
        <div className="resetpassword">
          <a className="resetpassword" href="/resetpassword">
            Reset Password
          </a>
        </div>
        <hr />
        <div className="btn-createnew">
          <Button
            id="btn-createnew"
            variant="primary"
            type="button"
            style={{ marginBottom: "50px" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/createuser";
            }}
          >
            Create New Account
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default LogIn;
