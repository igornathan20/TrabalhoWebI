const db = require("../models/ConnectDatabase");

class EmployeeRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const rows = await db.query(`
    SELECT employee.*, department.name AS department_name
    FROM employee
    LEFT JOIN department ON department.id = employee.department_id
    ORDER BY employee.name ${direction}
    ;
    `);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(
      `
        SELECT employee.*, department.name AS department_name
        FROM employee
        LEFT JOIN department ON department.id = employee.department_id
        WHERE employee.id = ?
        ;
        `,
      [id]
    );

    return rows;
  }

  async findByEmail(email) {
    const [row] = await db.query(
      `
      SELECT * FROM employee
      WHERE email = ?
    `,
      [email]
    );

    return row;
  }

  async create({
    name,
    email,
    position,
    salary,
    transportAllowance,
    department_id,
  }) {
    const result = await db.query(
      `
      INSERT INTO employee (name, email, position, salary, transportAllowance, hireDate, department_id)
      VALUES (?, ?, ?, ?, ?, NOW(), ?)
      `,
      [name, email, position, salary, transportAllowance, department_id]
    );

    const insertedEmployeeId = result.insertId;
    const [insertedEmployeeRows] = await db.query(
      `
      SELECT id, name, email, position, salary, transportAllowance, department_id
      FROM employee
      WHERE id = ?
      `,
      [insertedEmployeeId]
    );
    return insertedEmployeeRows;
  }

  async update(
    id,
    {
      name,
      email,
      position,
      salary,
      transportAllowance,
      department_id,
    }
  ) {
    // Ensure undefined values are converted to null
    const params = [
      name || null,
      email || null,
      position || null,
      salary || null,
      transportAllowance || null,
      department_id || null,
      id,
    ];

    await db.query(
      `
      UPDATE employee
      SET name = ?, email = ?, position = ?, salary = ?, transportAllowance = ?, department_id = ?
      WHERE id = ?
      ;
    `,
      params
    );

    const [updatedEmployeeRows] = await db.query(
      `
      SELECT id, name, email, position, salary, transportAllowance, department_id
      FROM employee
      WHERE id = ?
      `,
      [id]
    );
    return updatedEmployeeRows;
  }

  async delete(id) {
    const result = await db.query(
      `
      DELETE FROM employee
      WHERE id = ?
      ;
    `,
      [id]
    );

    return result;
  }
}

module.exports = new EmployeeRepository();
