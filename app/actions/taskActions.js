"use server";
import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/Task";
import dayjs from "dayjs";

// ✅ Get All Tasks (Fix Date Format)
export async function getTasks() {
  await dbConnect();
  const tasks = await Task.find({}).lean();

  return tasks.map((task) => ({
    ...task,
    _id: task._id.toString(),
    dueDate: task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : null,
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
      ...newTask.toObject(),
      _id: newTask._id.toString(),
      dueDate: dayjs(newTask.dueDate).format("YYYY-MM-DD"),
    },
  };
}

// ✅ Update Task (Fixes Date Loss)
export async function updateTask({
  id,
  title,
  description,
  dueDate,
  completed,
}) {
  await dbConnect();

  // 🛠️ Retrieve the existing task to preserve missing fields
  const existingTask = await Task.findById(id);
  if (!existingTask) {
    throw new Error("Task not found");
  }

  // ✅ Ensure that `dueDate` is always preserved if not provided in the update
  const formattedDueDate = dueDate
    ? dayjs(dueDate, "YYYY-MM-DD").toISOString()
    : existingTask.dueDate;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      title: title ?? existingTask.title,
      description: description ?? existingTask.description,
      dueDate: formattedDueDate,
      completed: completed ?? existingTask.completed,
    },
    { new: true }
  ).lean();

  if (!updatedTask) {
    throw new Error("Task update failed");
  }

  return {
    success: true,
    task: {
      ...updatedTask,
      _id: updatedTask._id.toString(),
      dueDate: updatedTask.dueDate
        ? dayjs(updatedTask.dueDate).format("YYYY-MM-DD")
        : null,
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
