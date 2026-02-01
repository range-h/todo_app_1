// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { getAuth } from "@clerk/nextjs/server";

// 1. 核心改动：params 现在必须是一个 Promise
type RouteContext = {
  params: Promise<{ id: string }>;
};

// PATCH - 更新 todo
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. 核心改动：必须先 await params
  const { id: rawId } = await params;
  const id = parseInt(rawId);

  if (isNaN(id)) return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });

  const body = await req.json();
  const updates: { text?: string; completed?: boolean } = {};
  if (body.text !== undefined) updates.text = body.text.trim();
  if (body.completed !== undefined) updates.completed = body.completed;

  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE - 删除 todo
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. 核心改动：必须先 await params
  const { id: rawId } = await params;
  const id = parseInt(rawId);

  if (isNaN(id)) return NextResponse.json({ error: "Invalid todo ID" }, { status: 400 });

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}