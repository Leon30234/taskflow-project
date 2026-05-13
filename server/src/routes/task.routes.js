const { Router } = require('express');
const { getTasks, createTask, toggleTask, updateTask, deleteTask } = require('../controllers/task.controller');

const router = Router();

router.get('/',             getTasks);
router.post('/',            createTask);
router.patch('/:id/toggle', toggleTask);
router.patch('/:id',        updateTask);
router.delete('/:id',       deleteTask);

module.exports = router;