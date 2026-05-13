const API = 'http://localhost:3000/api/v1/tasks';
const DARK_KEY = 'taskflow_dark';

let tasks = [], filter = 'all', searchQ = '', editingId = null, isLoading = false, errorMsg = '';

function loadDarkMode() { if (localStorage.getItem(DARK_KEY) === '1') setDark(true, false); }
function setDark(on, persist = true) {
  document.body.classList.toggle('dark', on);
  document.getElementById('btn-dark').textContent = on ? '☀️' : '🌙';
  if (persist) localStorage.setItem(DARK_KEY, on ? '1' : '0');
}

function fmtDate(ts) { return new Date(ts).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }); }
function priorityColor(p) { return p === 'alta' ? '#E24B4A' : p === 'baja' ? '#639922' : '#EF9F27'; }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

async function apiFetch(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error del servidor');
  return data;
}

async function loadTasks() {
  isLoading = true; errorMsg = ''; render();
  try { tasks = await apiFetch(API); }
  catch { errorMsg = '⚠️ No se puede conectar al servidor. ¿Está arrancado con npm run dev?'; }
  finally { isLoading = false; render(); }
}

async function addTask(title, priority) {
  if (!title.trim()) return;
  try { const task = await apiFetch(API, { method: 'POST', body: JSON.stringify({ title, priority }) }); tasks.unshift(task); render(); }
  catch (err) { showError(err.message); }
}

async function toggleTask(id) {
  try { const u = await apiFetch(`${API}/${id}/toggle`, { method: 'PATCH' }); tasks = tasks.map(t => t.id === id ? u : t); render(); }
  catch (err) { showError(err.message); }
}

async function removeTask(id, el) {
  try {
    if (el) el.classList.add('removing');
    await apiFetch(`${API}/${id}`, { method: 'DELETE' });
    setTimeout(() => { tasks = tasks.filter(t => t.id !== id); render(); }, 180);
  } catch (err) { showError(err.message); }
}

function startEdit(id) {
  editingId = id; render();
  setTimeout(() => { const i = document.querySelector('.task-edit-input'); if (i) { i.focus(); i.select(); } }, 30);
}

async function saveEdit(id) {
  const inp = document.querySelector('.task-edit-input');
  if (!inp || !inp.value.trim()) { editingId = null; render(); return; }
  try { const u = await apiFetch(`${API}/${id}`, { method: 'PATCH', body: JSON.stringify({ title: inp.value }) }); tasks = tasks.map(t => t.id === id ? u : t); }
  catch (err) { showError(err.message); }
  finally { editingId = null; render(); }
}

async function completeAll() {
  for (const t of tasks.filter(t => !t.completed)) await apiFetch(`${API}/${t.id}/toggle`, { method: 'PATCH' });
  await loadTasks();
}

async function clearDone() {
  for (const t of tasks.filter(t => t.completed)) await apiFetch(`${API}/${t.id}`, { method: 'DELETE' });
  tasks = tasks.filter(t => !t.completed); render();
}

function showError(msg) { errorMsg = msg; render(); setTimeout(() => { errorMsg = ''; render(); }, 4000); }

function getFiltered() {
  return tasks.filter(t => {
    const f = filter === 'all' || (filter === 'done' && t.completed) || (filter === 'pending' && !t.completed);
    const s = !searchQ || t.title.toLowerCase().includes(searchQ.toLowerCase());
    return f && s;
  });
}

function render() { renderStats(); renderError(); renderTasks(); }

function renderStats() {
  const total = tasks.length, done = tasks.filter(t => t.completed).length;
  const pct = total ? Math.round(done/total*100) : 0;
  document.getElementById('s-total').textContent = total;
  document.getElementById('s-pending').textContent = total - done;
  document.getElementById('s-done').textContent = done;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = pct + '% completado';
}

function renderError() {
  let el = document.getElementById('error-banner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'error-banner';
    el.style.cssText = 'background:#FCEBEB;color:#A32D2D;padding:10px 14px;border-radius:8px;margin-bottom:1rem;font-size:14px;display:none;';
    const app = document.getElementById('app');
    app.insertBefore(el, app.querySelector('.stats-bar'));
  }
  el.textContent = errorMsg;
  el.style.display = errorMsg ? 'block' : 'none';
}

function renderTasks() {
  const list = document.getElementById('task-list');
  if (isLoading) { list.innerHTML = '<li class="empty">⏳ Cargando tareas...</li>'; return; }
  const filtered = getFiltered();
  if (!filtered.length) {
    list.innerHTML = `<li class="empty">${tasks.length === 0 ? 'Aún no hay tareas. ¡Añade la primera!' : searchQ ? 'No se encontraron tareas.' : 'No hay tareas en este filtro.'}</li>`;
    return;
  }
  list.innerHTML = filtered.map(task => {
    const e = editingId === task.id;
    return `<li class="task-item${task.completed?' completed':''}" data-id="${task.id}">
      <div class="task-check${task.completed?' done':''}" data-check="${task.id}" role="checkbox" aria-checked="${task.completed}" tabindex="0"></div>
      <div class="priority-dot" style="background:${priorityColor(task.priority)}" title="Prioridad ${task.priority}"></div>
      ${e ? `<input class="task-edit-input" value="${esc(task.title)}" data-editid="${task.id}"/>` : `<span class="task-title">${esc(task.title)}</span>`}
      <span class="task-date">${fmtDate(task.createdAt)}</span>
      <div class="task-actions">
        ${e ? `<button class="btn-action" data-save="${task.id}">✓</button>` : `<button class="btn-action" data-edit="${task.id}">✎</button>`}
        <button class="btn-action danger" data-del="${task.id}">✕</button>
      </div></li>`;
  }).join('');
  attachEvents();
}

function attachEvents() {
  const list = document.getElementById('task-list');
  list.querySelectorAll('[data-check]').forEach(el => {
    el.addEventListener('click', () => toggleTask(el.dataset.check));
    el.addEventListener('keydown', e => { if (e.key===' '||e.key==='Enter'){e.preventDefault();toggleTask(el.dataset.check);} });
  });
  list.querySelectorAll('[data-del]').forEach(el => el.addEventListener('click', () => removeTask(el.dataset.del, el.closest('.task-item'))));
  list.querySelectorAll('[data-edit]').forEach(el => el.addEventListener('click', () => startEdit(el.dataset.edit)));
  list.querySelectorAll('[data-save]').forEach(el => el.addEventListener('click', () => saveEdit(el.dataset.save)));
  list.querySelectorAll('.task-edit-input').forEach(inp => {
    inp.addEventListener('keydown', e => {
      if (e.key==='Enter') saveEdit(inp.dataset.editid);
      if (e.key==='Escape') { editingId=null; render(); }
    });
  });
}

document.getElementById('btn-add').addEventListener('click', () => {
  const inp = document.getElementById('task-input');
  addTask(inp.value, document.getElementById('priority-sel').value);
  inp.value = ''; inp.focus();
});
document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key==='Enter') { addTask(e.target.value, document.getElementById('priority-sel').value); e.target.value=''; }
});
document.getElementById('btn-dark').addEventListener('click', () => setDark(!document.body.classList.contains('dark')));
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); filter = btn.dataset.filter; render();
  });
});
document.getElementById('search-input').addEventListener('input', e => { searchQ = e.target.value; render(); });
document.getElementById('btn-complete-all').addEventListener('click', completeAll);
document.getElementById('btn-clear-done').addEventListener('click', clearDone);

loadDarkMode();
loadTasks();