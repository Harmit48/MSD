const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: [true, "Employee ID is mandatory"],
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: [true, "Employee Name is mandatory"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Work email is mandatory"],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Valid email required"]
    },
    department: {
      type: String,
      required: true,
      enum: ["Engineering", "Product", "Human Resources", "Finance", "Marketing"]
    },
    designation: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true,
      min: [10000, "Salary cannot be lower than 10,000"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt BSON dates
  }
);

module.exports = mongoose.model('Employee', employeeSchema);