import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "../../components/Header";
import "./Browser.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Browser = () => {
  const pageTitle = "Browser";
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <Header pageTitle={pageTitle} />

      <div className="controls_container">
        <div className="control_module my-1" id="control_module_1">
          <div className="choose-date_container">
            <span className="date_label me-1">Choose date:</span>
            <DatePicker
              isClearable
              placeholderText="none selected"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>

        <div className="control_module my-1 mb-2" id="control_module_2">
          <div className="filter-group_label">Filter group:</div>
          <Dropdown className="filter_group_dropdown">
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
      </div>

      <Table variant="dark" bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody className="table_body">
          <tr className="table_row">
            <td>none</td>
            <td>none</td>
            <td>none</td>
          </tr>
        </tbody>
      </Table>

      <div className="ativity_view_delete_buttons">
        <Link to="/viewer">
          <Button variant="primary" className="me-1">
            View activity details
          </Button>
        </Link>
        <Button variant="danger" className="ms-1">
          Delete activity
        </Button>
      </div>
    </div>
  );
};

export default Browser;
