import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Home.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Home = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="home">
        <h1 className="text-center mb-4">Activity Log</h1>
        {user ? (
          <>
            <div className="home_buttons">
              <Link to="/browser">
                <Button className="me-2">Browse Activities</Button>
              </Link>
              <Link to="/creator">
                <Button className="ms-2">Create Activity</Button>
              </Link>
            </div>
            <Link to="/groups">
              <Button className="mt-3">Manage Groups</Button>
            </Link>
            <Button className="mt-3" variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <div className="home_buttons_login mt-2">
            <Link to="/login">
              <Button variant="primary" className="my-1">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" className="my-1">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
