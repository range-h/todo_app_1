// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/src/lib/supabase'

// GET /api/todos
export async function GET(request: NextRequest) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

// POST /api/todos
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { text } = body

  if (!text || typeof text !== 'string') {
    return NextResponse.json(
      { error: 'Todo text is required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        text: text.trim(),
        completed: false,
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data, { status: 201 })
}
