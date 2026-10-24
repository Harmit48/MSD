const Employee = require('../models/Employee');

// GET all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const { dept, active } = req.query;
    const filter = {};
    if (dept) filter.department = dept;
    if (active !== undefined) filter.isActive = active === 'true';

    const employees = await Employee.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST create employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      message: "Employee registered in MongoDB Atlas",
      data: employee
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Error: Employee ID or Email already exists in database."
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      message: `Employee ${employee.name} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};