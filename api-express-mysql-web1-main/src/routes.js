const { Router } = require("express");
const EmployeeController = require("./app/controllers/Employee");
const DepartmentController = require("./app/controllers/Department");

const routes = Router();

// Employee
routes.get("/employees", EmployeeController.index);
routes.get("/employees/:id", EmployeeController.show);
routes.post("/employees", EmployeeController.store);
routes.put("/employees/:id", EmployeeController.update);
routes.delete("/employees/:id", EmployeeController.delete);

// Departments

routes.get("/departments", DepartmentController.index);
routes.post("/departments", DepartmentController.store);
routes.put("/departments/:id", DepartmentController.update);
routes.delete('/departments/:id', DepartmentController.delete);

module.exports = routes;
