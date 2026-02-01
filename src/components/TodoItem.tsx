'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false); // 控制 AI 菜单显隐

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setError('');
  };

  const handleAiEnhance = async (option: string) => {
    if (!editText.trim()) return;
    setIsAiLoading(true);
    setShowAiMenu(false); // 选择后关闭菜单
    setError('');
    
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editText, option }),
      });
      if (!response.ok) throw new Error('AI 增强失败');
      const data = await response.json();
      if (data.enhancedText) setEditText(data.enhancedText);
    } catch (err) {
      setError('AI 助手暂时掉线了');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      setError('任务内容不能为空');
      return;
    }
    if (trimmedText !== todo.text) {
      onUpdate(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setError('');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '刚刚';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (Math.floor(diffMs / 3600000) < 24) return `${Math.floor(diffMs / 3600000)}小时前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className={`p-4 rounded-lg border-2 transition ${todo.completed ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
      {isEditing ? (
        <div className="space-y-3">
          {/* 输入框回归 */}
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            disabled={isAiLoading}
            className="w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none resize-none text-gray-900 font-medium"
            rows={2}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          
          <div className="flex justify-between items-center relative">
            {/* 点击触发的 AI 菜单 */}
            <div>
              <button
                type="button"
                onClick={() => setShowAiMenu(!showAiMenu)}
                disabled={isAiLoading}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold transition text-sm flex items-center gap-1 shadow-md disabled:opacity-50"
              >
                {isAiLoading ? '🪄 思考中...' : '⭐ AI Enhance'}
              </button>
              
              {showAiMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-44 bg-white border-2 border-purple-200 rounded-xl shadow-2xl overflow-hidden z-50">
                  <button onClick={() => handleAiEnhance('shorter')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-purple-50 border-b">✂️ 更简短</button>
                  <button onClick={() => handleAiEnhance('longer')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-purple-50 border-b">📝 更详细</button>
                  <button onClick={() => handleAiEnhance('professional')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-purple-50">💼 更专业</button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-bold transition text-sm">取消</button>
              <button onClick={handleSave} disabled={isAiLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition text-sm">保存</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer" />
          <div className="flex-1 min-w-0">
            <p className={`text-lg break-words font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{todo.text}</p>
            <p className="text-sm text-gray-400 mt-1">{formatDate(todo.created_at)}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {/* 找回原来的“编辑”和“删除”按钮质感 */}
            <button onClick={handleEdit} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition text-sm shadow-sm">编辑</button>
            <button onClick={() => confirm('确定删除?') && onDelete(todo.id)} className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition text-sm shadow-sm">删除</button>
          </div>
        </div>
      )}
    </div>
  );
}