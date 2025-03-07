import {
  Typography,
  IconButton,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  deletingTaskId,
}) {
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
            className={`transition-all ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
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
        <IconButton
          color="primary"
          onClick={() => onEdit(task)}
          disabled={deletingTaskId === task._id}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => onDelete(task._id)}
          disabled={deletingTaskId === task._id}
        >
          {deletingTaskId === task._id ? (
            <CircularProgress size={20} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
}
