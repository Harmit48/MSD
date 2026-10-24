import React, { useState } from 'react';
import { validateStudentForm } from '../utils/validation';

const INITIAL_FORM = {
  rollNo: '',
  name: '',
  email: '',
  phone: '',
  department: 'Computer Science',
  semester: '4th',
  cgpa: ''
};

const StudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Controlled component input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on active editing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateStudentForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onAddStudent(formData);
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h3>Register new student</h3>

      {isSubmitted && (
        <div className="alert alert-success">
          Student registered successfully into records!
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label>Roll Number *</label>
          <input
            type="text"
            name="rollNo"
            placeholder="e.g. 24MSD015"
            value={formData.rollNo}
            onChange={handleChange}
            className={errors.rollNo ? 'input-error' : ''}
          />
          {errors.rollNo && <span className="field-error">{errors.rollNo}</span>}
        </div>

        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Aarav Sharma"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="aarav@university.edu"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number (10 digits) *</label>
          <input
            type="tel"
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Department *</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Information Tech">Information Tech</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current CGPA (0.0 - 10.0) *</label>
          <input
            type="number"
            step="0.01"
            name="cgpa"
            placeholder="8.75"
            value={formData.cgpa}
            onChange={handleChange}
            className={errors.cgpa ? 'input-error' : ''}
          />
          {errors.cgpa && <span className="field-error">{errors.cgpa}</span>}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Add Student Record
      </button>
    </form>
  );
};

export default StudentForm;