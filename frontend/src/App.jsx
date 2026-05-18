import React from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

export default function App() {
  const tasks = [
    { id: '1', text: 'Learn YAML syntax basics', completed: false },
    { id: '2', text: 'Understand YAML lists and maps', completed: false },
    { id: '3', text: 'Build a frontend project', completed: true }
  ];

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      
      {/* Sleek, Great UI Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-black tracking-tight text-indigo-600">Taskly</h1>
      </div>
      

      {/* The Tweak: Focus Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
        <p className="text-xs text-amber-700 font-medium">
          ⚠️ Buttons are static! UI is kept simple because the focus is strictly on learning <strong>YAML</strong> right now.
        </p>
      </div>


      {/* Modern Input Group */}
      <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
        <input 
          type="text" 
          placeholder="What's next on the list?..." 
          className="flex-1 px-3 py-2 text-sm outline-none bg-transparent" 
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-1 transition-all shadow-sm">
          <Plus size={16}/> Add
        </button>
      </div>


      {/* Clean Task List */}
      <div className="space-y-2.5">
        {tasks.map(task => (
          <div key={task.id} className="p-4 rounded-xl bg-white border border-slate-100 flex items-center justify-between shadow-sm hover:border-indigo-100 transition-all">
            <div className="flex items-center gap-3">
              {task.completed ? (
                <div className="bg-emerald-500 text-white rounded-full p-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
              ) : (
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
              )}
              <span className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {task.text}
              </span>
            </div>
            <button className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-50 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}