const API_BASE = 'http://localhost:4000/api/students';

const form = document.getElementById('studentForm');
const msg = document.getElementById('message');
const list = document.getElementById('studentsList');
const loadBtn = document.getElementById('loadBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = 'Submitting...';

  const body = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    course: document.getElementById('course').value,
    enrollmentDate: document.getElementById('enrollmentDate').value
  };

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      msg.textContent = data.message || 'Error registering student';
      msg.style.color = 'red';
      return;
    }
    msg.textContent = 'Student registered successfully!';
    msg.style.color = 'green';
    form.reset();
    loadStudents();
  } catch (err) {
    msg.textContent = 'Network error';
    msg.style.color = 'red';
  }
});

loadBtn.addEventListener('click', loadStudents);

async function loadStudents() {
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();
    
    list.innerHTML = '';
    if (data.data && data.data.length > 0) {
      data.data.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${student.name}</strong> - ${student.email} (${student.course})
          <button class="delete-btn" data-id="${student.id}">Delete</button>
        `;
        list.appendChild(li);
      });
      
      // Add delete event listeners
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteStudent);
      });
    } else {
      list.innerHTML = '<p>No students found</p>';
    }
  } catch (err) {
    list.innerHTML = '<p>Error loading students</p>';
    console.error(err);
  }
}

async function deleteStudent(e) {
  const studentId = e.target.dataset.id;
  
  if (confirm(`Delete student ${studentId}?`)) {
    try {
      const res = await fetch(`${API_BASE}/${studentId}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (data.success) {
        msg.textContent = 'Student deleted successfully';
        loadStudents(); // reload list
      } else {
        msg.textContent = 'Error deleting student';
      }
    } catch (err) {
      msg.textContent = 'Error deleting student';
      console.error(err);
    }
  }
}
