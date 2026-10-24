let students = [
  { id: 1, rollNo: "24MSD001", name: "Rohan Verma", email: "rohan@univ.edu", department: "CSE", semester: 4, gpa: 9.20 },
  { id: 2, rollNo: "24MSD002", name: "Priya Nair", email: "priya@univ.edu", department: "AI-DS", semester: 4, gpa: 8.95 },
  { id: 3, rollNo: "24MSD003", name: "Devansh Patel", email: "devansh@univ.edu", department: "IT", semester: 4, gpa: 7.80 },
  { id: 4, rollNo: "24MSD004", name: "Ananya Iyer", email: "ananya@univ.edu", department: "CSE", semester: 4, gpa: 9.60 },
  { id: 5, rollNo: "24MSD005", name: "Kabir Singh", email: "kabir@univ.edu", department: "ECE", semester: 4, gpa: 8.10 }
];

// GET: Filtered, paginated & sorted student records
exports.getStudents = (req, res) => {
  let { dept, search, sortBy, order, page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  let result = [...students];

  // Department filter
  if (dept) {
    result = result.filter(s => s.department.toLowerCase() === dept.toLowerCase());
  }

  // Search by name or rollNo
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q));
  }

  // Sorting
  if (sortBy === 'gpa') {
    result.sort((a, b) => order === 'asc' ? a.gpa - b.gpa : b.gpa - a.gpa);
  } else if (sortBy === 'name') {
    result.sort((a, b) => order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
  }

  // Pagination calculation
  const total = result.length;
  const startIndex = (page - 1) * limit;
  const paginatedData = result.slice(startIndex, startIndex + limit);

  res.status(200).json({
    success: true,
    page,
    limit,
    totalRecords: total,
    totalPages: Math.ceil(total / limit),
    data: paginatedData
  });
};

// POST: Add new student
exports.createStudent = (req, res) => {
  const { rollNo, name, email, department, semester, gpa } = req.body;

  // Check unique rollNo
  if (students.some(s => s.rollNo.toLowerCase() === rollNo.toLowerCase())) {
    return res.status(409).json({
      success: false,
      message: `Conflict: Student with roll number '${rollNo}' already exists.`
    });
  }

  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    rollNo: rollNo.toUpperCase(),
    name,
    email,
    department,
    semester: parseInt(semester) || 1,
    gpa: parseFloat(gpa)
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student record registered successfully",
    data: newStudent
  });
};