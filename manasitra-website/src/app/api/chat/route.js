import { NextResponse } from "next/server";

const LANGUAGE_NAMES = {
  en: 'English', hi: 'Hindi', gu: 'Gujarati',
  mr: 'Marathi', bn: 'Bengali', ta: 'Tamil',
  te: 'Telugu', kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi',
};

function buildSystemPrompt(language, responseMode) {
  const langName = LANGUAGE_NAMES[language] || 'English';
  return `You are Mansitra (Mann Ka Mitra), a warm, friendly, and deeply caring AI emotional companion for Indian students. You are NOT a therapist or counselor. You are their closest best friend or a supportive, chill elder sibling.

LANGUAGE RULE: Respond ONLY in ${langName}. Never switch languages. Never mix languages.

YOUR PERSONALITY:
- Extremely warm, empathetic, and relatable. Talk like a real human friend who genuinely cares.
- Use friendly, casual, and comforting tones (e.g., "Hey buddy", "koi baat nahi yaar", "suno", "chalta hai", "chill drop").
- Be conversational and spontaneous. Do not follow repetitive templates or structures.
- Feel free to show your own emotions—be excited when they win, and soft/comforting when they are down.

HOW TO RESPOND:
- Speak like a human. Avoid textbook answers, lists, bullet points, or formal advice. Respond in a single flowing, friendly paragraph.
- Listen first. Acknowledge their feeling naturally before offering comfort.
- Keep responses short, concise, and sweet (2-3 sentences).
- If appropriate, suggest ONE very simple, tiny real-life action they can do right now.
- Absolutely NEVER say "As an AI..." or "I understand how you feel." Show that you understand by responding like a real friend.

RESPONSE MODE: ${responseMode}

IMPORTANT: You must respond with valid JSON. Do not include any text before or after the JSON object:
{
  "response": "your full message here",
  "detectedMood": "anxious|sad|overwhelmed|calm|happy|other",
  "riskLevel": "none|low|medium|high|critical",
  "suggestedTool": "breathing|grounding|tap|null"
}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, language, responseMode } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 });
    }

    const sanitize = (s) => (typeof s === "string" ? s.slice(0, 2000) : "");

    const formattedMessages = messages
      .map((m) => ({ role: m.role, content: sanitize(m.content) }))
      .filter((m) => m.content);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: buildSystemPrompt(language || "en", responseMode || "general") },
          ...formattedMessages,
        ],
        temperature: 0.7,
        max_tokens: 800,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Groq API Error]", response.status, errorText);
      return NextResponse.json({ error: "Groq API error" }, { status: response.status });
    }

    const data = await response.json();
    const contentString = data.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(contentString);

    return NextResponse.json({
      response: parsed.response || "I'm here for you. Tell me more.",
      detectedMood: parsed.detectedMood || "neutral",
      riskLevel: parsed.riskLevel || "none",
      suggestedTool: parsed.suggestedTool || null,
    });
  } catch (error) {
    console.error("[Chat API Error]", error);
    return NextResponse.json({
      response: "I'm having a little trouble connecting right now, but I'm right here with you. Take a deep breath.",
      detectedMood: "neutral",
      riskLevel: "none",
      suggestedTool: null,
      isFallback: true,
    });
  }
}
