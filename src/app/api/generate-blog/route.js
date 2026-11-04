import { NextResponse } from "next/server";

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

        const promptText = `Write a professional, detailed, and structured blog post for the following:
        - Title: "${title}"
        - Category: "${category || 'General'}"
        
        Format the response in clean Markdown format with headings, bullet points, and practical takeaways.`;

        // Call the Gemini API directly via REST endpoint (gemini-2.5-flash)
        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                }),
            }
        );

        const data = await geminiRes.json();

        if (!geminiRes.ok) {
            throw new Error(data.error?.message || "Failed to generate content from Gemini API.");
        }

        const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        return NextResponse.json({ success: true, content: textOutput });
    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to generate AI content." }, { status: 500 });
    }
}
