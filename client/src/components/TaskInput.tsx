import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { NewTask } from '../types/task' 

interface TaskInputProps {
  onAdd: (task: NewTask) => Promise<void>;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await onAdd({ title: title.trim(), content: content.trim(), status: 'pending'});    
    } catch (error) {
        console.log(error)
    }

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