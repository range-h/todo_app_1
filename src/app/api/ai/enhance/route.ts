// src/app/api/ai/enhance/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 接收 text, option 以及新增的 language 参数
    const { text, option, language } = await req.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "未配置 DeepSeek 密钥" }, { status: 500 });
    }

    // 定义双语指令字典，确保 AI 接收到的命令语言与目标输出语言一致
    const prompts: Record<string, any> = {
      zh: {
        shorter: "请将以下待办事项改写得极其简短扼要。",
        longer: "请详细扩充以下待办事项，拆解成具体的步骤。",
        professional: "请将以下待办事项改写成正式的职场专业表达。",
        default: "请优化这个待办事项。"
      },
      en: {
        shorter: "Please rewrite the following todo item to be extremely concise.",
        longer: "Please expand the following todo item into detailed steps.",
        professional: "Please rewrite the following todo item into professional workplace language.",
        default: "Please optimize this todo item."
      }
    };

    // 根据传入的 language 获取对应的指令集，默认为中文
    const currentPrompts = prompts[language] || prompts.zh;
    const instruction = currentPrompts[option] || currentPrompts.default;

    // 动态设置系统提示词，强制约束输出语言
    const systemContent = language === 'en' 
      ? "You are a Todo list assistant. Rewrite the text based on instructions. Return ONLY the rewritten content without any explanation. Ensure the output is in English."
      : "你是一个 Todo 清单助手。请根据用户指令改写文本。只返回改写后的内容，不要有任何解释。确保输出结果为中文。";

    // DeepSeek 官方 API 地址
    const apiUrl = "https://api.deepseek.com/chat/completions";

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { 
            role: "system", 
            content: systemContent 
          },
          { 
            role: "user", 
            content: `${instruction}\n${language === 'en' ? 'Content' : '内容'}: "${text}"` 
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("DeepSeek Error:", data);
      return NextResponse.json({ error: "AI 暂时无法处理" }, { status: response.status });
    }

    // 提取并清理内容
    const enhancedText = data.choices[0].message.content.replace(/"/g, '').trim();
    
    return NextResponse.json({ enhancedText });

  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return NextResponse.json({ error: "网络连接失败" }, { status: 500 });
  }
}