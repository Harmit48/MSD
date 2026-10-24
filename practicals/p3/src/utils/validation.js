/**
 * Form Validation Rules with Regular Expressions
 */
export const validateStudentForm = (formData) => {
  const errors = {};

  // Roll Number: e.g. 23MSD001 or CS101
  const rollRegex = /^[0-9]{2}[A-Z]{2,4}[0-9]{3,4}$/i;
  if (!formData.rollNo.trim()) {
    errors.rollNo = "Roll Number is required.";
  } else if (!rollRegex.test(formData.rollNo.trim())) {
    errors.rollNo = "Format must be like 24MSD042 (2 digits + Dept + 3-4 digits).";
  }

  // Name validation
  if (!formData.name.trim()) {
    errors.name = "Student Name is required.";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long.";
  }

  // Email validation
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!formData.email.trim()) {
    errors.email = "Email Address is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Enter a valid email address (e.g. student@college.edu).";
  }

  // Phone validation: 10-digit Indian phone format
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(formData.phone.trim())) {
    errors.phone = "Enter a valid 10-digit mobile number starting with 6-9.";
  }

  // Department validation
  if (!formData.department) {
    errors.department = "Please select a department.";
  }

  // CGPA validation: 0.00 to 10.00
  const cgpaNum = parseFloat(formData.cgpa);
  if (!formData.cgpa) {
    errors.cgpa = "CGPA is required.";
  } else if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
    errors.cgpa = "CGPA must be a valid number between 0.00 and 10.00.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};