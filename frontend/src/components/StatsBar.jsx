import { ListTodo, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function StatsBar({ stats }) {
  const items = [
    { label: 'Total', value: stats.total || 0, icon: ListTodo, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'To Do', value: stats.todo || 0, icon: ListTodo, color: 'gray', bg: 'bg-gray-50', text: 'text-gray-500' },
    { label: 'In Progress', value: stats.inProgress || 0, icon: Clock, color: 'orange', bg: 'bg-orange-50', text: 'text-orange-500' },
    { label: 'Completed', value: stats.completed || 0, icon: CheckCircle, color: 'green', bg: 'bg-green-50', text: 'text-green-600' },
    { label: 'High Priority', value: stats.high || 0, icon: AlertCircle, color: 'red', bg: 'bg-red-50', text: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      {items.map(({ label, value, icon: Icon, bg, text }) => (
        <div key={label} className={`card ${bg} border-0 flex items-center gap-3`}>
          <Icon className={`w-5 h-5 ${text} flex-shrink-0`} />
          <div>
            <p className={`text-xl font-bold ${text}`}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
