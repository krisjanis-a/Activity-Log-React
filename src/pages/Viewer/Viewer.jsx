import React from "react";
import Header from "../../components/Header";
import "./Viewer.css";

const Viewer = () => {
  const pageTitle = "Activity Viewer";

  return (
    <div>
      <Header pageTitle={pageTitle} />

      <div className="info_row my-1">
        <span id="activity_name_label">Activity name:</span>
        <span className="data_field ms-1" id="activity_name"></span>
      </div>
      <div className="info_row my-1">
        <span id="group_label">Group:</span>
        <span className="data_field ms-1" id="group"></span>
      </div>
      <div className="info_row my-1">
        <span id="date_label">Date:</span>
        <span className="data_field ms-1" id="date"></span>
      </div>
      <div className="info_row my-1">
        <span id="duration_label">Duration:</span>
        <span className="data_field ms-1" id="duration"></span>
      </div>

      <h5>Commentary</h5>

      <textarea
        className="commentary_display w-100"
        id="commentary_text"
        readOnly={true}
        placeholder="No comments to display ..."
      ></textarea>
    </div>
  );
};

export default Viewer;
