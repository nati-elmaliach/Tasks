import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { NewTask } from '../types/task' 

interface TaskInputProps {
  onAdd: (task: NewTask) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }
    
    if (content.trim().length < 5) {
      setError('Content must be at least 5 characters long');
      return;
    }

    onAdd({
      title: title.trim(),
      content: content.trim(),
      status: 'pending'
    });

    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Task description"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      {error && (
        <div>{error}</div>
      )}
      <button
        type="submit"
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        <PlusCircle size={20} />
        Add Task
      </button>
    </form>
  );
};