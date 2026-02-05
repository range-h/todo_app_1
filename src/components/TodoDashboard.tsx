'use client';

import React, { useState, useEffect } from 'react';
import TodoForm from '@/src/components/TodoForm';
import TodoList from '@/src/components/TodoList';
import TodoFilter from '@/src/components/TodoFilter';
import TodoStats from '@/src/components/TodoStats';
import { Todo } from '@/types/todo';
import { useLanguage } from '@/src/context/LanguageContext'; // 【1. 引入钩子】

export default function TodoDashboard() {
  const { t } = useLanguage(); // 【2. 获取翻译字典】
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data || []);
    } catch (err) {
      console.error('Failed to load todos:', err);
      // 【3. 修改错误提示为多语言】
      setError(t.aiError || 'Failed to load list'); 
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(t.emptyError || 'Failed to add');
    }
  };

  const updateTodo = async (id: number, text: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Failed to update');
      setTodos(todos.map(todo => todo.id === id ? { ...todo, text } : todo));
    } catch (err) {
      setError('Update failed');
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) throw new Error('Failed to toggle');
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (err) {
      setError('Action failed');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Delete failed');
    }
  };

  const getFilteredTodos = () => {
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  };

  if (isLoading) {
    // 【4. 加载文字多语言化】
    return <div className="flex justify-center items-center min-h-screen text-white">{t.loading}</div>;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <header className="text-center mb-8 border-b-4 border-blue-500 pb-6">
            {/* 【5. 标题与副标题字典化】 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.mainTitle}</h1>
            <p className="text-gray-700">{t.subTitle}</p>
          </header>
          
          {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          
          <TodoForm onAdd={addTodo} />
          <TodoFilter currentFilter={filter} onChange={setFilter} />
          <TodoList todos={filteredTodos} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
          <TodoStats total={todos.length} completed={todos.filter(t => t.completed).length} />
        </div>
      </div>
    </main>
  );
}