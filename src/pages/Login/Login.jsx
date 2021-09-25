import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";

const Login = () => {
  const pageTitle = "Login";

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState();
  const [error, setError] = useState(false);

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
      if (
        err.response.data === "Wrong username!" ||
        err.response.data === "Wrong password!"
      ) {
        setErrorMessage(err.response.data);
      }
      setError(true);
      setTimeout(() => {
        setErrorMessage();
        setError(false);
      }, 5000);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <Header pageTitle={pageTitle} />
      <div className="login_container">
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="form-group w-100 my-2">
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
          <div className="form-group w-100 my-2">
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
            className="mt-3"
            disabled={isFetching}
          >
            Login
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

export default Login;
