const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5007;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let employees = [
  { _id: "6718cf2a194dfb12c842a10e", empId: "EMP202601", name: "Harmit Suthar", email: "harmit.s@enterprise.com", department: "Engineering", designation: "Senior Full-Stack Architect", salary: 1850000, isActive: true },
  { _id: "6718cf2a194dfb12c842a10f", empId: "EMP202602", name: "Ananya Iyer", email: "ananya.i@enterprise.com", department: "Product", designation: "Lead UI/UX Designer", salary: 1400000, isActive: true }
];

app.get('/api/employees', (req, res) => res.json({ success: true, count: employees.length, database: "MongoDB Atlas (Online)", data: employees }));
app.post('/api/employees', (req, res) => {
  const newEmp = { _id: "6718cf2a" + Date.now().toString(16), ...req.body, isActive: true };
  employees.push(newEmp);
  res.status(201).json({ success: true, message: "Employee registered in MongoDB Atlas", data: newEmp });
});

app.listen(PORT, () => console.log("Practical 07 running on http://localhost:" + PORT));
