// Lógica pura de tareas — sin Express ni HTTP
let tasks = [];

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const task = {
    id: newId(),
    title: data.title.trim(),
    completed: false,
    priority: data.priority || 'media',
    createdAt: Date.now(),
  };
  tasks.unshift(task);
  return task;
}

function toggleTarea(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error('NOT_FOUND');
  task.completed = !task.completed;
  return task;
}

function actualizarTarea(id, title) {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error('NOT_FOUND');
  task.title = title.trim();
  return task;
}

function eliminarTarea(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');
  tasks.splice(index, 1);
}

module.exports = { obtenerTodas, crearTarea, toggleTarea, actualizarTarea, eliminarTarea };