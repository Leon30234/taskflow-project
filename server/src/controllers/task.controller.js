const taskService = require('../services/task.service');

const getTasks = (req, res, next) => {
  try {
    res.status(200).json(taskService.obtenerTodas());
  } catch (err) { next(err); }
};

const createTask = (req, res, next) => {
  try {
    const { title, priority } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'El título es obligatorio y debe tener al menos 3 caracteres.' });
    }
    const valid = ['alta', 'media', 'baja'];
    if (priority && !valid.includes(priority)) {
      return res.status(400).json({ error: 'La prioridad debe ser: alta, media o baja.' });
    }
    res.status(201).json(taskService.crearTarea({ title, priority }));
  } catch (err) { next(err); }
};

const toggleTask = (req, res, next) => {
  try {
    res.status(200).json(taskService.toggleTarea(req.params.id));
  } catch (err) { next(err); }
};

const updateTask = (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'El título debe tener al menos 3 caracteres.' });
    }
    res.status(200).json(taskService.actualizarTarea(req.params.id, title));
  } catch (err) { next(err); }
};

const deleteTask = (req, res, next) => {
  try {
    taskService.eliminarTarea(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getTasks, createTask, toggleTask, updateTask, deleteTask };