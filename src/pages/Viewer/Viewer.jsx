import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import "./Viewer.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";

const Viewer = () => {
  const { user } = useContext(Context);
  const pageTitle = "Activity Viewer";
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [editMode, setEditMode] = useState(false);
  const [savedGroups, setSavedGroups] = useState([]);

  // const [activity, setActivity] = useState({});
  const [activityId, setActivityId] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [commentary, setCommentary] = useState("");
  const [previousData, setPreviousData] = useState([
    name,
    group,
    date,
    duration,
    commentary,
  ]);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [startDate, setStartDate] = useState(new Date());

  // Fetch activity details

  useEffect(() => {
    const getActivity = async () => {
      const res = await axios.get(`/activities/${user._id}/${path}`);
      // setActivity(res.data);
      setActivityId(res.data._id);
      setName(res.data.name);
      setGroup(res.data.group);
      setDate(res.data.date);
      setDuration(res.data.duration);
      setCommentary(res.data.commentary);
    };
    getActivity();
  }, [user._id, path]);

  // Fetch groups

  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get(`/groups/${user._id}`);
      setSavedGroups(res.data);
    };
    getGroups();
  }, [group, user._id]);

  // Date & Delete activity modal window

  const [showModalDel, setShowModalDel] = useState(false);

  const handleCloseDel = () => setShowModalDel(false);
  const handleShowDel = () => setShowModalDel(true);

  const [showModalDate, setShowModalDate] = useState(false);

  const handleCloseDate = () => setShowModalDate(false);
  const handleShowDate = () => setShowModalDate(true);

  // Delete activity

  const deleteActivity = async () => {
    try {
      await axios.delete(`/activities/${activityId}`, {
        data: { userId: user._id },
      });
      window.location.replace("/browser");
    } catch (err) {}
  };

  // Save activity changes

  const saveChanges = async () => {
    setErrorMessage("");

    if (name !== "" && /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/.test(duration)) {
      const updatedActivity = {
        username: user.username,
        userId: user._id,
        name: name,
        date: date,
        duration: duration,
        commentary: commentary,
        group: group,
      };

      try {
        await axios.put(`/activities/${activityId}`, updatedActivity);
        setEditMode(false);
        showSuccessMessage();
      } catch (err) {}
    } else {
      if (name === "") {
        setErrorMessage("Please enter activity name");
      }
      if (/[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/.test(duration) === false) {
        setErrorMessage("Duration must be in format HH:MM:SS");
      }
    }
  };

  // Show success message

  const showSuccessMessage = () => {
    setSuccessMessage("Activity updated successfully");
    setTimeout(() => {
      setSuccessMessage();
    }, 5000);
  };

  return (
    <div>
      <Header pageTitle={pageTitle} />
      <div className="viewer_wrapper">
        <div className="viewer_container">
          {editMode ? (
            <div
              className="my-3 w-100"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                id="activity_name_label"
                className="fw-bold"
                style={{ whiteSpace: "nowrap" }}
              >
                Activity name:
              </span>
              <input
                id="activity-name"
                className="activity_name_input ms-2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          ) : (
            <div className="my-3">
              <span className="fw-bold">Activity name:</span>
              <span className="data_field ms-2" id="activity_name">
                {name}
              </span>
            </div>
          )}

          {editMode ? (
            <div
              className="my-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="fw-bold">Group:</span>
              <Dropdown
                className="filter_group_dropdown ms-2"
                style={{ width: "min(100% , 300px)" }}
              >
                <span className="chosen_group">{group ? group : "none"}</span>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                ></Dropdown.Toggle>

                <Dropdown.Menu
                  align="end"
                  style={{
                    width: "min(100% , 300px)",
                    maxHeight: "min(40vh, 12rem)",
                    overflowY: "scroll",
                  }}
                >
                  <Dropdown.Item onClick={() => setGroup("")}>
                    none
                  </Dropdown.Item>
                  {savedGroups.map((item) => (
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
          ) : (
            <div className="my-3">
              <span className="fw-bold">Group:</span>
              <span className="data_field ms-2" id="group">
                {group ? group : "none"}
              </span>
            </div>
          )}

          {editMode ? (
            <div
              className="my-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="fw-bold">Date:</span>
              <span className="data_field ms-2" id="date">
                {date}
              </span>
              <Button className="ms-2" onClick={handleShowDate}>
                Edit
              </Button>
            </div>
          ) : (
            <div className="my-3">
              <span className="fw-bold">Date:</span>
              <span className="data_field ms-2" id="date">
                {date}
              </span>
            </div>
          )}

          {editMode ? (
            <div className="my-3">
              <span className="fw-bold">Duration:</span>
              <input
                id="activity-name"
                className="ms-2"
                maxLength="8"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </div>
          ) : (
            <div className="my-3">
              <span className="fw-bold">Duration:</span>
              <span className="data_field ms-2" id="duration">
                {duration}
              </span>
            </div>
          )}

          <hr></hr>

          <h5>Commentary</h5>

          {editMode ? (
            <textarea
              className="commentary_display w-100"
              id="commentary_text"
              readOnly={false}
              value={commentary}
              onChange={(e) => {
                setCommentary(e.target.value);
              }}
            ></textarea>
          ) : (
            <textarea
              className="commentary_display w-100"
              readOnly={true}
              value={
                commentary !== "" ? commentary : "No comments to display..."
              }
            ></textarea>
          )}

          <div className="viewer_buttons">
            {editMode ? (
              <div>
                <Button
                  variant="primary"
                  className="me-1"
                  onClick={() => {
                    saveChanges();
                  }}
                >
                  Save
                </Button>

                <Button
                  variant="secondary"
                  className="ms-1"
                  onClick={() => {
                    setEditMode(false);
                    setName(previousData[0]);
                    setGroup(previousData[1]);
                    setDate(previousData[2]);
                    setDuration(previousData[3]);
                    setCommentary(previousData[4]);
                    setStartDate(new Date());
                    setErrorMessage();
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="me-1"
                  onClick={() => {
                    setEditMode(true);
                    setPreviousData([name, group, date, duration, commentary]);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  className="ms-1"
                  onClick={handleShowDel}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
          <p
            className="mt-2 w-100"
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </p>
          <p
            className="mt-2 w-100 fw-bold"
            style={{
              color: "green",
              textAlign: "center",
            }}
          >
            {successMessage}
          </p>
          <Modal
            show={showModalDel}
            onHide={handleCloseDel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
              <Modal.Title className="text-body">
                Confirm delete activity
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="w-100"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="danger"
                className="me-2"
                onClick={() => {
                  deleteActivity();
                  handleCloseDel();
                }}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={handleCloseDel}
              >
                Cancel
              </Button>
            </Modal.Body>
          </Modal>
          <Modal
            show={showModalDate}
            onHide={handleCloseDate}
            backdrop="static"
            keyboard={false}
            centered={true}
          >
            <Modal.Body
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p
                className=" mb-0 me-2 text-body"
                style={{ whiteSpace: "nowrap" }}
              >
                Select date:
              </p>
              <DatePicker
                isClearable
                placeholderText="none selected"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Modal.Body>
            <Modal.Footer
              className="w-100"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="primary"
                className="me-2"
                disabled={!startDate}
                onClick={() => {
                  handleCloseDate();
                  setDate(startDate.toDateString());
                }}
              >
                Accept
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={handleCloseDate}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
