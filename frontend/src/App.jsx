import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

export default function App() {
  // Retrieve tasks from localStorage or load simple starter tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('simple_tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error("Error reading saved tasks", e);
      }
    }
    return [
      { id: '1', text: 'Welcome to your Task Manager!', completed: false },
      { id: '2', text: 'Tap the check circle to mark me done', completed: true },
      { id: '3', text: 'Delete a task with the trash icon', completed: false }
    ];
  });

  // Keep the browser local storage updated whenever tasks change
  useEffect(() => {
    localStorage.setItem('simple_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Create a brand new task
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text: text,
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  // Toggle completed status
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Permanently delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. Navigation Header */}
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-8">
        
        {/* 2. Task Creator Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* 3. Task List View */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Your Tasks ({tasks.length})
          </h2>
          <TaskList 
            tasks={tasks} 
            onToggleComplete={handleToggleComplete} 
            onDelete={handleDeleteTask} 
          />
        </div>

      </main>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600 tracking-tight">
          Taskly
        </h1>
      </div>
    </nav>
  );
}

function TaskForm({ onAddTask }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    onAddTask(inputText.trim());
    setInputText(''); // Reset field input
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="What's next on your list?"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-1 px-4 py-3 text-sm rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm transition-all"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-lg flex items-center justify-center gap-1 shadow-md shadow-indigo-500/10 transition-colors"
      >
        <Plus className="h-5 w-5" />
        Add
      </button>
    </form>
  );
}

function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 bg-white">
        <p className="text-sm text-slate-500 font-medium">All caught up!</p>
        <p className="text-xs text-slate-400 mt-1">Enjoy your free time or add a new task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 bg-white transition-all ${
            task.completed 
              ? 'border-slate-100 opacity-60' 
              : 'border-slate-200 shadow-sm hover:border-indigo-300'
          }`}
        >
          {/* Completion Toggle Button */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className="focus:outline-none flex-shrink-0"
          >
            {task.completed ? (
              <div className="bg-emerald-500 text-white rounded-full p-0.5 border border-emerald-500">
                <Check className="h-4.5 w-4.5 stroke-[3]" />
              </div>
            ) : (
              <div className="rounded-full w-5 h-5 border-2 border-slate-300 hover:border-indigo-500 transition-colors" />
            )}
          </button>

          {/* Task Text Content */}
          <span className={`flex-1 text-sm font-medium break-all ${
            task.completed ? 'line-through text-slate-400' : 'text-slate-700'
          }`}>
            {task.text}
          </span>

          {/* Trash Action Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}