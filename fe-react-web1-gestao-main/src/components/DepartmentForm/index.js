import { useState } from "react";

export default function DepartmentForm({ onSubmit }) {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

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
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="department_name">Nome do Departamento</label>
        <input
          type="text"
          name="department_name"
          id="department_name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
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
        />
      </div>
      <button type="submit">SALVAR</button>
    </form>
  );
}
