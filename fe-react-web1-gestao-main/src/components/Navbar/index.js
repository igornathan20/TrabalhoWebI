import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <span>Gestão de Pessoas</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/employees"
            className={location.pathname === "/employees" ? "active" : ""}
          >
            Funcionários
          </Link>
        </li>
        <li>
          <Link
            to="/departments"
            className={location.pathname === "/departments" ? "active" : ""}
          >
            Departamentos
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
