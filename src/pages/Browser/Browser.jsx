import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "../../components/Header";
import "./Browser.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import Modal from "react-bootstrap/Modal";

const Browser = () => {
  const { user } = useContext(Context);

  const pageTitle = "Browser";
  const [startDate, setStartDate] = useState(null);
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [group, setGroup] = useState("");
  const [groups, setGroups] = useState([]);

  // Fetch all activities

  useEffect(() => {
    const getActivities = async () => {
      const res = await axios.get(`/activities/${user._id}`);
      setAllActivities(res.data);
    };
    getActivities();
  }, [user._id]);

  // Fetch groups

  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get(`/groups/${user._id}`);
      setGroups(res.data);
    };
    getGroups();
  }, [groups, user._id]);

  // Filter by group and date

  useEffect(() => {
    let activityPool = allActivities.map((item) => item);
    let filterParameter;
    let filteredActivities;

    if (startDate !== null && group === "") filterParameter = "date";
    if (startDate === null && group !== "") filterParameter = "group";
    if (startDate !== null && group !== "") filterParameter = "dateGroup";
    if (startDate === null && group === "") filterParameter = "none";

    // console.log(filterParameter);

    switch (filterParameter) {
      case "date":
        // console.log("filtering date");
        filteredActivities = activityPool.filter(
          (item) => item.date === startDate.toDateString()
        );
        break;

      case "group":
        // console.log("filtering group");
        filteredActivities = activityPool.filter(
          (item) => item.group === group
        );
        break;

      case "dateGroup":
        // console.log("filtering date group");
        filteredActivities = activityPool.filter(
          (item) =>
            item.date === startDate.toDateString() && item.group === group
        );
        break;

      case "none":
        // console.log("filtering none");
        filteredActivities = activityPool.map((item) => item);
        break;

      default:
        return;
    }
    setActivities(filteredActivities);
  }, [allActivities, group, startDate, user._id]);

  // View activity modal window

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Header pageTitle={pageTitle} />

      <div className="browser_container">
        <div className="controls_container">
          <div className="control_module my-3" id="control_module_1">
            <div className="choose-date_container">
              <span className="date_label me-1 mb-1">Choose date:</span>
              <DatePicker
                isClearable
                placeholderText="none selected"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="control_module my-3 mb-2" id="control_module_2">
            <div className="filter-group_label mb-1">Filter group:</div>
            <Dropdown className="filter_group_dropdown w-100">
              <span className="chosen_group">{group ? group : "none"}</span>
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu
                align="end"
                style={{
                  width: "min(400px , 100%)",
                  maxHeight: "min(40vh, 12rem)",
                  overflowY: "scroll",
                }}
              >
                <Dropdown.Item onClick={() => setGroup("")}>none</Dropdown.Item>
                {groups.map((item) => (
                  <Dropdown.Item
                    key={item.name}
                    onClick={() => setGroup(item.name)}
                  >
                    {item.name}
                  </Dropdown.Item>
                ))}
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
            {activities.length !== 0 ? (
              activities.map((activity) => {
                return (
                  <tr
                    className="table_row"
                    key={"row" + activity._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedActivity(activity);
                      handleShow();
                    }}
                  >
                    <td key={activity.name}>{activity.name}</td>
                    <td key={activity.date}>{activity.date}</td>
                    <td key={activity.group}>
                      {activity.group ? activity.group : "none"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                <tr className="table_row">
                  <td>none</td>
                  <td>none</td>
                  <td>none</td>
                </tr>
              </>
            )}
          </tbody>
        </Table>

        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-body">
              {selectedActivity.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="text-black-50">View activity details?</h5>
          </Modal.Body>
          <Modal.Footer>
            <Link
              to={
                selectedActivity ? `/viewer/${selectedActivity._id}` : "/viewer"
              }
            >
              <Button variant="primary" className="me-1">
                Yes
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="ms-1"
              onClick={() => {
                handleClose();
                setSelectedActivity({});
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Browser;
