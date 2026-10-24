# Practical 3: Create a Student Management System using React Forms, Controlled Components and Validation

## Category
React.js / Forms & Data Integrity

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to develop a complete Student Registration and Records Management system 
        implementing Controlled Components, robust Regex Form Validation, dynamic error display, 
        and state-driven table rendering with search, sort, and deletion capabilities.
      
      Core Theoretical Concepts:
      
        Controlled Components: An input form element whose value is controlled by React state. In controlled inputs, mutable state acts as the "single source of truth". Every keystroke invokes an onChange handler, updating the state, which in turn re-renders the input value.
        Form Validation Architecture: Real-time and submit-time validation rules ensuring data integrity:
          
            Roll Number: Strict alphanumeric pattern (e.g. 23MSD001).
            Full Name: Minimum 3 alphabetical characters.
            Email: RFC-compliant standard email regex format.
            Mobile Phone: Exactly 10 numeric digits starting with 6, 7, 8, or 9.
            CGPA: Numeric float between 0.00 and 10.00.
          
        
        Derived State & Filters: Real-time filtering of registered student records by department and search queries without mutating the original database state.

## 2. Commands to Setup & Run
```bash
# 1. Create React Project
# Initializes React 18 application with Vite.
npm create vite@latest practical-03-student-forms -- --template react

# 2. Change Directory & Install
# Installs core React dependencies.
cd practical-03-student-forms && npm install

# 3. Run Application
# Launches the student portal on local port.
npm run dev

```

## 3. Directory Structure
```
practical-03-student-forms/
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx                  # Top-level state (students array, search query, department filter)
│   ├── index.css                # Form styling, error validation highlights & badges
│   ├── utils/
│   │   └── validation.js        # Regex validation helpers and error message dictionary
│   └── components/
│       ├── StudentForm.jsx      # Controlled form with multi-field input validation
│       ├── StudentTable.jsx     # Responsive data table with delete, badge tags & search
│       └── SummaryCards.jsx     # KPI metrics: Total Students, Avg CGPA, Dept Breakdown
```

## 4. Source Code Files
See the source files inside this directory.
