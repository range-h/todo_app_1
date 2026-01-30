'use client';

import React, { useState, useEffect } from 'react';
import TodoForm from '@/src/components/TodoForm';
import TodoList from '@/src/components/TodoList';
import TodoFilter from '@/src/components/TodoFilter';
import TodoStats from '@/src/components/TodoStats';
import { Todo } from '@/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/todos');
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json();
      setTodos(data || []);
    } catch (err) {
      console.error('Failed to load todos:', err);
      setError('Failed to load todos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error('Failed to add todo:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const updateTodo = async (id: number, text: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      ));
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      setError('Failed to toggle todo. Please try again.');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <header className="text-center mb-8 border-b-4 border-blue-500 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📝 我的任务</h1>
            <p className="text-gray-700">管理你的日常任务</p>
          </header>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Add Todo Form */}
          <TodoForm onAdd={addTodo} />

          {/* Filter Buttons */}
          <TodoFilter currentFilter={filter} onChange={setFilter} />

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />

          {/* Stats */}
          <TodoStats
            total={todos.length}
            completed={todos.filter(t => t.completed).length}
          />
        </div>
      </div>
    </main>
  );
}
