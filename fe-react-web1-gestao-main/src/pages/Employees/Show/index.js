import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "react-modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import api from "../../../services/api";

function Show() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log("Erro ao buscar funcionários", error);
    }
  };

  useEffect(() => {
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

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setEditEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast.success('Funcionário deletado com sucesso!');
    } catch (error) {
      console.log("Erro ao deletar funcionário", error);
      toast.error('Erro ao deletar funcionário.');
    }
    setIsDeleteModalOpen(false);
  };

  const handleCreate = async (data) => {
    if (editEmployee !== null) {
      await api.put(`/employees/${editEmployee.id}`, data);
      setEmployees(
        employees.map((emp) =>
          emp.id === editEmployee.id ? { ...emp, ...data } : emp
        )
      );
      setEditEmployee(null);
      toast.success('Funcionário atualizado com sucesso!');
    } else {
      await api.post("/employees", data);
      fetchEmployees();
      toast.success('Funcionário cadastrado com sucesso!');
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    toast.info('Operação cancelada.');
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    toast.info('Operação cancelada.');
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "400px",
      borderRadius: "25px",
    },
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <div className="show-employees">
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        contentLabel="Employee Form"
        style={customStyles}
      >
        <EmployeeForm
          onSubmit={handleCreate}
          initialData={editEmployee}
          departments={departments}
          onCancel={handleCancel}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleDeleteCancel}
        contentLabel="Delete Confirmation"
        style={customStyles}
      >
        <div className="employee-confirmation">
          <h2>Tem certeza que deseja excluir o funcionário </h2>
          <span>{deleteEmployee?.name}?</span>
          <span className="form-actions">
            <button className="cancel-button" onClick={handleDeleteCancel}>Cancelar</button>
            <button className="confirm-button" onClick={() => handleDelete(deleteEmployee?.id)}>Confirmar</button>
          </span>
        </div>
      </Modal>
      {employees.map((employee) => {
        const formattedSalary = employee.salary.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const formattedHireDate = new Date(
          employee.hireDate
        ).toLocaleDateString("pt-BR");

        return (
          <Card
            key={employee.id}
            employee={employee}
            formattedSalary={formattedSalary}
            formattedHireDate={formattedHireDate}
            onEdit={handleEdit}
            onDelete={() => { setDeleteEmployee(employee); setIsDeleteModalOpen(true); }}
          />
        );
      })}
      <button 
        className="add-employee-button"
        onClick={() => {
          setEditEmployee(null);
          setIsModalOpen(true);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Show;
