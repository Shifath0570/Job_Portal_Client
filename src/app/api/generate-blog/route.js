import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
    try {
        const { title, category } = await req.json();

        if (!title) {
            return NextResponse.json({ success: false, message: "Title is required." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ success: false, message: "GEMINI_API_KEY is missing on the server." }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });

        const promptText = `Write a professional, detailed, and structured blog post for the following:
        - Title: "${title}"
        - Category: "${category || 'General'}"
        
        Format the response in clean Markdown format with headings, bullet points, and practical takeaways.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptText,
        });

        const textOutput = response.text || "";

        return NextResponse.json({ success: true, content: textOutput });
    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to generate AI content." }, { status: 500 });
    }
}