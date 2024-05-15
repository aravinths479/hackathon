const Todo = require('../models/Todo');
const mongoose = require('mongoose');

// Get all todos
const getTodos = async (req, res) => {
  const user_id = req.user._id;

  try {
    const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such todo' });
  }

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'No such todo' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new todo
const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Please provide a title for the todo' });
  }

  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ title, user_id });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such todo' });
  }

  try {
    const todo = await Todo.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).json({ error: 'No such todo' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such todo' });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'No such todo' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo
};
