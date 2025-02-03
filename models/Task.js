import mongoose from "mongoose";
import dayjs from "dayjs";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: {
    type: String,
    set: (date) => (date ? dayjs(date, "YYYY-MM-DD").toISOString() : null),
  },
  completed: { type: Boolean, default: false },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
