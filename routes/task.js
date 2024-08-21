import express from "express";
import { addNewTask, getAllTasks } from "../controllers/task.js";

const taskRouter = express.Router();

taskRouter.post("/add-new-task", addNewTask);
taskRouter.get("/get-all-tasks-by-user-id/:id", getAllTasks);

export default taskRouter;
