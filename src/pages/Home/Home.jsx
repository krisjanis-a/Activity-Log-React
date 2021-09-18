import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <h1 className="text-center mb-4">Activity Log</h1>
        <div className="home_buttons">
          <Link to="/browser">
            <Button className="me-2">Browse Activities</Button>
          </Link>
          <Link to="/creator">
            <Button className="ms-2">Create Activity</Button>
          </Link>
        </div>
        <div className="home_buttons_login mt-4">
          <Link to="/login">
            <Button variant="secondary" className="my-1">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" className="my-1">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
