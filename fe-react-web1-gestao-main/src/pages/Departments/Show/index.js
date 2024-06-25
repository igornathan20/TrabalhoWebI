import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import api from "../../../services/api";
import DepartmentForm from "../components/DepartmentForm";

function Show() {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [deleteDepartment, setDeleteDepartment] = useState(null);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.log("Erro ao buscar departamentos", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleEdit = (id) => {
    const department = departments.find((dep) => dep.id === id);
    setEditDepartment(department);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(departments.filter((dep) => dep.id !== id));
      toast.success("Departamento deletado com sucesso!");
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("Não pode ser excluído pois existem funcionários cadastrados no departamento")) {
          toast.error("Não pode ser excluído pois existem funcionários cadastrados no departamento.");
        } else {
          toast.error("Erro ao deletar o departamento.");
        }
      } else {
        toast.error("Erro ao deletar o departamento.");
      }
    }
    setIsDeleteModalOpen(false);
  };
  

  const handleCreate = async (data) => {
    if (editDepartment !== null) {
      await api.put(`/departments/${editDepartment.id}`, data);
      setDepartments(
        departments.map((dep) =>
          dep.id === editDepartment.id ? { ...dep, ...data } : dep
        )
      );
      setEditDepartment(null);
      toast.success("Departamento atualizado com sucesso!");
    } else {
      await api.post("/departments", data);
      fetchDepartments();
      toast.success("Departamento cadastrado com sucesso!");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    toast.info("Operação cancelada.");
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    toast.info("Operação cancelada.");
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
    <div className="show-departments">
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        contentLabel="Department Form"
        style={customStyles}
      >
        <DepartmentForm
          onSubmit={handleCreate}
          initialData={editDepartment}
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
        <div className="department-confirmation">
          <h2>Tem certeza que deseja excluir o departamento</h2>
          <span>{deleteDepartment?.name}?</span>
          <span className="form-actions">
            <button className="cancel-button" onClick={handleDeleteCancel}>
              Cancelar
            </button>
            <button
              className="confirm-button"
              onClick={() => handleDelete(deleteDepartment?.id)}
            >
              Confirmar
            </button>
          </span>
        </div>
      </Modal>
      {departments.map((department) => {
        return (
          <Card
            key={department.id}
            department={department}
            onEdit={handleEdit}
            onDelete={() => {
              setDeleteDepartment(department);
              setIsDeleteModalOpen(true);
            }}
          />
        );
      })}
      <button
        className="add-department-button"
        onClick={() => {
          setEditDepartment(null);
          setIsModalOpen(true);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Show;
