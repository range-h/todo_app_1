"use client"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { useLanguage } from '@/src/context/LanguageContext'; // 【新增】引入语言钩子

export default function Header() {
  const { user } = useUser()
  // 【新增】获取当前语言状态和切换函数
  const { lang, toggleLanguage, t } = useLanguage()

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      borderBottom: '1px solid #ccc',
      alignItems: 'center' // 确保垂直对齐
    }}>
      {/* 【修改】标题支持多语言 */}
      <h1 style={{ margin: 0 }}>{t.title || "My TODO App"}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* 【新增】语言切换按钮 */}
        <button 
          onClick={toggleLanguage}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            border: '1px solid #0070f3',
            background: 'transparent',
            color: '#0070f3',
            cursor: 'pointer', // 老师要求的 hover 手势
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          {lang === 'zh' ? 'English' : '中文'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* 【修改】欢迎语支持多语言 */}
            <span>{lang === 'zh' ? '欢迎' : 'Welcome'}, {user.firstName}</span>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            {/* 【修改】登录按钮文字和手势 */}
            <button style={{ cursor: 'pointer' }}>
              {lang === 'zh' ? '登录' : 'Sign In'}
            </button>
          </SignInButton>
        )}
      </div>
    </header>
  )
}