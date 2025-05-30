import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
    const { description } = await req.json()

    if (
        !description ||
        typeof description !== 'string' ||
        description.length < 40
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
    You're a book recommendation expert.
    
    Given the following book title or description, suggest **exactly 3 different English-language book titles** that are similar in terms of **themes, writing style, or reader experience** — but **not the same book**. Don't return a book that has the same title, that is VERY IMPORTANT.
    
    🎯 Focus on:
    - Core subject matter or philosophical depth
    - Narrative structure, tone, or voice
    - Purpose and reader impact (entertainment, learning, reflection)
    - Genre, setting, or conceptual framing
    
    ❌ Avoid:
    - The same title
    - Books from the same series
    - Extremely obvious choices unless there's a strong conceptual match
    
    ⚠️ Format your response as a clean, comma-separated list of 3 titles — no commentary, no numbering, no quotes.
    
    Book description:
    ${description}
    `


    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 64,
        })

        const titles =
            response.choices?.[0]?.message?.content?.trim().split(', ') || []

        return NextResponse.json({ titles })
    } catch (error) {
        console.error('OpenAI error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch similar titles' },
            { status: 500 },
        )
    }
}
