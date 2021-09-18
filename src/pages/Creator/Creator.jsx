import React, { useState } from "react";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import "./Creator.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";

const Creator = () => {
  const pageTitle = "Creator";
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <Header pageTitle={pageTitle} />

      <div className="timer_control_container my-3">
        <div className="activity_duration mb-2">
          Activity duration: 00:00:00
        </div>
        <div className="timer_control_buttons">
          <Button variant="primary" className="me-1">
            Start / Stop Timer
          </Button>
          <Button variant="primary" className="ms-1">
            Reset Timer
          </Button>
        </div>
      </div>

      <div className="manual_duration_container">
        <div className="duration_entry_container my-3">
          <label
            for="duration_entry_field"
            className="duration_entry_label me-1"
          >
            Enter duration manually:
          </label>

          <div className="duration_entry_field_container">
            <input
              type="text"
              name="duration"
              id="duration_entry_field"
              maxlength="8"
              rows="1"
            ></input>
          </div>
        </div>

        <div className="duration_checkbox_container">
          <input className="me-1" id="duration_checkbox" type="checkbox" />
          <label for="duration_checkbox">- use manually entered value</label>
        </div>
      </div>

      <div className="activity_setup_container">
        <div className="date_name_container">
          <div className="name_container my-3">
            <label for="name_field" className="name_label me-2">
              Activity name:
            </label>

            <div className="name_field_container">
              <input
                type="text"
                name="activity_name"
                id="name_field"
                rows="1"
              ></input>
            </div>
          </div>

          <div className="choose-date_container">
            <div className="date_label me-2">Date:</div>
            <DatePicker
              isClearable
              placeholderText="none selected"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>

        <div className="commentary_container mt-2">
          <h5>Commentary</h5>
          <textarea
            className="commentary_display w-100"
            resize="none"
            id="commentary_text"
            placeholder="Enter comments ..."
          ></textarea>
        </div>

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
        <Button variant="success" className="w-50">
          Save activity
        </Button>
      </div>
    </div>
  );
};

export default Creator;
