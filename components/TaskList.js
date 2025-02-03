import { Typography } from "@mui/material";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  deletingTaskId,
}) {
  return (
    <div className="sm:p-6 rounded-lg">
      {tasks.length === 0 ? (
        <Typography className="flex justify-center items-center text-gray-600 h-[50vh]">
          No tasks available. Click &quot;Add Task&quot; to create one.
        </Typography>
      ) : (
        <div className="flex flex-col space-y-3 overflow-y-auto max-h-[80vh] p-2 custom-scrollbar">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleComplete={onToggleComplete}
              deletingTaskId={deletingTaskId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
