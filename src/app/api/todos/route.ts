// import { NextResponse } from 'next/server';
// import { supabase } from '@/src/lib/supabase';

// // GET all todos
// export async function GET() {
//   try {
//     const { data, error } = await supabase
//       .from('todos')
//       .select('*')
//       .order('createdAt', { ascending: false });

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch todos' },
//       { status: 500 }
//     );
//   }
// }

// // POST - Create a new todo
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { text } = body;

//     if (!text || typeof text !== 'string' || text.trim().length === 0) {
//       return NextResponse.json(
//         { error: 'Todo text is required' },
//         { status: 400 }
//       );
//     }

//     const newTodo = {
//       text: text.trim(),
//       completed: false,
//       createdAt: new Date().toISOString(),
//     };

//     const { data, error } = await supabase
//       .from('todos')
//       .insert([newTodo])
//       .select()
//       .single();

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json(data, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to create todo' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

// PATCH - Update a todo
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { text, completed } = body;

    // 校验输入
    if ((text && typeof text !== 'string') || (completed !== undefined && typeof completed !== 'boolean')) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // 构建更新对象
    const updateData: any = {};
    if (text) updateData.text = text.trim();
    if (completed !== undefined) updateData.completed = completed;

    const { data, error } = await supabase
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

// DELETE - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Todo deleted', todo: data });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
