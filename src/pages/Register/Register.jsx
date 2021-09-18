import React from "react";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Register.css";

const Register = () => {
  const pageTitle = "Register";

  return (
    <div className="register">
      <Header pageTitle={pageTitle} />
      <form className="register_form">
        <div class="form-group w-100">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
            required
          />
        </div>
        <div class="form-group w-100">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group w-100">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <Button type="submit" variant="primary" className="mt-2">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
