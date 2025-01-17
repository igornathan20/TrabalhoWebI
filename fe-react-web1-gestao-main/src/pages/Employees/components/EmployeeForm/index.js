import { useState, useEffect } from 'react';
import './style.css';

function EmployeeForm({ onSubmit, onCancel, initialData, departments }) {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [employeeSalary, setEmployeeSalary] = useState('');
  const [employeeTransport, setEmployeeTransport] = useState(false);
  const [departmentId, setDepartmentId] = useState('');

  const isFormValid = employeeName && employeeEmail && employeePosition && employeeSalary && departmentId;

  useEffect(() => {
    if (initialData) {
      setEmployeeName(initialData.name);
      setEmployeeEmail(initialData.email);
      setEmployeePosition(initialData.position);
      setEmployeeSalary(initialData.salary.toString());
      setEmployeeTransport(initialData.transportAllowance);
      setDepartmentId(initialData.department_id);
    }
  }, [initialData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      name: employeeName,
      email: employeeEmail,
      position: employeePosition,
      salary: parseFloat(employeeSalary),
      transportAllowance: employeeTransport,
      department_id: departmentId,
    });

    setEmployeeName('');
    setEmployeeEmail('');
    setEmployeePosition('');
    setEmployeeSalary('');
    setEmployeeTransport(false);
    setDepartmentId('');
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Adicionar Funcionário</h2>
      <div className="input-block">
        <label htmlFor="employee_name">Nome completo</label>
        <input
          type="text"
          name="employee_name"
          id="employee_name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="employee_email">E-mail</label>
        <input
          type="email"
          name="employee_email"
          id="employee_email"
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="employee_position">Cargo</label>
        <input
          type="text"
          name="employee_position"
          id="employee_position"
          value={employeePosition}
          onChange={(e) => setEmployeePosition(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="employee_salary">Remuneração (R$)</label>
        <input
          type="number"
          name="employee_salary"
          id="employee_salary"
          value={employeeSalary}
          onChange={(e) => setEmployeeSalary(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <div className="input-label">
          <label htmlFor="employee_transport">Auxílio Transporte</label>
          <label className="switch">
            <input
              type="checkbox"
              name="employee_transport"
              id="employee_transport"
              checked={employeeTransport}
              onChange={(e) => setEmployeeTransport(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="input-block">
        <label htmlFor="employee_department">Departamento</label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          name="employee_department"
          id="employee_department"
          required
        >
          <option value="">Selecione o Departamento</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="confirm-button" disabled={!isFormValid}>Adicionar</button>
      </div>
    </form>
  );
}

export default EmployeeForm;
