import { Pencil, Trash2, Calendar, Tag } from 'lucide-react';

const statusOptions = ['todo', 'in-progress', 'completed'];

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const statusClass = {
    'todo': 'badge-todo',
    'in-progress': 'badge-in-progress',
    'completed': 'badge-completed'
  }[task.status];

  const priorityClass = {
    'high': 'badge-high',
    'medium': 'badge-medium',
    'low': 'badge-low'
  }[task.priority];

  const borderColor = {
    'high': 'border-l-red-400',
    'medium': 'border-l-yellow-400',
    'low': 'border-l-green-400'
  }[task.priority];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`card border-l-4 ${borderColor} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className={`font-semibold text-gray-900 text-sm leading-snug flex-1 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={onEdit} className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={statusClass}>{task.status.replace('-', ' ')}</span>
        <span className={priorityClass}>{task.priority}</span>
        {task.category && task.category !== 'General' && (
          <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" />{task.category}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        {task.dueDate ? (
          <span className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
            <Calendar className="w-3 h-3" />
            {isOverdue ? 'Overdue · ' : ''}{new Date(task.dueDate).toLocaleDateString()}
          </span>
        ) : <span />}

        <select
          value={task.status}
          onChange={e => onStatusChange(task, e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {statusOptions.map(s => (
            <option key={s} value={s}>{s.replace('-', ' ')}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
