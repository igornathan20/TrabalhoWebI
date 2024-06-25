const DepartmentRepository = require("../repositories/Department");

class DepartmentController {
  async index(request, response) {
    const department = await DepartmentRepository.findAll();

    response.json(department);
  }

  async store(request, response) {
    const { name, description } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Nome é obrigatório" });
    }

    const department = await DepartmentRepository.create({ name, description });

    response.status(201).json(department);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const updateDepartment = await DepartmentRepository.update(id, {
      name,
      description,
    });

    response.status(200).json(updateDepartment);
  }


  async delete(request, response) {
    const { id } = request.params;

    try {
      await DepartmentRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      response.status(500).json({ error: "Erro ao deletar departamento" });
    }
  }

}

module.exports = new DepartmentController();
