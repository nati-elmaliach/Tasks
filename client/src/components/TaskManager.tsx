import React from 'react';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { useTasks } from '../hooks/useTasks';

export const TaskManager: React.FC = () => {
  const { addTask, deleteTask, cycleTaskStatus, getTasksByStatus } = useTasks();
  const tasksByStatus = getTasksByStatus();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <TaskInput onAdd={addTask} />
      
      {(['pending', 'in-progress', 'completed'] as const).map(status => (
        tasksByStatus[status]?.length > 0 && (
          <div key={status} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {status.replace('-', ' ')} Tasks
            </h2>
            {tasksByStatus[status].map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onStatusChange={cycleTaskStatus}
              />
            ))}
          </div>
        )
      ))}
    </div>
  );
};