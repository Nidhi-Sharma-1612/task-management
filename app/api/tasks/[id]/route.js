import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

// Update Task (Title, Description, Due Date, and Completion Status)
export async function PATCH(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const { title, description, dueDate, completed } = await req.json();

    // Ensure dueDate is stored in ISO format
    const formattedDueDate = dueDate
      ? dayjs(dueDate, "YYYY-MM-DD").toISOString()
      : null;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate: formattedDueDate, completed },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH /api/tasks:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Task
export async function DELETE(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
