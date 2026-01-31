import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

// 定义标准的 Context 类型
type RouteContext = {
  params: Promise<{ id: string }>
}

// PATCH - Update or toggle a todo
export async function PATCH(
  request: NextRequest, // 建议使用 NextRequest
  context: RouteContext  // 必须使用 Promise 包装
) {
  try {
    // 【关键修改】必须 await 才能拿到 id
    const { id: rawId } = await context.params;
    const id = parseInt(rawId);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 });
    }

    const body = await request.json();
    const updates: { text?: string; completed?: boolean } = {};

    if (body.text !== undefined) {
      if (typeof body.text !== 'string' || body.text.trim().length === 0) {
        return NextResponse.json({ error: 'Invalid todo text' }, { status: 400 });
      }
      updates.text = body.text.trim();
    }

    if (body.completed !== undefined) {
      if (typeof body.completed !== 'boolean') {
        return NextResponse.json({ error: 'Invalid completed value' }, { status: 400 });
      }
      updates.completed = body.completed;
    }

    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

// DELETE - Delete a todo
export async function DELETE(
  request: NextRequest,
  context: RouteContext // 必须使用 Promise 包装
) {
  try {
    // 【关键修改】必须 await 才能拿到 id
    const { id: rawId } = await context.params;
    const id = parseInt(rawId);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid todo ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}