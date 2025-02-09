"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { useTaskStore } from "../hooks/useTaskStore";
import Spinner from "../components/Spinner";

const CalendarPage = () => {
  const { tasks, fetchTasks, loading, error } = useTaskStore();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const events = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        start: new Date(task.dueDate),
        allDay: true,
      }));

      // Only update state if the events have changed
      if (JSON.stringify(calendarEvents) !== JSON.stringify(events)) {
        setCalendarEvents(events);
      }
    }
  }, [tasks, calendarEvents]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto border rounded-md shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Task Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={(info) => {
          alert(`Task: ${info.event.title}\nDue Date: ${info.event.start}`);
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default CalendarPage;
