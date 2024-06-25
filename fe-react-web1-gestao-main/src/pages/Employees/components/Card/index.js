import React from 'react';
import './style.css';

function Card({ employee, formattedSalary, formattedHireDate, onEdit, onDelete }) {
  return (
    <div className="card-employee">
      <div className="card-header">
        <div className="employee-details">
          <h3>{employee.name}</h3>
          <strong>E-mail:</strong> 
          <p>{employee.email}</p>
          <strong>Remuneração:</strong> 
          <p>R$ {formattedSalary}</p>
          <strong>Data Contratação:</strong>
          <p> {formattedHireDate}</p>
          <strong>Departamento:</strong>
          <p> {employee.department_name}</p>
        </div>
      </div>
      <div className="card-actions">
        <button className="edit-button" onClick={() => onEdit(employee.id)}>Editar</button>
        <button className="delete-button" onClick={() => onDelete(employee.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default Card;
