const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5006;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = [
  { id: 1, rollNo: "24MSD001", name: "Rohan Verma", department: "CSE", semester: 4, gpa: 9.20 },
  { id: 2, rollNo: "24MSD002", name: "Priya Nair", department: "AI-DS", semester: 4, gpa: 8.95 },
  { id: 3, rollNo: "24MSD003", name: "Devansh Patel", department: "IT", semester: 4, gpa: 7.80 },
  { id: 4, rollNo: "23084231044", name: "Harmit Suthar", department: "CSE", semester: 4, gpa: 9.80 }
];

app.get('/api/students', (req, res) => {
  let { dept, sortBy, order } = req.query;
  let result = [...students];
  if (dept) result = result.filter(s => s.department.toLowerCase() === dept.toLowerCase());
  if (sortBy === 'gpa') result.sort((a,b) => order === 'desc' ? b.gpa - a.gpa : a.gpa - b.gpa);
  res.json({ success: true, count: result.length, data: result });
});

app.listen(PORT, () => console.log("Practical 06 running on http://localhost:" + PORT));
