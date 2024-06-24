const EmployeeRepository = require("../repositories/Employee");

class EmployeeController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const employee = await EmployeeRepository.findAll(orderBy);

    response.json(employee);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: "Invalid employee id" });
    }

    const employee = await EmployeeRepository.findById(id);

    if (!employee) {
      return response.status(404).json({ error: "Employee not found!" });
    }

    response.json(employee);
  }

  async store(request, response) {
    const { name, email, position, salary, transportAllowance, department_id } =
      request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    if (!salary) {
      return response.status(400).json({ error: "Salary is required" });
    }

    if (!department_id) {
      return response.status(400).json({ error: "Department ID is required" });
    }

    if (email) {
      const employeeByEmail = await EmployeeRepository.findByEmail(email);
      if (employeeByEmail) {
        return response
          .status(400)
          .json({ error: "This email is already in use!" });
      }
    }

    const employee = await EmployeeRepository.create({
      name,
      email,
      position,
      salary,
      transportAllowance: transportAllowance || false,
      department_id,
    });

    response.status(201).json(employee);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
      email,
      position,
      salary,
      transportAllowance,
      hireDate,
      department_id,
    } = request.body;

    // Verifica se o funcionário existe
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      return response.status(404).json({ error: "Employee not found" });
    }

    if (email && email !== employee.email) {
      const employeeByEmail = await EmployeeRepository.findByEmail(email);
      if (employeeByEmail) {
        return response
          .status(400)
          .json({ error: "This e-mail is already in use" });
      }
    }

    // Atualiza apenas os campos fornecidos
    const updatedEmployee = await EmployeeRepository.update(id, {
      name,
      email,
      position,
      salary,
      transportAllowance,
      department_id,
    });

    response.status(200).json(updatedEmployee);
  }

  async delete(request, response) {
    const { id } = request.params;
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      return response.status(400).json({ error: "Invalid employee id" });
    }

    await EmployeeRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new EmployeeController();
