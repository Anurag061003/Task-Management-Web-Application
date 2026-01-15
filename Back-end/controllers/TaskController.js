const Task = require('../models/Task');

async function addTask(req, res) {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.userId
    });

    await task.save();
    res.status(201).send({ success: true, message: "Task Added Successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).send({ success: true, data: tasks });
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
}

async function deleteTask(req, res) {
  try {
    await Task.deleteOne({
      _id: req.params.id,
      user: req.user.userId
    });
    res.status(200).send({ success: true, message: "Task Deleted" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
}

async function updateTask(req, res) {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).send({ success: true, message: "Task updated successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
}

async function markAllCompleted(req, res) {
  try {
    await Task.updateMany(
      { user: req.user.userId, status: "Pending" },
      { $set: { status: "Completed" } }
    );

    res.status(200).send({
      success: true,
      message: "All tasks marked as completed"
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to update tasks"
    });
  }
}

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  markAllCompleted
};
