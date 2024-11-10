import React, { useCallback } from 'react';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { useTasks } from '../hooks/useTasks';

export const TaskManager: React.FC = () => {
  const { tasks, addTask, deleteTask, cycleTaskStatus, getTasksByStatus } = useTasks();
  const tasksByStatus = getTasksByStatus();

  const getSubText = useCallback(() => {
    return !tasks.length ? 'No tasks yet, lets add a new one!' : `${tasks.length} Tasks`
  }, [tasks])

  const subText = getSubText();
  
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col w-2/4'>
          <div className='mb-10'>{subText}</div>
          <TaskInput onAdd={addTask} />
        </div>
        <div className='w-2/4'>
        {(['pending', 'in-progress', 'completed'] as const).map(status => (
          tasksByStatus[status]?.length > 0 && (
            <div key={status} className="mb-8 p-6 ">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {status.replace('-', ' ')} Tasks
              </h2>
              {tasksByStatus[status].map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onStatusChange={cycleTaskStatus}
                />
              ))}
            </div>
          )
        ))}
        </div>
        </div>
    </div>
  );
};