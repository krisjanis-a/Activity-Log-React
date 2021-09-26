import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Context } from "../../context/Context";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./Groups.css";

const Groups = () => {
  const pageTitle = "Groups";

  const { user } = useContext(Context);
  const [group, setGroup] = useState("");
  const [savedGroups, setSavedGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [newGroupName, setNewGroupName] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setErrorMessage();
  }, [group]);

  // Fetch groups

  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.get(`/groups/${user._id}`);
      setSavedGroups(res.data);
    };
    getGroups();
  }, [group, savedGroups, user._id]);

  // Create & Delete group modal window

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showModalDel, setShowModalDel] = useState(false);

  const handleCloseDel = () => setShowModalDel(false);
  const handleShowDel = () => setShowModalDel(true);

  // Save new group

  const saveGroup = async () => {
    const existingGroups = savedGroups.map((group) => group.name);
    const newGroupName = document.querySelector("#new_group").value;

    if (!existingGroups.includes(newGroupName)) {
      try {
        let newGroup = { name: newGroupName, userId: user._id };
        await axios.post("/groups", newGroup);
        setGroup(newGroupName);
      } catch (err) {}
    } else {
      setErrorMessage("Group already exists");
    }
    handleClose();
  };

  // Delete group

  const deleteGroup = async () => {
    const res = await axios.get(`/groups/${user._id}`);
    let delGroup = res.data.filter((item) => item.name === group);
    delGroup = delGroup[0];

    let validated = true;

    activities.forEach((activity) => {
      if (activity.group === group) {
        validated = false;
      }
    });

    if (validated) {
      try {
        await axios.delete(`/groups/${delGroup._id}`, {
          data: { userId: user._id },
        });
      } catch (err) {}
      setGroup("");
    } else {
      setErrorMessage("Existing activities contain this group - cannot delete");
    }
  };

  // Fetch all activities

  useEffect(() => {
    const getActivities = async () => {
      const res = await axios.get(`/activities/${user._id}`);
      setActivities(res.data);
      // console.log(res.data);
    };
    getActivities();
  }, [user._id]);

  return (
    <div>
      <Header pageTitle={pageTitle} />
      <div className="groups_container">
        <div className="choose-group_container">
          <span className="choose-group_label mb-2">Choose group:</span>
          <Dropdown className="filter_group_dropdown w-100">
            <span className="chosen_group w-100">{group ? group : "none"}</span>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu
              className="w-100"
              align="end"
              style={{ maxHeight: "40vh", overflowY: "scroll" }}
            >
              <Dropdown.Item onClick={() => setGroup("")}>none</Dropdown.Item>
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

        <div className="buttons_container">
          <div className="create_delete_group my-3">
            <Button variant="primary" className="me-2" onClick={handleShow}>
              Create group
            </Button>
            <Modal
              show={showModal}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title className="text-body">
                  Enter Group Name
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  id="new_group"
                  placeholder="Group Name"
                  className="w-100"
                  maxLength="20"
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    saveGroup();
                    setNewGroupName("");
                  }}
                  disabled={newGroupName === ""}
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClose();
                    setNewGroupName("");
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              variant="danger"
              className="ms-2"
              disabled={group === ""}
              onClick={handleShowDel}
            >
              Delete group
            </Button>
            <Modal
              show={showModalDel}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Modal.Title className="text-body">
                  Confirm delete group
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
                    deleteGroup();
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
          </div>
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
      </div>
    </div>
  );
};

export default Groups;
