import { useState, useEffect } from "react";
import './style.css';

function DepartmentForm({ onSubmit, onCancel, initialData }) {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const isFormValid = departmentName && departmentDescription;

  useEffect(() => {
    if (initialData) {
      setDepartmentName(initialData.name);
      setDepartmentDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      name: departmentName,
      description: departmentDescription,
    });
    setDepartmentName("");
    setDepartmentDescription("");
  };

  return (
    <form className="department-form" onSubmit={handleSubmit}>
      <h2>Adicionar Departamento</h2>
      <div className="input-block">
        <label htmlFor="department_name">Nome do Departamento</label>
        <input
          type="text"
          name="department_name"
          id="department_name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="department_description">Descrição</label>
        <input
          type="text"
          name="department_description"
          id="department_description"
          value={departmentDescription}
          onChange={(e) => setDepartmentDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="confirm-button" disabled={!isFormValid}>Adicionar</button>
      </div>
    </form>
  );
}

export default DepartmentForm;
