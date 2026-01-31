// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/src/lib/supabase'

// 正确：只有 request 一个参数！
export async function GET(request: NextRequest) {
  const { data, error } = await supabase.from('todos').select('*').order('created_at')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { data, error } = await supabase.from('todos').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}