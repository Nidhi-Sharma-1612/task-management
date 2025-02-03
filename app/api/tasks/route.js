import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

// Create a new task
export async function POST(req) {
  try {
    await dbConnect();
    const { title, description, dueDate } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Convert dueDate to ISO format before storing in MongoDB
    const formattedDueDate = dueDate
      ? dayjs(dueDate, "YYYY-MM-DD").toISOString()
      : null;

    const newTask = await Task.create({
      title,
      description,
      dueDate: formattedDueDate,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/tasks:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all tasks and return dueDate in "YYYY-MM-DD" format for editing
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({});

    const formattedTasks = tasks.map((task) => ({
      ...task._doc,
      dueDate: task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD") : null, // Return for input field
    }));

    return NextResponse.json(formattedTasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
