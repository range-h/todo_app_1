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

// ==============================
// GET /api/todos - 获取所有 todos
// ==============================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: '获取 todos 失败' },
      { status: 500 }
    );
  }
}

// ==============================
// POST /api/todos - 新增 todo
// ==============================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    // 校验输入
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Todo 内容不能为空' },
        { status: 400 }
      );
    }

    const newTodo = {
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('todos')
      .insert([newTodo])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: '创建 todo 失败' },
      { status: 500 }
    );
  }
}
