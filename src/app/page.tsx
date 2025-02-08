// src/app/page.tsx
"use client";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import { useTaskStore } from "./hooks/useTaskStore";

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
        <TaskModal onTaskCreated={fetchTasks} />
      </div>

      {/* Task List */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Task List</h1>
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && tasks.length > 0 ? (
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}
