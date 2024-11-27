const express = require('express');
const router = express.Router();
const emplyeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route('/')
  .get(emplyeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), emplyeesController.createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), emplyeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), emplyeesController.deleteEmployee);

router.route('/:id')
  .get(emplyeesController.getEmployee);

module.exports = router;