'use client';

import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext'; // 【新增】引入钩子

interface TodoStatsProps {
  total: number;
  completed: number;
}

export default function TodoStats({ total, completed }: TodoStatsProps) {
  const { t } = useLanguage(); // 【新增】获取翻译字典

  return (
    <div className="flex justify-around bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-100">
      <div className="text-center">
        {/* 【修改】使用字典中的“总计” */}
        <p className="text-gray-600 font-medium">{t.total}</p>
        <p className="text-3xl font-bold text-blue-600">{total}</p>
      </div>
      <div className="text-center">
        {/* 【修改】使用字典中的“已完成” */}
        <p className="text-gray-600 font-medium">{t.completed}</p>
        <p className="text-3xl font-bold text-green-600">{completed}</p>
      </div>
      <div className="text-center">
        {/* 【修改】使用字典中的“进行中” */}
        <p className="text-gray-600 font-medium">{t.active}</p>
        <p className="text-3xl font-bold text-orange-600">{total - completed}</p>
      </div>
    </div>
  );
}