'use client';

import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedText = text.trim();

    if (!trimmedText) {
      setError('请输入任务内容');
      return;
    }

    if (trimmedText.length > 200) {
      setError('任务内容不能超过200个字符');
      return;
    }

    onAdd(trimmedText);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入新任务..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-900 placeholder-gray-500"
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition transform"
        >
          添加任务
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>
      )}
    </form>
  );
}
