import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

// GET 单个 todo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← 必须是 Promise
) {
  const { id } = await params;

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

// PATCH 更新 todo
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← 同样是 Promise
) {
  const { id } = await params;
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

// DELETE 删除 todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← Promise
) {
  const { id } = await params;

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
