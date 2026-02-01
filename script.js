let tasks = [];
let editingIndex = null;

function addTask() {
  const input = document.getElementById('task-input');
  const priority = document.getElementById('priority').value;

  if (input.value.trim() === '') return;

  tasks.push({
    text: input.value,
    completed: false,
    priority: priority
  });

  input.value = '';
  renderTasks();
}

function renderTasks(filter = 'all') {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  let filteredTasks = tasks;
  if (filter === 'active') filteredTasks = tasks.filter(task => !task.completed);
  else if (filter === 'completed') filteredTasks = tasks.filter(task => task.completed);

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');

    const priorityText = {
      low: 'Can Wait',
      medium: 'Needs Attention',
      high: 'Important'
    };

    li.innerHTML = `
      <div style="display: flex; align-items: center; flex: 1;">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})"/>
        <span style="margin-left: 10px;">${task.text}</span>
        <span class="priority ${task.priority}">${priorityText[task.priority]}</span>
      </div>
      <div class="task-actions">
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById('total').textContent = tasks.length;
  document.getElementById('completed').textContent = tasks.filter(t => t.completed).length;
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  editingIndex = index;
  const modal = document.getElementById('edit-modal');
  const input = document.getElementById('edit-input');
  input.value = tasks[index].text;
  modal.style.display = 'flex';
}

function saveEdit() {
  const input = document.getElementById('edit-input');
  if (input.value.trim() !== '') {
    tasks[editingIndex].text = input.value.trim();
    closeModal();
    renderTasks();
  }
}

function closeModal() {
  document.getElementById('edit-modal').style.display = 'none';
  editingIndex = null;
}

function filterTasks(type) {
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  const button = Array.from(document.querySelectorAll('.filters button')).find(btn => btn.textContent.toLowerCase().includes(type));
  if (button) button.classList.add('active');
  renderTasks(type);
}

renderTasks();
