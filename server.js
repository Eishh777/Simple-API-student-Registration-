const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
let students = [];
let nextId = 1;

// Serve static files FIRST (before API routes)
app.use(express.static('public'));

// All API routes here
// GET - Get all students
app.get('/api/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// GET - Get student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// POST - Register new student
app.post('/api/students', (req, res) => {
  const { name, email, phone, course, enrollmentDate } = req.body;

  // Validation
  if (!name || !email || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and course'
    });
  }

  // Check for duplicate email
  const existingStudent = students.find(s => s.email === email);
  if (existingStudent) {
    return res.status(400).json({
      success: false,
      message: 'Student with this email already exists'
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    email,
    phone: phone || null,
    course,
    enrollmentDate: enrollmentDate || new Date().toISOString().split('T')[0],
    registeredAt: new Date().toISOString()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student registered successfully',
    data: newStudent
  });
});

// PUT - Update student
app.put('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  const { name, email, phone, course, enrollmentDate } = req.body;

  students[studentIndex] = {
    ...students[studentIndex],
    name: name || students[studentIndex].name,
    email: email || students[studentIndex].email,
    phone: phone || students[studentIndex].phone,
    course: course || students[studentIndex].course,
    enrollmentDate: enrollmentDate || students[studentIndex].enrollmentDate,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: students[studentIndex]
  });
});

// DELETE - Delete student
app.delete('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent[0]
  });
});

// Root route LAST (fallback only)
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Student Registration API is running',
//     version: '1.0.0',
//     endpoints: {
//       getAllStudents: 'GET /api/students',
//       getStudent: 'GET /api/students/:id',
//       registerStudent: 'POST /api/students',
//       updateStudent: 'PUT /api/students/:id',
//       deleteStudent: 'DELETE /api/students/:id'
//     }
//   });
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});