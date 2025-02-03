"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function TaskModal({ open, onClose, onAddTask, editingTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    title: false,
    dueDate: false,
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        ...editingTask,
        dueDate: editingTask.dueDate
          ? dayjs(editingTask.dueDate, "YYYY-MM-DD").isValid()
            ? dayjs(editingTask.dueDate, "YYYY-MM-DD").format("YYYY-MM-DD")
            : ""
          : "",
      });
    } else {
      setTask({ title: "", description: "", dueDate: "", completed: false });
    }
    setErrors({ title: false, dueDate: false }); // Reset errors on open
  }, [editingTask, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });

    // Remove validation error when user types
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = () => {
    // Validate required fields
    let newErrors = { title: false, dueDate: false };

    if (!task.title.trim()) newErrors.title = true;
    if (!task.dueDate) newErrors.dueDate = true;

    // If any error exists, prevent submission
    if (newErrors.title || newErrors.dueDate) {
      setErrors(newErrors);
      return;
    }

    const formattedTask = {
      ...task,
      dueDate: task.dueDate
        ? dayjs(task.dueDate, "YYYY-MM-DD").format("YYYY-MM-DD")
        : "",
    };

    onAddTask(formattedTask);
    setTask({ title: "", description: "", dueDate: "", completed: false });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: 3,
          width: "90%",
          maxWidth: "450px",
          margin: "auto",
          marginTop: "5vh",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          position: "relative",
          "@media (max-width: 600px)": {
            padding: "1rem",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "gray",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Heading */}
        <Typography variant="h6" className="text-center font-semibold">
          {editingTask ? "Edit Task" : "Add New Task"}
        </Typography>

        {/* Task Input Fields */}
        <TextField
          label="Title"
          fullWidth
          name="title"
          value={task.title}
          onChange={handleChange}
          error={errors.title}
          helperText={errors.title ? "Title is required" : ""}
        />

        <TextField
          label="Description (Optional)"
          fullWidth
          multiline
          rows={3}
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        <TextField
          label="Due Date"
          type="date"
          fullWidth
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={errors.dueDate} // Highlight input field if error
          helperText={errors.dueDate ? "Due date is required" : ""}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            padding: "0.75rem",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Modal>
  );
}
