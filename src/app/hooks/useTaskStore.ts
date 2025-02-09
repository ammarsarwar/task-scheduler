// src/app/hooks/useTaskStore.ts

import { PriorityQueue } from "@/utils/PriorityQueue";
import { useState, useEffect, useCallback } from "react";
import { useMemo } from "react";
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

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/tasks`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data: Task[] = await res.json();

      // Use the priority queue to sort tasks
      const priorityQueue = new PriorityQueue();
      data.forEach((task) => {
        priorityQueue.enqueue({
          id: task.id,
          title: task.title,
          priority: { HIGH: 1, MEDIUM: 2, LOW: 3 }[task.priority], // Convert priority to numeric value
          dueDate: new Date(task.dueDate), // Convert dueDate to Date object
        });
      });

      // Dequeue tasks to get them in priority order
      const sortedTasks: Task[] = [];
      while (priorityQueue.peek()) {
        const task = priorityQueue.dequeue();
        if (task) {
          // Find the original task object to retain all fields
          const originalTask = data.find((t) => t.id === task.id);
          if (originalTask) sortedTasks.push(originalTask);
        }
      }

      if (JSON.stringify(tasks) !== JSON.stringify(sortedTasks)) {
        setTasks(sortedTasks);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "ALL") return true;
      if (filter === "COMPLETED") return task.completed;
      if (filter === "INCOMPLETE") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

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
