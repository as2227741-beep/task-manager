const Task = require('../models/Task');

// @GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const { status, priority, category, sort } = req.query;
    const filter = { user: req.user._id };
    if (status)   filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const sortObj = sort === 'oldest' ? { createdAt: 1 }
                  : sort === 'dueDate' ? { dueDate: 1 }
                  : { createdAt: -1 };

    const tasks = await Task.find(filter).sort(sortObj);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await Task.create({
      user: req.user._id,
      title, description, status, priority, dueDate, category
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/tasks/stats
const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const [total, todo, inProgress, completed, high] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, status: 'todo' }),
      Task.countDocuments({ user: userId, status: 'in-progress' }),
      Task.countDocuments({ user: userId, status: 'completed' }),
      Task.countDocuments({ user: userId, priority: 'high' }),
    ]);
    res.json({ total, todo, inProgress, completed, high });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getStats };
