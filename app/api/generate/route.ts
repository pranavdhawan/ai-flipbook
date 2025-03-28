const { GoogleGenAI } = require("@google/genai");
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store in .env file
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(request: Request) {
    const contents = `Create an image of a scene described in a book. 
    Visualize this scene in a highly detailed, realistic style.
    Don't include any text in the image. Give me only an image describing the scene.
                    `;

    const { prompt } = await request.json();
    if (!prompt) {
        prompt.push(contents);
    }

    try {
        // Set responseModalities to include "Image" so the model can generate  an image
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: prompt,
            config: {
                responseModalities: ['Text', 'Image']
            },
        });
        for (const part of response.candidates[0].content.parts) {
            // Based on the part type, either show the text or save the image
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
