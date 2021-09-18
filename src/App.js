import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Browser from "./pages/Browser/Browser";
import Viewer from "./pages/Viewer/Viewer";
import Creator from "./pages/Creator/Creator";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/browser">
            <Browser />
          </Route>
          <Route path="/creator">
            <Creator />
          </Route>
          <Route path="/viewer">
            <Viewer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
