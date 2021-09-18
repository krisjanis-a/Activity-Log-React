import React from "react";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Login.css";

const Login = () => {
  const pageTitle = "Login";

  return (
    <div className="register">
      <Header pageTitle={pageTitle} />
      <form className="login_form">
        <div className="form-group w-100">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group w-100">
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
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
