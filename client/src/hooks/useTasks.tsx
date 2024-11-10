import { useState, useCallback, useEffect } from 'react';
import { ITask, NewTask } from '../types/task';


const SERVER_URL = 'http://localhost:3000/api/tasks'
export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = useCallback((newTask: NewTask) => {
    const sendTask = async () => {
        await fetch(SERVER_URL, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
              'Content-Type': 'application/json',
          },
        });
        
        setTasks(prev => [...prev, {
            ...newTask,
            id: crypto.randomUUID()
          }]);
    }
    return sendTask()
  }, []);

  const deleteTask = useCallback((id: string) => {
    const deleteTask = async () => {
      try {
        await fetch(`${SERVER_URL}/${id}`, { method: "DELETE"})
        setTasks(prev => prev.filter(task => task._id !== id));  
      } catch (error) {
        // TODO handle error
      }
      
    }
    deleteTask()
  }, []);

  const cycleTaskStatus = useCallback((id: string) => {
    const statusCycle: Record<ITask['status'], ITask['status']> = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending'
    };

    const updateTask = async () => {
      const taskToUpdate = tasks.find(t => t._id === id)
      if (!taskToUpdate) {
        return; 
      }

      try {          
        // @ts-ignore
        taskToUpdate.status = statusCycle[taskToUpdate.status]
        await fetch(`${SERVER_URL}/${id}`, 
          {
            method: "PUT",
            body: JSON.stringify(taskToUpdate),
            headers: {
              'Content-Type': 'application/json',
          },
        }
        )
        setTasks([...tasks]);
      } catch (error) {
        // Handle error
      }
    }

    updateTask()
  }, [tasks]);

  const getTasksByStatus = useCallback(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || []).concat(task);
      return acc;
    }, {} as Record<ITask['status'], ITask[]>);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(SERVER_URL)
      const tasks = await response.json()
      setTasks(tasks)
    } catch (error) {
      // TODO handle
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  return {
    tasks,
    addTask,
    deleteTask,
    cycleTaskStatus,
    getTasksByStatus
  };
};