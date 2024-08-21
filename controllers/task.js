import Task from "../models/task.js";
import { taskSchema } from "../schemas/task.js";

export const addNewTask = async (req, res) => {
  const { title, description, status, userId, priority } = await req.body;

  const { error } = taskSchema.validate({
    title,
    description,
    status,
    priority,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const newlyCreatedTask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });

    if (newlyCreatedTask) {
      return res.status(201).json({
        success: true,
        message: "Task added successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occurred! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

export const getAllTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const extractAllTaskByUserId = await Task.find({ userId: id });
    if (extractAllTaskByUserId) {
      return res.status(200).json({
        success: true,
        tasksList: extractAllTaskByUserId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occurred! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, userId, priority, _id } = await req.body;

  const { error } = taskSchema.validate({
    title,
    description,
    status,
    priority,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const updateTask = await Task.findByIdAndUpdate(
      { _id },
      {
        title,
        description,
        status,
        priority,
        userId,
      },
      { new: true }
    );

    if (updateTask) {
      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occurred! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id is required",
      });
    }

    const deleteTask = await Task.findByIdAndDelete(id);
    if (deleteTask) {
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occurred! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};
