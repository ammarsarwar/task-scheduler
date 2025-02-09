// src/app/page.tsx
"use client";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import { useTaskStore } from "./hooks/useTaskStore";
import Link from "next/link";
import Spinner from "./components/Spinner";

export default function Home() {
  const { tasks, loading, error, fetchTasks, filter, setFilter } =
    useTaskStore();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Task Modal */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          {/* Filter Buttons */}
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-md ${
              filter === "ALL"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Show All
          </button>
          <button
            onClick={() => setFilter("COMPLETED")}
            className={`px-4 py-2 rounded-md ${
              filter === "COMPLETED"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Show Completed
          </button>
          <button
            onClick={() => setFilter("INCOMPLETE")}
            className={`px-4 py-2 rounded-md ${
              filter === "INCOMPLETE"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Show Incomplete
          </button>
        </div>
        <div className="flex gap-2">
          {/* <Link
            href="/calendar"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            View Calendar
          </Link>
          <Link
            href="/analytics"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-purple-600"
          >
            View Analytics
          </Link> */}
          <TaskModal onTaskCreated={fetchTasks} />
        </div>
      </div>

      {/* Task List */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Task List</h1>

        {/* Show Spinner While Loading */}
        {loading && <Spinner />}

        {/* Show Error Message if There's an Error */}
        {error && !loading && <p className="text-red-500">{error}</p>}

        {/* Show Task List if Tasks Exist and Not Loading */}
        {!loading && tasks.length > 0 && (
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
        )}

        {/* Show "No Tasks Found" Only After Loading Completes */}
        {!loading && tasks.length === 0 && <p>No tasks found.</p>}
      </div>
    </div>
  );
}
