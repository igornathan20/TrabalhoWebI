import React from 'react';
import './style.css';

function Card({ department, onEdit, onDelete }) {
  return (
    <div className="card-department">
      <div className="card-header">
        <div className="department-details">
          <h3>{department.name}</h3>
          <strong>Descrição</strong> 
          <p>{department.description}</p>
        </div>
      </div>
      <div className="card-actions">
        <button className="edit-button" onClick={() => onEdit(department.id)}>Editar</button>
        <button className="delete-button" onClick={() => onDelete(department.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default Card;
