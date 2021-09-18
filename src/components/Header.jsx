import React from "react";
import Button from "react-bootstrap/Button";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ pageTitle }) => {
  return (
    <div class="header">
      <div class="main_header_line"></div>

      <div className="header_content">
        <h1 className="me-5">{pageTitle}</h1>

        {pageTitle === "Activity Viewer" ? (
          <Link to="/browser">
            <Button variant="primary" className="ms-3 my-2 ms-1-5">
              Return to Browser
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button variant="primary" className="ms-3 my-2 ms-1-5">
              Return to Main Page
            </Button>
          </Link>
        )}
      </div>

      <div class="main_header_line"></div>
    </div>
  );
};

export default Header;
