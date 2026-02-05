// src/i18n/translations.ts

export const translations = {
  zh: {
    // --- Header & Login ---
    title: "智能待办",
    welcome: "欢迎",
    loginTitle: "欢迎使用 Todo App",
    loginSub: "高效管理您的日常任务，请登录以同步您的清单",
    loginBtn: "立即进入",

    // --- Dashboard & Main ---
    mainTitle: "📝 我的任务",
    subTitle: "管理你的日常任务",
    loading: "🪄 思考中...",
    
    // --- TodoForm ---
    addPlaceholder: "输入新任务...",
    addButton: "添加任务",
    
    // --- TodoFilter ---
    all: "全部",
    active: "进行中",
    completed: "已完成",
    
    // --- TodoItem Actions ---
    edit: "编辑",
    delete: "删除",
    save: "保存",
    cancel: "取消",
    confirmDelete: "确定删除吗？",
    
    // --- AI Enhance Menu ---
    aiEnhance: "AI 增强",
    shorter: "✂️ 更简短",
    longer: "📝 更详细",
    professional: "💼 更专业",
    
    // --- Stats ---
    total: "总计",
    
    // --- Errors ---
    emptyError: "任务内容不能为空",
    aiError: "AI 助手暂时掉线了",
  },
  en: {
    // --- Header & Login ---
    title: "Smart Todo",
    welcome: "Welcome",
    loginTitle: "Welcome to Todo App",
    loginSub: "Manage your tasks efficiently. Please sign in to sync your list.",
    loginBtn: "Get Started",

    // --- Dashboard & Main ---
    mainTitle: "📝 My Tasks",
    subTitle: "Manage your daily tasks",
    loading: "🪄 Thinking...",
    
    // --- TodoForm ---
    addPlaceholder: "Type a new task...",
    addButton: "Add Task",
    
    // --- TodoFilter ---
    all: "All",
    active: "Active",
    completed: "Done",
    
    // --- TodoItem Actions ---
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirmDelete: "Are you sure?",
    
    // --- AI Enhance Menu ---
    aiEnhance: "AI Enhance",
    shorter: "✂️ Shorter",
    longer: "📝 Detailed",
    professional: "💼 Professional",
    
    // --- Stats ---
    total: "Total",
    
    // --- Errors ---
    emptyError: "Content cannot be empty",
    aiError: "AI is currently offline",
  }
};

export type Language = 'zh' | 'en';