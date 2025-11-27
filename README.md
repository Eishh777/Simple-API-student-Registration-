# Student Registration API

A simple RESTful API for managing student registrations built with Node.js and Express.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The API will run on http://localhost:4000

## API Endpoints

### 1. Get All Students
- **URL**: `/api/students`
- **Method**: `GET`
- **Response**: List of all registered students

### 2. Get Student by ID
- **URL**: `/api/students/:id`
- **Method**: `GET`
- **Response**: Single student details

### 3. Register New Student
- **URL**: `/api/students`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "course": "Computer Science",
  "enrollmentDate": "2025-11-27"
}
```

### 4. Update Student
- **URL**: `/api/students/:id`
- **Method**: `PUT`
- **Body**: Same as POST (all fields optional)

### 5. Delete Student
- **URL**: `/api/students/:id`
- **Method**: `DELETE`

## Testing with cURL

Register a student:
```bash
curl -X POST http://localhost:3000/api/students   -H "Content-Type: application/json"   -d '{"name":"Jane Smith","email":"jane@example.com","course":"Data Science"}'
```

Get all students:
```bash
curl http://localhost:3000/api/students
```

## Notes

- This uses in-memory storage. Data will be lost when server restarts.
- For production, integrate a database (MongoDB, PostgreSQL, etc.)
- Add authentication/authorization as needed
