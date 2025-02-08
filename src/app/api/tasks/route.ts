// src/app/api/tasks/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST: Create a new task
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || null,
        dueDate: new Date(body.dueDate),
        priority: body.priority,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

// PUT: Update a task
export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const updatedTask = await prisma.task.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description || null,
        dueDate: new Date(body.dueDate),
        priority: body.priority,
        completed: body.completed,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a task
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Get the ID from query parameters

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    await prisma.task.delete({
      where: { id }, // Ensure `id` is a string (not null)
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

// PATCH: Update task completion status
export async function PATCH(request: Request) {
  const body = await request.json();
  try {
    const updatedTask = await prisma.task.update({
      where: { id: body.id },
      data: {
        completed: body.completed,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}