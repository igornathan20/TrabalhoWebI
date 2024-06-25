import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { Home, Employees, Departments } from "./pages";
import "./css/global.css";

import { Navbar } from "./components";

function App() {
  return (
    <div id="app">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" Component={Home} />
          <Route path="/departments" Component={Departments} />
          <Route path="/employees" Component={Employees} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
