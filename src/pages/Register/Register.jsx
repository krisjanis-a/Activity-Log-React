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
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="register">
      <Header pageTitle={pageTitle} />
      <form className="register_form" onSubmit={handleSubmit}>
        <div className="form-group w-100">
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
        <div className="form-group w-100">
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
        <div className="form-group w-100">
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
        <Button type="submit" variant="primary" className="mt-2">
          Register
        </Button>
        {error && (
          <span className="registration_warning">Something went wrong!</span>
        )}
      </form>
    </div>
  );
};

export default Register;
