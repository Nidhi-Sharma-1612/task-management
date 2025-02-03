"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Plus Icon
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    const formattedTask = {
      ...newTask,
      dueDate: newTask.dueDate
        ? dayjs(newTask.dueDate, "YYYY-MM-DD").format("YYYY-MM-DD")
        : "",
    };

    const method = editingTask ? "PATCH" : "POST";
    const endpoint = editingTask
      ? `/api/tasks/${editingTask._id}`
      : "/api/tasks";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedTask),
      });

      if (!res.ok) throw new Error("Failed to save task");

      fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.message);
    } finally {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
        dueDate: task.dueDate
          ? dayjs(task.dueDate, "YYYY-MM-DD").format("YYYY-MM-DD")
          : "",
      };

      // Optimistically update the UI first
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );

      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error("Failed to update task status");
    } catch (err) {
      setError("Failed to update task status");

      // Revert UI update in case of error
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? task : t))
      );
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <Container
      maxWidth="md"
      className="min-h-screen  flex flex-col items-center p-4 sm:p-6"
    >
      <Box className="w-full flex justify-between items-center rounded-lg sticky top-0 z-10 mb-4">
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
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        >
          <AddIcon fontSize="small" /> Add Task
        </Button>
      </Box>

      <Box className="w-full mt-4 flex-grow ">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[50vh]">
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

      {/* Add/Edit Task Modal */}
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
        editingTask={editingTask}
      />
    </Container>
  );
}
