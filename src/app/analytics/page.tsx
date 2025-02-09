// src/app/analytics/page.tsx

"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTaskStore } from "../hooks/useTaskStore";
import Spinner from "../components/Spinner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPage = () => {
  const { tasks, fetchTasks, loading, error } = useTaskStore();
  const [productivityData, setProductivityData] = useState<any[]>([]);
  const [priorityData, setPriorityData] = useState<any[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const weeklyData = calculateWeeklyCompletion(tasks);
      setProductivityData(weeklyData);

      const priorityCounts = calculatePriorityDistribution(tasks);
      setPriorityData(priorityCounts);
    }
  }, [tasks]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const overdueTasks = tasks.filter(
    (task) =>
      !task.completed && new Date(task.dueDate).getTime() < new Date().getTime()
  ).length;

  return (
    <div className="p-4 max-w-6xl mx-auto border rounded-md shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Analytics Dashboard
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-md text-center shadow-md">
          <p className="text-lg font-bold">Total Tasks</p>
          <p className="text-2xl">{totalTasks}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md text-center shadow-md">
          <p className="text-lg font-bold">Completed Tasks</p>
          <p className="text-2xl">{completedTasks}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-md text-center shadow-md">
          <p className="text-lg font-bold">Overdue Tasks</p>
          <p className="text-2xl">{overdueTasks}</p>
        </div>
      </div>

      {/* Productivity Trends Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Productivity Trends</h2>
        {productivityData.length > 0 ? (
          <BarChart
            width={800}
            height={400}
            data={productivityData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        ) : (
          <p className="text-gray-500">No completed tasks to display.</p>
        )}
      </div>

      {/* Priority Distribution Chart */}
      <div>
        <h2 className="text-xl font-bold mb-4">Priority Distribution</h2>
        {priorityData.length > 0 ? (
          <PieChart width={500} height={300}>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              innerRadius={60} // Add an inner radius for a donut chart
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              paddingAngle={5} // Add padding between slices
              label={({ name, value, percent }) =>
                percent > 0
                  ? `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                  : null
              }
              labelLine={true} // Enable label lines for better readability
            >
              {priorityData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend /> {/* Add a legend for clarity */}
          </PieChart>
        ) : (
          <p className="text-gray-500">No priority data available.</p>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate weekly completion
const calculateWeeklyCompletion = (tasks: any[]) => {
  const weeklyData: { week: string; completed: number }[] = [];
  const now = new Date();

  for (let i = 0; i < 4; i++) {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (i * 7 + now.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const completed = tasks.filter(
      (task) =>
        task.completed &&
        new Date(task.dueDate).getTime() >= startOfWeek.getTime() &&
        new Date(task.dueDate).getTime() <= endOfWeek.getTime()
    ).length;

    weeklyData.push({
      week: `Week ${i + 1}`,
      completed,
    });
  }

  return weeklyData.reverse();
};

// Helper function to calculate priority distribution
const calculatePriorityDistribution = (tasks: any[]) => {
  const priorityOrder = ["HIGH", "MEDIUM", "LOW"];
  return priorityOrder
    .map((priority) => ({
      name: priority,
      count: tasks.filter((task) => task.priority === priority).length,
    }))
    .filter((item) => item.count > 0); // Exclude priorities with zero tasks
};

export default AnalyticsPage;
