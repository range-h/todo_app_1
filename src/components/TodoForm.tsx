'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/src/context/LanguageContext'; // 【新增】引入钩子

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const { t, lang } = useLanguage(); // 【新增】获取翻译字典
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedText = text.trim();

    if (!trimmedText) {
      // 【修改】使用字典中的空内容提示
      setError(t.emptyError || (lang === 'zh' ? '请输入任务内容' : 'Please enter content'));
      return;
    }

    if (trimmedText.length > 200) {
      // 【修改】使用字典中的长度限制提示
      setError(lang === 'zh' ? '任务内容不能超过200个字符' : 'Max 200 characters allowed');
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
          // 【修改】使用字典中的占位符
          placeholder={t.addPlaceholder}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-900 placeholder-gray-500"
          autoComplete="off"
        />
        <button
          type="submit"
          // 【修改】加上 cursor-pointer 满足老师的交互要求
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition transform cursor-pointer active:scale-95"
        >
          {/* 【修改】使用字典中的按钮文字 */}
          {t.addButton}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 animate-pulse">{error}</p>
      )}
    </form>
  );
}