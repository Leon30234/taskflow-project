/* =============================================
   TASKFLOW - app.js
   ============================================= */

// ── 1. Claves de LocalStorage ──────────────────
const STORAGE_KEY = 'taskflow_tasks';
const DARK_KEY    = 'taskflow_dark';

// ── 2. Estado global ───────────────────────────
let tasks    = [];   // Array de objetos tarea
let filter   = 'all'; // 'all' | 'pending' | 'done'
let searchQ  = '';   // Texto de búsqueda
let editingId = null; // ID de la tarea en edición

// ── 3. Persistencia (LocalStorage) ─────────────

/** Carga las tareas desde LocalStorage */
function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    tasks = [];
  }
}

/** Guarda las tareas en LocalStorage */
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ── 4. Generador de ID único ───────────────────
function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── 5. CRUD de tareas ──────────────────────────

/**
 * Añade una nueva tarea al inicio del array.
 * @param {string} title    - Título de la tarea
 * @param {string} priority - 'alta' | 'media' | 'baja'
 */
function addTask(title, priority) {
  if (!title.trim()) return;

  /** Estructura de una tarea */
  const task = {
    id:        newId(),
    title:     title.trim(),
    completed: false,
    createdAt: Date.now(),
    priority:  priority || 'media',
  };

  tasks.unshift(task); // Más nueva primero
  saveTasks();
  render();
}

/**
 * Alterna el estado completado/pendiente de una tarea.
 * @param {string} id - ID de la tarea
 */
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

/**
 * Elimina una tarea con animación.
 * @param {string} id  - ID de la tarea
 * @param {Element} el - Elemento DOM de la tarea (para la animación)
 */
function removeTask(id, el) {
  if (el) {
    el.classList.add('removing');
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      render();
    }, 180);
  } else {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
  }
}

/** Activa el modo edición para una tarea */
function startEdit(id) {
  editingId = id;
  render();
  setTimeout(() => {
    const inp = document.querySelector('.task-edit-input');
    if (inp) { inp.focus(); inp.select(); }
  }, 30);
}

/** Guarda el nuevo título de la tarea en edición */
function saveEdit(id) {
  const inp = document.querySelector('.task-edit-input');
  if (inp) {
    const task = tasks.find(t => t.id === id);
    if (task && inp.value.trim()) task.title = inp.value.trim();
  }
  editingId = null;
  saveTasks();
  render();
}

/** Marca todas las tareas como completadas */
function completeAll() {
  tasks.forEach(t => (t.completed = true));
  saveTasks();
  render();
}

/** Elimina todas las tareas completadas */
function clearDone() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
}

// ── 6. Filtrado y búsqueda ─────────────────────

/**
 * Devuelve las tareas según el filtro activo y la búsqueda.
 * @returns {Array} tareas filtradas
 */
function getFiltered() {
  return tasks.filter(task => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'done'    &&  task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchSearch =
      !searchQ ||
      task.title.toLowerCase().includes(searchQ.toLowerCase());

    return matchFilter && matchSearch;
  });
}

// ── 7. Utilidades de presentación ─────────────

/** Formatea un timestamp en fecha legible en español */
function fmtDate(ts) {
  return new Date(ts).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
  });
}

/** Devuelve el color hex según la prioridad */
function priorityColor(p) {
  if (p === 'alta') return '#E24B4A';
  if (p === 'baja') return '#639922';
  return '#EF9F27'; // media
}

/** Escapa caracteres HTML para evitar XSS */
function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── 8. Renderizado del DOM ─────────────────────

/** Actualiza toda la interfaz */
function render() {
  renderStats();
  renderTasks();
}

/** Actualiza las estadísticas y la barra de progreso */
function renderStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;
  const pct     = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('s-total').textContent   = total;
  document.getElementById('s-pending').textContent = pending;
  document.getElementById('s-done').textContent    = done;

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-bar').setAttribute('aria-valuenow', pct);
  document.getElementById('progress-label').textContent = pct + '% completado';
}

