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
  }, [editingTask, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
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
          width: "90%", // Responsive width for smaller screens
          maxWidth: "450px", // Limits max width for desktop view
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
        />

        <TextField
          label="Description"
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
