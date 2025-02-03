import { Typography, IconButton, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <div className="border p-3 rounded-lg flex items-center justify-between">
      {/* Checkbox & Task Details */}
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          color="primary"
        />
        <div>
          <Typography
            variant="h6"
            className={task.completed ? "line-through text-gray-500" : ""}
          >
            {task.title}
          </Typography>
          <Typography variant="body2">{task.description}</Typography>
          <Typography variant="caption" className="text-gray-500">
            Due:{" "}
            {task.dueDate
              ? dayjs(task.dueDate, "YYYY-MM-DD").format("DD-MM-YYYY")
              : "No due date"}
          </Typography>
        </div>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="flex space-x-2">
        <IconButton color="primary" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(task._id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
