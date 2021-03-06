import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Register.css";

const Register = () => {
  const pageTitle = "Register";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/Authentication/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      if (err.response.status === 512) {
        setErrorMessage("Username already exists!");
      }
      setError(true);
      setTimeout(() => {
        setErrorMessage();
        setError(false);
      }, 5000);
    }
  };

  return (
    <div className="register">
      <Header pageTitle={pageTitle} />
      <div className="register_container">
        <form className="register_form" onSubmit={handleSubmit}>
          <div className="form-group my-2 w-100">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group my-2 w-100">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group my-2 w-100">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary" className="mt-3">
            Register
          </Button>
          {error && (
            <span className="registration_warning mt-2 text-danger">
              {errorMessage ? errorMessage : "Something went wrong!"}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
