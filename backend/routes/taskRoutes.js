const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, getStats } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All task routes are protected

router.get('/stats', getStats);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
