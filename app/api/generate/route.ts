import { GoogleGenerativeAI } from "@google/generai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(request: Request) {
    const { prompt } = await request.json();

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: prompt,
            config: {
                responseModalities: ['Text', 'Image']
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const imageData = part.inlineData.data;
                return NextResponse.json({
                    image: `data:image/png;base64,${imageData}`
                });
            }
        }
        return NextResponse.json({ error: 'No image generated' }, { status: 400 });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
}

