const db = require("../models/ConnectDatabase");

class DepartmentRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM department ORDER BY name
      ;
    `);
    return rows;
  }

  async create({ name, description }) {
    const result = await db.query(
      `INSERT INTO department(name, description) VALUES(?, ?)`,
      [name, description]
    );

    const insertedDepartmentId = result.insertId;
    const insertedDepartment = await db.query(
      `SELECT id, name, description FROM department WHERE id = ?`,
      [insertedDepartmentId]
    );

    return insertedDepartment[0];
  }

  async update(id, { name, description }) {
    await db.query(
      `UPDATE department SET name = ?, description = ? WHERE id = ?`,
      [name, description, id]
    );

    const updatedDepartment = await db.query(
      `SELECT id, name, description FROM department WHERE id = ?`,
      [id]
    );

    return updatedDepartment[0];
  }
}

module.exports = new DepartmentRepository();
