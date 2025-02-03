"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/app/actions/taskActions";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask({
          id: editingTask._id,
          ...newTask,
        });
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask.task._id ? updatedTask.task : task
          )
        );
      } else {
        const createdTask = await createTask(newTask);
        setTasks((prev) => [...prev, createdTask.task]);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };

      // Optimistically update the UI first
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );

      // Send update request to server
      const res = await updateTask({
        id: task._id,
        completed: updatedTask.completed,
      });

      if (!res.success) throw new Error("Failed to update task status");
    } catch (err) {
      setError("Failed to update task status");
      // Revert UI update in case of error
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? task : t))
      );
    }
  };

  return (
    <Container
      maxWidth="md"
      className="min-h-screen flex flex-col items-center p-4 sm:p-6"
    >
      {/* Fixed Header */}
      <Box className="w-full flex justify-between items-center  p-4 rounded-lg sticky top-0 z-10">
        <Typography
          variant="h5"
          className="text-center sm:text-left font-semibold"
        >
          Tasks
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <AddIcon fontSize="small" /> Add Task
        </Button>
      </Box>

      {/* Task List */}
      <Box className="w-full mt-4 flex-grow p-2">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" className="text-center">
            {error}
          </Typography>
        ) : (
          <TaskList
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </Box>

      {/* Task Modal */}
      <TaskModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onAddTask={handleAddTask}
        editingTask={editingTask}
      />
    </Container>
  );
}
