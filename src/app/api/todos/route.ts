// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

// ==============================
// GET /api/todos/[id] - 获取单条 todo
// ==============================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // ✅ 最新 Next.js 写法，不是 Promise
) {
  const { id } = params;

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || 'Todo 未找到' },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

// ==============================
// PATCH /api/todos/[id] - 更新单条 todo
// ==============================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const { text, completed } = body;

  const { data, error } = await supabase
    .from('todos')
    .update({ text, completed })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || '更新失败' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// ==============================
// DELETE /api/todos/[id] - 删除单条 todo
// ==============================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || '删除失败' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
