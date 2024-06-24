import { format } from "date-fns";
import { useState} from "react";
import Modal from "react-modal";
import "../../css/stylesEmployeeItem.css";

Modal.setAppElement("#root");

const formatSalary = (salary) => {
  return salary.replace(".", ",");
};

export default function EmployeeItem({ employee, onEdit, onDelete }) {
  const formattedSalary = formatSalary(employee.salary);
  const formattedHireDate = format(new Date(employee.hireDate), "dd/MM/yyyy");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  function deleteEmployee(){
    onDelete(employee);
    closeModal();
  }
  
  return (
    <>
      <li className="employee-item">
        <header>
          <div className="employees-info">
            <div className="name-icons">
              <strong>{employee.name}</strong>
              <span className="icon-buttons">
                <i className="fas fa-edit" onClick={() => onEdit(employee)}></i>
                <i className="fas fa-trash-alt" onClick={openModal}></i>
              </span>
            </div>
            <span className="title">{employee.position}</span>
          </div>
        </header>
        <div>
          <p>E-mail: {employee.email}</p>
          <p>Remuneração: R$ {formattedSalary}</p>
          <p>Data Contratação: {formattedHireDate}</p>
          <p>Departamento: {employee.department_name}</p>
        </div>
      </li>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-excluir"
      >
        <h2>Deseja excluir o funcionário?</h2>
        <hr></hr>
        <hr/>
        <div>
          <table>
            <td>
            <p> <strong>Nome:</strong> {employee.name}</p>
            <p><strong>E-mail:</strong> {employee.email}</p>
            <p><strong>Departamento:</strong> {employee.department_name}</p>
            </td>
          </table>
        </div>
        <div>
          <button onClick={closeModal}>Cancelar</button>
          <button onClick={() => deleteEmployee()}>Excluir</button>
        </div>
        
      </Modal>
    </>
  );
}

    