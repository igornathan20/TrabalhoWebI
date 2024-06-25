import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { Home, Employees, Departments } from "./pages";
import api from "./services/api";
import "./css/global.css";

import { Navbar } from "./components";

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
   
    //   <aside>
    //   <strong>Cadastro de Departamento</strong>
    //     <DepartmentForm onSubmit={handleAddDepartment} />
    //     <strong>Cadastro de Funcionário</strong>
    //     <EmployeeForm onSubmit={handleAddEmployee} initialData={editEmployee} departments={departments}/>
    //   </aside>
      
    //   <main>
    //     <ul>
    //       {employeesList.map((employee) => (
    //         <EmployeeItem key={employee.id} employee={employee} onEdit={handleEditEmployee} onDelete={deleteEmployee}/>
    //       ))}
    //     </ul>
    //   </main>
    // 
    <div id="app">

        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/"  Component={Home}/>
              <Route path="/departments"  Component={Departments}/>
              <Route path="/employees" Component={Employees} />
             </Switch>
        </Router>
      </div>
    
  );
}

export default App;