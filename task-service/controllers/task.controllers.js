import { Task } from "../models/task.models.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({
      userId: req.userId,
      title,
      description,
    });
    await newTask.save();
    return res.status(201).json({
      id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task: ", error });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({ userId: req.userId });
    return res.json({ message: "All tasks:", allTasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all tasks", error });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task found:", task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task by ID", error });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.userId;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    await task.save();
    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }
    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};
