import express from "express";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.js";

const taskRouter = express.Router();

taskRouter.post("/add-new-task", addNewTask);
taskRouter.get("/get-all-tasks-by-user-id/:id", getAllTasks);
taskRouter.delete("/delete-task/:id", deleteTask);
taskRouter.put("/update-task", updateTask);

export default taskRouter;
