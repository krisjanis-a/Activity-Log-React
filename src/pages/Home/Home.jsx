import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Home.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import background from "../../assets/title_image.jpg";

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const [showInfo, setShowInfo] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    if (showInfo) {
      window.addEventListener("click", toggleInfo);

      return () => {
        window.removeEventListener("click", toggleInfo);
      };
    }
  }, [showInfo]);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <div className="home">
        <div className="background_image_container">
          <img
            src={background}
            className="background_image"
            alt="Notes and Cup"
          />
        </div>
        <div className="home_contents">
          <h1 className="text-center mb-3">Activity Log</h1>
          {user ? (
            <div className="username_container">
              <span style={{ fontWeight: "100" }}>
                User: <span style={{ fontWeight: "400" }}>{user.username}</span>
              </span>
            </div>
          ) : (
            <></>
          )}
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
                <Button className="my-3">Manage Groups</Button>
              </Link>
              <Button
                className="mt-1 mb-3"
                variant="secondary"
                onClick={handleLogout}
              >
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
          <i
            className="home_icon info_icon fas fa-info-circle"
            onClick={toggleInfo}
            style={!user ? { left: "50%", transform: "translateX(-50%)" } : {}}
          ></i>
          {user ? (
            <Link to="/settings">
              <i className="home_icon settings_icon fas fa-cog"></i>
            </Link>
          ) : (
            <></>
          )}

          {showInfo ? (
            <>
              <div className="info_container">
                <h2>About</h2>
                <p>Welcome to Activity Log!</p>
                <p>
                  Take control of your time. Use this app to track your daily
                  tasks, exercise, studies or household chores - anything you
                  wish.
                </p>
                <p>
                  Create activities - assign name, duration, date and group.
                  This way you can save all the details for future and keep
                  track of everything you do in your daily life.
                </p>
                <p>
                  Use activity browser to find a specific entry by date or
                  group. View and edit the details if necessary.
                </p>
                <p>
                  Use group manager to add new or delete unnecessary groups.
                </p>
                <p> ---</p>
                <p>Stay disciplined and productive!</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
