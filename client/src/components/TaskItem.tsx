import React from 'react';
import { CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';
import { ITask } from '../types/task';

interface TaskItemProps {
  task: ITask;
  onDelete: (id: string) => void;
  onStatusChange: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange }) => {
  const statusColors = {
    pending: 'bg-yellow-100 border-yellow-200',
    'in-progress': 'bg-blue-100 border-blue-200',
    completed: 'bg-green-100 border-green-200'
  };

  const StatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-blue-500" size={20} />;
      default:
        return <Circle className="text-yellow-500" size={20} />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${statusColors[task.status]} mb-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => onStatusChange(task._id)}>
            <StatusIcon />
          </button>
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.content}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};