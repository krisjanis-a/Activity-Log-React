import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Settings.css";
import { Context } from "../../context/Context";

const Settings = () => {
  const pageTitle = "Settings";

  const { user, dispatch } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
    };

    if (username.length !== 0) {
      updatedUser.username = username;
    }
    if (email.length !== 0) {
      updatedUser.email = email;
    }
    if (password.length !== 0) {
      updatedUser.password = password;
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      console.log(res);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      if (err.response.status === 512) {
        setErrorMessage("Username / Email already exists!");
      }
      setError(true);
      setTimeout(() => {
        setErrorMessage();
        setError(false);
      }, 5000);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <Header pageTitle={pageTitle} />
      <div className="settings_container">
        <form className="settings_form" onSubmit={handleSubmit}>
          <p style={{ textAlign: "center" }}>
            Fill in only the fields you wish to change!
          </p>
          <div className="form-group my-2 w-100">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group my-2 w-100">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group my-2 w-100">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" className="mt-3">
            Update
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

export default Settings;
