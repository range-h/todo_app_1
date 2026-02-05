'use client';
import { useLanguage } from '@/src/context/LanguageContext';

export default function TopBar() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <header className="w-full py-4 px-6 bg-white border-b flex justify-between items-center mb-6 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">
        {lang === 'zh' ? '智能待办' : 'Smart Todo'}
      </h1>
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full font-bold hover:bg-blue-50 cursor-pointer transition-all active:scale-95 text-sm"
      >
        {lang === 'zh' ? 'English' : '中文'}
      </button>
    </header>
  );
}