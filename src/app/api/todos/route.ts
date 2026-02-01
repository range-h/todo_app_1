import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/src/lib/supabase'
import { auth } from "@clerk/nextjs/server" // 导入 Clerk 认证

// GET /api/todos
export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId) 
    .order('created_at', { ascending: false });

  if (error) {
    // 🚩 在终端查看这个打印！它会告诉你到底是列名错了还是权限问题
    console.error("Supabase Error:", error.message, error.details, error.hint);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/todos
export async function POST(request: NextRequest) {
  const { userId } = await auth(); // 获取当前登录用户 ID
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json()
  const { text } = body

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Todo text is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        text: text.trim(),
        completed: false,
        user_id: userId, // 🚩 核心：保存时记录该任务属于谁
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}