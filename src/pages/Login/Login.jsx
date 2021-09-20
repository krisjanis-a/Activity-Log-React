import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";

const Login = () => {
  const pageTitle = "Login";

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/Authentication/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="register">
      <Header pageTitle={pageTitle} />
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="form-group w-100">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            ref={userRef}
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
            ref={passwordRef}
            required
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isFetching}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
