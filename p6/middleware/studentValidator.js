exports.validateStudentPayload = (req, res, next) => {
  const { rollNo, name, email, department, gpa } = req.body;
  const errors = [];

  if (!rollNo || typeof rollNo !== 'string') errors.push("Valid 'rollNo' string is required.");
  if (!name || name.trim().length < 3) errors.push("'name' must be at least 3 characters.");
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.push("Valid 'email' address is required.");

  if (!department) errors.push("'department' is required.");

  const numGpa = parseFloat(gpa);
  if (isNaN(numGpa) || numGpa < 0 || numGpa > 10) {
    errors.push("'gpa' must be a valid decimal number between 0.00 and 10.00.");
  }

  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      message: "Validation Failed",
      errors
    });
  }

  next();
};