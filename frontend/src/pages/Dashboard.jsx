import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import StatsBar from '../components/StatsBar';
import {
  CheckSquare, Plus, LogOut, Search, Filter, LayoutDashboard
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (filters.status)   params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      const { data } = await axios.get('/api/tasks', { params });
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.priority]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/tasks/stats');
      setStats(data);
    } catch {}
  }, []);

  useEffect(() => { fetchTasks(); fetchStats(); }, [fetchTasks, fetchStats]);

  const handleSave = async (taskData) => {
    try {
      if (editTask) {
        const { data } = await axios.put(`/api/tasks/${editTask._id}`, taskData);
        setTasks(prev => prev.map(t => t._id === data._id ? data : t));
        toast.success('Task updated!');
      } else {
        const { data } = await axios.post('/api/tasks', taskData);
        setTasks(prev => [data, ...prev]);
        toast.success('Task created!');
      }
      fetchStats();
      setShowModal(false);
      setEditTask(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      fetchStats();
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const { data } = await axios.put(`/api/tasks/${task._id}`, { ...task, status: newStatus });
      setTasks(prev => prev.map(t => t._id === data._id ? data : t));
      fetchStats();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = tasks.filter(t =>
    !filters.search || t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    t.description?.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Hi, <strong>{user?.name}</strong></span>
            <button onClick={logout} className="btn-secondary text-sm py-1.5 px-3">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-blue-600" /> Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your tasks efficiently</p>
          </div>
          <button onClick={() => { setEditTask(null); setShowModal(true); }} className="btn-primary">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input className="input pl-9" placeholder="Search tasks..."
              value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
          </div>
          <select className="input sm:w-36" value={filters.status}
            onChange={e => setFilters({...filters, status: e.target.value})}>
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="input sm:w-36" value={filters.priority}
            onChange={e => setFilters({...filters, priority: e.target.value})}>
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <CheckSquare className="w-14 h-14 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-lg font-medium">No tasks found</p>
            <p className="text-gray-400 text-sm">Click "New Task" to get started</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(task => (
              <TaskCard key={task._id} task={task}
                onEdit={() => { setEditTask(task); setShowModal(true); }}
                onDelete={() => handleDelete(task._id)}
                onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <TaskModal task={editTask} onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTask(null); }} />
      )}
    </div>
  );
}
