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
  list.innerHTML = 'Loading...';
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();
    list.innerHTML = '';
    data.data.forEach((s) => {
      const li = document.createElement('li');
      li.textContent = `${s.id}. ${s.name} - ${s.email} - ${s.course}`;
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = 'Error loading students';
  }
}
