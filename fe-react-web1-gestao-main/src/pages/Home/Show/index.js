import { useState, useEffect } from "react";
import Card from "../components/Card";
import "./style.css";
import api from "../../../services/api";

function Show() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Erro ao buscar funcionários", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.log("Erro ao buscar departamentos", error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="show-home">
      <Card
        title="Departamentos cadastrados"
        count={departments.length}
        link="/departments"
      />
      <Card
        title="Funcionários cadastrados"
        count={employees.length}
        link="/employees"
      />
    </div>
  );
}

export default Show;
