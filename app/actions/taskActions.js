"use server";
import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/Task";
import dayjs from "dayjs";

// ✅ Get All Tasks
export async function getTasks() {
  await dbConnect();
  const tasks = await Task.find({}).lean(); // Converts MongoDB documents to plain objects

  return tasks.map((task) => ({
    ...task,
    _id: task._id.toString(), // Convert ObjectId to string
    dueDate: task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : null, // Format date
  }));
}

// ✅ Create Task
export async function createTask({ title, description, dueDate }) {
  await dbConnect();

  if (!title || !dueDate) {
    throw new Error("Title and Due Date are required");
  }

  const newTask = await Task.create({ title, description, dueDate });

  return {
    success: true,
    task: {
      ...newTask.toObject(), // Convert Mongoose model to plain object
      _id: newTask._id.toString(), // Convert ObjectId to string
      dueDate: dayjs(newTask.dueDate).format("YYYY-MM-DD"), // Format date
    },
  };
}

// ✅ Update Task
export async function updateTask({
  id,
  title,
  description,
  dueDate,
  completed,
}) {
  await dbConnect();

  const formattedDueDate = dueDate
    ? dayjs(dueDate, "YYYY-MM-DD").toISOString()
    : null;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, dueDate: formattedDueDate, completed },
    { new: true }
  ).lean(); // Ensure we return a plain object

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return {
    success: true,
    task: {
      ...updatedTask,
      _id: updatedTask._id.toString(), // Convert ObjectId to string
      dueDate: dayjs(updatedTask.dueDate).format("YYYY-MM-DD"), // Format date
    },
  };
}

// ✅ Delete Task
export async function deleteTask(id) {
  await dbConnect();
  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    throw new Error("Task not found");
  }

  return { success: true };
}
