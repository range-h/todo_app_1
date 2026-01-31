'use client';

import React, { useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setError('');
  };

  const handleSave = () => {
    const trimmedText = editText.trim();

    if (!trimmedText) {
      setError('任务内容不能为空');
      return;
    }

    if (trimmedText.length > 200) {
      setError('任务内容不能超过200个字符');
      return;
    }

    if (trimmedText !== todo.text) {
      onUpdate(todo.id, trimmedText);
    }

    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setError('');
  };

  const handleDelete = () => {
    if (confirm('确定要删除这个任务吗?')) {
      onDelete(todo.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;

    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 transition ${
        todo.completed
          ? 'bg-gray-100 border-gray-200 opacity-75'
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            rows={2}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <div className="flex-1 min-w-0">
            <p
              className={`text-lg break-words ${
                todo.completed
                  ? 'line-through text-gray-500'
                  : 'text-gray-900'
              }`}
            >
              {todo.text}
            </p>
            <p className="text-sm text-gray-600 mt-1">{formatDate(todo.createdAt)}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleEdit}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition text-sm"
            >
              编辑
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition text-sm"
            >
              删除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