/** Renderiza la lista de tareas filtradas */
function renderTasks() {
  const filtered = getFiltered();
  const list     = document.getElementById('task-list');

  // ── Estado vacío ──
  if (filtered.length === 0) {
    let msg = 'Aún no hay tareas. ¡Añade la primera!';
    if (tasks.length > 0 && searchQ) msg = 'No se encontraron tareas para esa búsqueda.';
    else if (tasks.length > 0)       msg = 'No hay tareas en este filtro.';

    list.innerHTML = `<li class="empty">${msg}</li>`;
    return;
  }

  // ── Generar HTML de cada tarea ──
  list.innerHTML = filtered.map(task => {
    const isEditing = editingId === task.id;

    return `
      <li class="task-item${task.completed ? ' completed' : ''}" data-id="${task.id}">

        <!-- Checkbox -->
        <div
          class="task-check${task.completed ? ' done' : ''}"
          data-check="${task.id}"
          role="checkbox"
          aria-checked="${task.completed}"
          tabindex="0"
          aria-label="Marcar como ${task.completed ? 'pendiente' : 'completada'}"
        ></div>

        <!-- Punto de prioridad -->
        <div
          class="priority-dot"
          style="background:${priorityColor(task.priority)}"
          title="Prioridad ${task.priority}"
          aria-label="Prioridad ${task.priority}"
        ></div>

        <!-- Título o input de edición -->
        ${isEditing
          ? `<input
               class="task-edit-input"
               value="${esc(task.title)}"
               data-editid="${task.id}"
               aria-label="Editar tarea"
             />`
          : `<span class="task-title">${esc(task.title)}</span>`
        }

        <!-- Fecha de creación -->
        <span class="task-date">${fmtDate(task.createdAt)}</span>

        <!-- Botones de acción -->
        <div class="task-actions">
          ${isEditing
            ? `<button class="btn-action" data-save="${task.id}" aria-label="Guardar cambios">✓</button>`
            : `<button class="btn-action" data-edit="${task.id}" aria-label="Editar tarea">✎</button>`
          }
          <button class="btn-action danger" data-del="${task.id}" aria-label="Eliminar tarea">✕</button>
        </div>

      </li>
    `;
  }).join('');

  // ── Asignar eventos a los elementos recién creados ──
  attachTaskEvents();
}

/** Asigna los event listeners a los botones de cada tarea */
function attachTaskEvents() {
  const list = document.getElementById('task-list');

  // Checkboxes (click y teclado)
  list.querySelectorAll('[data-check]').forEach(el => {
    el.addEventListener('click', () => toggleTask(el.dataset.check));
    el.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTask(el.dataset.check);
      }
    });
  });

  // Botón eliminar
  list.querySelectorAll('[data-del]').forEach(el => {
    el.addEventListener('click', () => {
      const item = el.closest('.task-item');
      removeTask(el.dataset.del, item);
    });
  });

  // Botón editar
  list.querySelectorAll('[data-edit]').forEach(el => {
    el.addEventListener('click', () => startEdit(el.dataset.edit));
  });

  // Botón guardar edición
  list.querySelectorAll('[data-save]').forEach(el => {
    el.addEventListener('click', () => saveEdit(el.dataset.save));
  });

  // Input de edición (Enter / Escape)
  list.querySelectorAll('.task-edit-input').forEach(inp => {
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter')  saveEdit(inp.dataset.editid);
      if (e.key === 'Escape') { editingId = null; render(); }
    });
  });
}

// ── 9. Modo oscuro ─────────────────────────────

/**
 * Activa o desactiva el modo oscuro.
 * @param {boolean} on      - true para activar
 * @param {boolean} persist - si guardar en LocalStorage (por defecto true)
 */
function setDark(on, persist = true) {
  document.body.classList.toggle('dark', on);
  document.getElementById('btn-dark').textContent = on ? '☀️' : '🌙';
  if (persist) localStorage.setItem(DARK_KEY, on ? '1' : '0');
}

// ── 10. Event listeners globales ───────────────

// Botón Añadir tarea
document.getElementById('btn-add').addEventListener('click', () => {
  const inp = document.getElementById('task-input');
  const pri = document.getElementById('priority-sel').value;
  addTask(inp.value, pri);
  inp.value = '';
  inp.focus();
});

// Enter en el input de nueva tarea
document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const pri = document.getElementById('priority-sel').value;
    addTask(e.target.value, pri);
    e.target.value = '';
  }
});

// Toggle modo oscuro
document.getElementById('btn-dark').addEventListener('click', () => {
  setDark(!document.body.classList.contains('dark'));
});

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    render();
  });
});

// Búsqueda
document.getElementById('search-input').addEventListener('input', e => {
  searchQ = e.target.value;
  render();
});

// Completar todas
document.getElementById('btn-complete-all').addEventListener('click', completeAll);

// Borrar completadas
document.getElementById('btn-clear-done').addEventListener('click', clearDone);

// ── 11. Inicialización ─────────────────────────
function init() {
  loadTasks();

  // Restaurar modo oscuro guardado
  if (localStorage.getItem(DARK_KEY) === '1') setDark(true, false);

  render();
}

init();
