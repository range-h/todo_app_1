'use client';

import React from 'react';

interface TodoFilterProps {
  currentFilter: 'all' | 'active' | 'completed';
  onChange: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TodoFilter({ currentFilter, onChange }: TodoFilterProps) {
  const filters = [
    { value: 'all' as const, label: '全部' },
    { value: 'active' as const, label: '进行中' },
    { value: 'completed' as const, label: '已完成' },
  ];

  return (
    <div className="flex justify-center gap-3 mb-6">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-full font-medium transition ${
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
