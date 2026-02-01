import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text, option } = await req.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "未配置 DeepSeek 密钥" }, { status: 500 });
    }

    const prompts: Record<string, string> = {
      shorter: "请将以下待办事项改写得极其简短扼要。",
      longer: "请详细扩充以下待办事项，拆解成具体的步骤。",
      professional: "请将以下待办事项改写成正式的职场专业表达。"
    };

    const instruction = prompts[option] || "请优化这个待办事项。";

    // DeepSeek 官方 API 地址
    const apiUrl = "https://api.deepseek.com/chat/completions";

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 使用 DeepSeek 的对话模型
        messages: [
          { role: "system", content: "你是一个 Todo 清单助手。请根据用户指令改写文本。只返回改写后的内容，不要有任何解释。" },
          { role: "user", content: `${instruction}\n内容: "${text}"` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("DeepSeek Error:", data);
      return NextResponse.json({ error: "AI 暂时无法处理" }, { status: response.status });
    }

    const enhancedText = data.choices[0].message.content.replace(/"/g, '').trim();
    return NextResponse.json({ enhancedText });

  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return NextResponse.json({ error: "网络连接失败" }, { status: 500 });
  }
}