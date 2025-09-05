
import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export async function POST(req) {
  try {
    const { messages, selection, mode, editorContent } = await req.json()

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

  //fix grammar/rewrite api
    if (mode === "edit" || selection) {
      const targetText = selection || editorContent || ""

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Correct grammar, spelling, and clarity in the following text. 
Return ONLY the corrected version, without explanations, notes, or extra words:\n\n${targetText}`,
      })

   
      let edit = (response.text || "").trim()
      edit = edit
        .replace(/^["']|["']$/g, "") 
        .replace(/^Here.*?:/i, "")   
        .trim()

      return NextResponse.json({
        type: "edit",
        edit,
      })
    }
//normal coversation api
    const conversation = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n")

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
    })

    return NextResponse.json({
      type: "message",
      content: response.text || "",
    })
  } catch (err) {
    console.error("Gemini API Error:", err)
    return NextResponse.json(
      { error: "Failed to connect to Gemini" },
      { status: 500 }
    )
  }
}


