import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import AppBar from './components/AppBar';

const INITIAL_STUDENTS = [
  { id: 1, rollNo: "24MSD001", name: "Rohan Verma", email: "rohan.v@univ.edu", phone: "9823412345", department: "Computer Science", cgpa: "9.20" },
  { id: 2, rollNo: "24MSD002", name: "Priya Nair", email: "priya.n@univ.edu", phone: "9876543210", department: "AI & Data Science", cgpa: "8.95" },
  { id: 3, rollNo: "24MSD003", name: "Devansh Patel", email: "devansh.p@univ.edu", phone: "9123456780", department: "Information Tech", cgpa: "7.80" }
];

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [
      ...prev,
      { ...newStudent, id: Date.now() }
    ]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student record?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || s.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <>
      <AppBar practical="03" />
      <div className="page">
      <header className="page-head">
        <span className="eyebrow">Practical 03 · Forms &amp; Validation</span>
        <h1>Student Management Portal</h1>
        <p>React controlled forms with real-time schema validation.</p>
      </header>

      <div className="main-grid">
        <section className="form-panel">
          <StudentForm onAddStudent={handleAddStudent} />
        </section>

        <section className="records-panel">
          <div className="records-header">
            <h3>Registered Students ({filteredStudents.length})</h3>
            <div className="search-filters">
              <input
                type="text"
                placeholder="Search by name or roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Tech">Information Tech</option>
                <option value="AI & Data Science">AI & Data Science</option>
              </select>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.rollNo}</strong></td>
                  <td>{s.name}</td>
                  <td><span className="dept-tag">{s.department}</span></td>
                  <td><span className="cgpa-badge">{s.cgpa}</span></td>
                  <td>{s.phone}</td>
                  <td>
                    <button className="del-btn" onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <p className="footer">Harmit Suthar (23084231044) · Practical 03</p>
      </div>
    </>
  );
}

export default App;