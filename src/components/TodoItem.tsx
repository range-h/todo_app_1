'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { useLanguage } from '@/src/context/LanguageContext'; // 【1. 引入钩子】

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
  // 【2. 获取翻译字典 t 】
  const { t , lang} = useLanguage(); 

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiMenu, setShowAiMenu] = useState(false);

  const aiMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setShowAiMenu(false);
      }
    };

    if (showAiMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAiMenu]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setError('');
  };

  const handleAiEnhance = async (option: string) => {
    if (!editText.trim()) return;
    
    setIsAiLoading(true);
    setShowAiMenu(false);
    setError('');
    
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 【关键修改】：将当前的 lang 传递给后端，以便 AI 决定回复中文还是英文
        body: JSON.stringify({ 
          text: editText, 
          option,
          language: lang  // 这里使用的是来自 useLanguage() 的变量
        }),
      });

      if (!response.ok) {
        // 尝试获取后端返回的具体错误信息
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI Enhance Failed');
      }

      const data = await response.json();
      
      if (data.enhancedText) {
        setEditText(data.enhancedText);
      }
    } catch (err: any) {
      console.error('AI Error:', err);
      // 使用字典中的错误提示
      setError(t.aiError); 
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      setError(t.emptyError); // 【使用翻译词条】
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

  // 格式化日期也需要处理（简单处理：如果是英文则返回英文格式）
  const formatDate = (dateString: string) => {
    if (!dateString) return t.loading.replace('🪄 ', ''); 
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    // 这里简单演示，你可以根据 lang 状态做更复杂的 Intl 处理
    if (diffMins < 1) return t.loading.includes('思考') ? '刚刚' : 'Just now';
    return date.toLocaleDateString();
  };

  return (
    <div className={`p-4 rounded-lg border-2 transition ${todo.completed ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
      {isEditing ? (
        <div className="space-y-3">
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
            <div ref={aiMenuRef}>
              <button
                type="button"
                onClick={() => setShowAiMenu(!showAiMenu)}
                disabled={isAiLoading}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-95 cursor-pointer font-bold transition text-sm flex items-center gap-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* 【使用翻译词条】 */}
                {isAiLoading ? t.loading : `⭐ ${t.aiEnhance}`}
              </button>
              
              {showAiMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-44 bg-white border-2 border-purple-200 rounded-xl shadow-2xl overflow-hidden z-50">
                  {/* 【使用翻译词条：shorter, longer, professional】 */}
                  <button onClick={() => handleAiEnhance('shorter')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-purple-50 border-b cursor-pointer transition-colors">{t.shorter}</button>
                  <button onClick={() => handleAiEnhance('longer')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-purple-50 border-b cursor-pointer transition-colors">{t.longer}</button>
                  <button onClick={() => handleAiEnhance('professional')} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-purple-50 cursor-pointer transition-colors">{t.professional}</button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer font-bold transition text-sm">
                {t.cancel} {/* 【使用翻译词条】 */}
              </button>
              <button onClick={handleSave} disabled={isAiLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer font-bold transition text-sm disabled:cursor-not-allowed">
                {t.save} {/* 【使用翻译词条】 */}
              </button>
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
            <button onClick={handleEdit} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-bold transition text-sm shadow-sm active:scale-95">
              {t.edit} {/* 【使用翻译词条】 */}
            </button>
            <button 
              onClick={() => confirm(t.confirmDelete) && onDelete(todo.id)} // 【弹窗提示词也字典化】
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer font-bold transition text-sm shadow-sm active:scale-95"
            >
              {t.delete} {/* 【使用翻译词条】 */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}