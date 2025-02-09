// src/utils/PriorityQueue.ts

export class PriorityQueue {
  private heap: any[];

  constructor() {
    this.heap = [];
  }

  // Insert a task into the priority queue
  enqueue(task: {
    id: string;
    title: string;
    priority: number;
    dueDate: Date;
  }) {
    this.heap.push(task);
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the highest-priority task
  dequeue() {
    if (this.heap.length === 0) return null;

    const top = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  // Peek at the highest-priority task without removing it
  peek() {
    return this.heap[0] || null;
  }

  // Bubble up to maintain heap property
  private bubbleUp(index: number) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;

      // Swap elements
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];

      index = parentIndex;
    }
  }

  // Bubble down to maintain heap property
  private bubbleDown(index: number) {
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < length &&
        this.compare(this.heap[leftChildIndex], this.heap[smallest]) < 0
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.compare(this.heap[rightChildIndex], this.heap[smallest]) < 0
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      // Swap elements
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
    }
  }

  // Compare two tasks based on priority and due date
  private compare(a: any, b: any) {
    if (a.priority !== b.priority) {
      return a.priority - b.priority; // Lower priority values come first
    }
    return a.dueDate.getTime() - b.dueDate.getTime(); // Earlier due dates come first
  }
}
