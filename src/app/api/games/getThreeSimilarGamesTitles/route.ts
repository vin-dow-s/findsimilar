import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
    const { description } = await req.json()

    if (
        !description ||
        typeof description !== 'string' ||
        description.length < 20
    ) {
        return NextResponse.json(
            { error: 'Invalid or too short description' },
            { status: 400 },
        )
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
    })

    const prompt = `
    You are a video game expert, specialized in delivering highly relevant and insightful game recommendations.
    
    Given the following game title or description, suggest **exactly 3 different video game titles** that are similar in terms of **gameplay loop, world design, or immersive experience** — but **not the same game**. Don't return a game that has the same title, that is VERY IMPORTANT.
    
    🎯 Focus on:
    - Core gameplay mechanics
    - Narrative structure or progression system
    - Tone, universe, or emotional impact
    - Player experience (exploration, strategy, action, etc.)
    
    ❌ Avoid:
    - The same title
    - Direct sequels or remasters
    - Extremely obvious choices unless there’s a strong conceptual match
    
    ⚠️ Format your response as a clean, comma-separated list of 3 titles — no commentary, no numbering, no quotes.
    
    Game description:
    ${description}
    `


    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 64,
        })

        const content = response.choices?.[0]?.message?.content?.trim() || ''
        const titles = content.split(', ').filter(Boolean)

        return NextResponse.json({ titles })
    } catch (error) {
        console.error('OpenAI error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch similar titles' },
            { status: 500 },
        )
    }
}
