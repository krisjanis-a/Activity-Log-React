import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./context/Context";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://activity-log-react.herokuapp.com/server/";
}

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
