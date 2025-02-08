// src/app/components/TaskList.tsx

import { useState } from "react";
import { toast } from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  refreshTasks: () => void; // Callback to refresh the task list
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refreshTasks }) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // Track the task being edited
  const [formData, setFormData] = useState<Task | null>(null); // Form data for editing

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setFormData(task);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setFormData(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update task. Status: ${res.status}`);
      }

      toast.success("Task updated successfully!");
      setEditingTaskId(null);
      setFormData(null);
      refreshTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete task. Status: ${res.status}`);
      }

      toast.success("Task deleted successfully!");
      refreshTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };
const handleToggleComplete = async (id: string, completed: boolean) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/tasks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update task. Status: ${res.status}`);
    }

    toast.success("Task updated successfully!");
    refreshTasks(); // Refresh the task list
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task. Please try again.");
  }
};
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="mb-4 bg-gray-50 p-4 rounded-lg shadow-sm">
          {editingTaskId === task.id ? (
            <form onSubmit={handleSaveEdit}>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={formData?.title || ""}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData?.description || ""}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData?.dueDate || ""}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, dueDate: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={formData?.priority || "LOW"}
                  onChange={(e) =>
                    setFormData((prev) =>
                      prev ? { ...prev, priority: e.target.value } : null
                    )
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {/* Checkbox for Mark as Complete */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) =>
                    handleToggleComplete(task.id, e.target.checked)
                  }
                  className="h-5 w-5 accent-blue-500"
                />
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-600">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium">
                    Priority:{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === "HIGH"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
