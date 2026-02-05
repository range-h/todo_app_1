// src/app/page.tsx
'use client';

import { useAuth, SignInButton } from '@clerk/nextjs';
import TodoDashboard from '@/src/components/TodoDashboard';
import { useLanguage } from '@/src/context/LanguageContext'; // 【新增】引入

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const { t, lang } = useLanguage(); // 【新增】获取翻译字典

  // 1. 加载状态
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 2. 未登录判断
  if (!isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 p-4">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-sm w-full">
          <div className="text-6xl mb-6">🚀</div>
          
          {/* 【修改】主标题使用翻译 */}
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">
            {lang === 'zh' ? '欢迎使用 Todo App' : 'Welcome to Todo App'}
          </h1>
          
          {/* 【修改】副标题使用翻译 */}
          <p className="mb-8 text-gray-700 leading-relaxed">
            {lang === 'zh' ? (
              <>高效管理您的日常任务<br />请登录以同步您的清单</>
            ) : (
              <>Manage your tasks efficiently<br />Please sign in to sync your list</>
            )}
          </p>
          
          <div className="inline-block w-full transform transition-transform active:scale-95">
            <div className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all cursor-pointer">
              <SignInButton mode="modal">
                {/* 【修改】按钮文字 */}
                <span>{lang === 'zh' ? '立即进入' : 'Get Started'}</span>
              </SignInButton>
            </div>
          </div>
          
          <p className="mt-6 text-xs text-gray-400">
            Powered by Next.js & Clerk
          </p>
        </div>
      </div>
    );
  }

  // 3. 登录成功：显示业务主组件
  return <TodoDashboard />;
}