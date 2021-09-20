import React from "react";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const Groups = () => {
  const pageTitle = "Groups";

  return (
    <div>
      <Header pageTitle={pageTitle} />
      <div className="choose-group_container">
        <span className="choose-group_label">Choose group:</span>
        <Dropdown className="filter_group_dropdown w-100">
          <span className="chosen_group">none</span>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item>none</Dropdown.Item>
            <Dropdown.Item>Group 1</Dropdown.Item>
            <Dropdown.Item>Group 2</Dropdown.Item>
            <Dropdown.Item>Group 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="buttons_container">
        <div className="create_delete_group my-3">
          <Button variant="primary" className="me-2">
            Create group
          </Button>
          <Button variant="danger" className="ms-2">
            Delete group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Groups;
