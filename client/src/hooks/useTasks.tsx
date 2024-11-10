import { useState, useCallback } from 'react';
import { ITask, NewTask } from '../types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = useCallback((newTask: NewTask) => {
    setTasks(prev => [...prev, {
      ...newTask,
      id: crypto.randomUUID()
    }]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const cycleTaskStatus = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task;
      
      const statusCycle: Record<ITask['status'], ITask['status']> = {
        'pending': 'in-progress',
        'in-progress': 'completed',
        'completed': 'pending'
      };
      
      return {
        ...task,
        status: statusCycle[task.status]
      };
    }));
  }, []);

  const getTasksByStatus = useCallback(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || []).concat(task);
      return acc;
    }, {} as Record<ITask['status'], ITask[]>);
  }, [tasks]);

  return {
    tasks,
    addTask,
    deleteTask,
    cycleTaskStatus,
    getTasksByStatus
  };
};