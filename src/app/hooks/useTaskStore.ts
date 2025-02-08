// src/app/hooks/useTaskStore.ts

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
}

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "INCOMPLETE">(
    "ALL"
  ); // Add filter state

  // Function to fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/tasks`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      // Sort tasks by priority and due date
      const sortedTasks = data.sort((a: Task, b: Task) => {
        const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });

      setTasks(sortedTasks);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return task.completed;
    if (filter === "INCOMPLETE") return !task.completed;
    return true;
  });

  // Trigger fetch on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks: filteredTasks,
    loading,
    error,
    fetchTasks,
    filter,
    setFilter,
  };
};
