import { useState, useEffect } from "react";
import api from "./services/api";

import "./css/global.css";
import "./css/app.css";
import "./css/sidebar.css";
import "./css/main.css";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeItem from "./components/EmployeeItem";
import DepartmentForm from "./components/DepartmentForm";

function App() {
  const [employeesList, setEmployeesList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployeesList(response.data);
      } catch (error) {
        console.log("Erro ao buscar funcionários", error);
      }
    };
    fetchEmployees();
  }, [employees]);

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

  async function handleAddEmployee(data) {
    if (editEmployee !== null) {          
      await api.put(`/employees/${editEmployee.id}`, data);
      setEmployees(employees.map(emp => (emp.id === editEmployee.id ? data : emp)));
      setEditEmployee(null);
    } else {
      const response = await api.post("/employees", data);
      setEmployees([...employees, response.data]);
    }
  }

  async function handleEditEmployee(employee) {
    setEditEmployee(employee);
  }

  async function deleteEmployee(employee) {
    try {
      await api.delete(`/employees/${employee.id}`);
      setEmployeesList(employeesList.filter(emp => emp.id !== employee.id));
    } catch (error) {
      console.log("Erro ao deletar funcionário", error);
    }
  }

  async function handleAddDepartment(data) {
    try {
      const response = await api.post("/departments", data);
      setDepartments([...departments, response.data]);
    } catch (error) {
      console.log("Erro ao adicionar departamento", error);
    }
  }

  return (
    <div id="app">
      <aside>
      <strong>Cadastro de Departamento</strong>
        <DepartmentForm onSubmit={handleAddDepartment} />
        <strong>Cadastro de Funcionário</strong>
        <EmployeeForm onSubmit={handleAddEmployee} initialData={editEmployee} departments={departments}/>
      </aside>
      
      <main>
        <ul>
          {employeesList.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} onEdit={handleEditEmployee} onDelete={deleteEmployee}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;