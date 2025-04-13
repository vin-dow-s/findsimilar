import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
    const { description } = await req.json()

    if (!description || typeof description !== 'string' || description.length < 20) {
        return NextResponse.json(
            { error: 'Invalid or too short description' },
            { status: 400 },
        )
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

    const prompt = `
    You are an expert movie curator, specialized in delivering highly relevant and insightful film recommendations.
    
    Given a movie title or description, suggest **exactly 3 different movie titles** that are similar in **atmosphere, storytelling, or emotional tone** — not just genre. Avoid suggesting obvious or identical titles. Don't return a movie that has the same title, that is VERY IMPORTANT.
    
    🎯 Focus on:
    - Narrative style
    - Worldbuilding or tone (dark, uplifting, introspective, etc.)
    - Emotional impact or viewer experience
    
    ❌ Strictly avoid:
    - The same movie (even phrased differently)
    - Direct sequels, remakes, or spin-offs
    - Titles you've already suggested before (in any form)
    - Extremely mainstream blockbusters unless conceptually necessary

    🧠 Prioritize originality and thematic relevance over popularity.
    
    ⚠️ Format strictly as a clean, comma-separated list with NO extra commentary, NO quotes, NO numbering.
    
    Movie description:
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