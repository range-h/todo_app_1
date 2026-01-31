// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

// GET /api/todos/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 最新 App Router 要求 Promise
) {
  const { id } = await context.params; // 注意要 await

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Todo 未找到' }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PATCH /api/todos/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 必须是 Promise
) {
  const { id } = await context.params;
  const body = await request.json();
  const { text, completed } = body;

  const { data, error } = await supabase
    .from('todos')
    .update({ text, completed })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || '更新失败' }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE /api/todos/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 必须是 Promise
) {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || '删除失败' }, { status: 500 });
  }

  return NextResponse.json(data);
}
