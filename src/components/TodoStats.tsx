'use client';

import React from 'react';

interface TodoStatsProps {
  total: number;
  completed: number;
}

export default function TodoStats({ total, completed }: TodoStatsProps) {
  return (
    <div className="flex justify-around bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-100">
      <div className="text-center">
        <p className="text-gray-600 font-medium">总计</p>
        <p className="text-3xl font-bold text-blue-600">{total}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">已完成</p>
        <p className="text-3xl font-bold text-green-600">{completed}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">进行中</p>
        <p className="text-3xl font-bold text-orange-600">{total - completed}</p>
      </div>
    </div>
  );
}
