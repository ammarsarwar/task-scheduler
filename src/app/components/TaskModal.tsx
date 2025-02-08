// src/app/components/TaskModal.tsx
"use client"
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";

interface TaskModalProps {
  onTaskCreated: () => void; // Callback to refresh the task list
}

const TaskModal: React.FC<TaskModalProps> = ({ onTaskCreated }) => {
  const [open, setOpen] = useState(false); // State to manage modal visibility

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Create Task
        </button>
      </Dialog.Trigger>

      {/* Modal Content */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white p-6 rounded-lg shadow-lg z-50">
          <Dialog.Title className="text-xl font-bold mb-4">
            Create New Task
          </Dialog.Title>
          <TaskForm
            onTaskCreated={() => {
              onTaskCreated(); // Refresh the task list
              setOpen(false); // Close the modal
            }}
          />
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TaskModal;
