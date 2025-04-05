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
    You are a literary recommendation expert.
    
    Given the following book description, return **exactly 3 different English novel titles** that are **similar in theme, narrative style, or setting** — but **not the same book**.
    
    ⚠️ Output only a clean, comma-separated list of titles — no numbering, no extra commentary, no quotes.
    
    Description:
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
