'use client';

import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext'; // 【新增】引入钩子

interface TodoFilterProps {
  currentFilter: 'all' | 'active' | 'completed';
  onChange: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TodoFilter({ currentFilter, onChange }: TodoFilterProps) {
  const { t } = useLanguage(); // 【新增】获取翻译字典

  // 【修改】将 label 映射到字典中的 key
  const filters = [
    { value: 'all' as const, label: t.all },
    { value: 'active' as const, label: t.active },
    { value: 'completed' as const, label: t.completed },
  ];

  return (
    <div className="flex justify-center gap-3 mb-6">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          // 【修改】添加 cursor-pointer 和点击缩放效果 active:scale-95
          className={`px-4 py-2 rounded-full font-medium transition cursor-pointer active:scale-95 ${
            currentFilter === filter.value
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}