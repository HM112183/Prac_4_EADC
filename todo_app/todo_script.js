let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText
  };
  tasks.push(newTask);
  input.value = '';
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function updateTask(id, newText) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, text: newText } : task
  );
  renderTasks();
}

function renderTasks() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = task.text;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.style.display = 'none';

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
      span.style.display = 'none';
      input.style.display = 'inline-block';
      saveButton.style.display = 'inline-block';
      editButton.style.display = 'none';
    };

    const saveButton = document.createElement('button');
    saveButton.className = 'save';
    saveButton.textContent = 'Save';
    saveButton.style.display = 'none';
    saveButton.onclick = () => {
      updateTask(task.id, input.value);
    };

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(editButton);
    div.appendChild(saveButton);
    div.appendChild(deleteButton);

    todoList.appendChild(div);
  });
}
