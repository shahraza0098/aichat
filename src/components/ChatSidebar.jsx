

"use client"
import { useState } from "react"
import axios from "axios"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function ChatSidebar({ editor, onAiEdit }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    try {
      let payload = { messages: newMessages }
      // If user input suggests an edit, set mode to "edit"
      if (
        input.toLowerCase().includes("correct") ||
        input.toLowerCase().includes("fix") ||
        input.toLowerCase().includes("improve")
      ) {
        payload.mode = "edit"
        payload.selection = editor?.getText() || "" 
      }

      const res = await axios.post("/api/chat", payload)
      const aiMessage = res.data

      if (aiMessage.type === "message") {
        // Normal chat
        setMessages([
          ...newMessages,
          { role: "assistant", content: aiMessage.content },
        ])
      } else if (aiMessage.type === "edit") {
        // AI returned an edit for the editor
        editor?.commands.setContent(aiMessage.edit)
        onAiEdit?.(aiMessage.edit)
        setMessages([
          ...newMessages,
          { role: "assistant", content: " I corrected your text in the editor." },
        ])
      }
    } catch (err) {
      console.error("Chat error:", err)
      setMessages([
        ...newMessages,
        { role: "assistant", content: " Error contacting AI." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-80 h-full border-l p-4 flex flex-col bg-neutral-800/50 backdrop-blur text-white shadow-md">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-green-700 text-white"
            }`}
          >
            <div className="text-sm leading-snug ">
               <TextGenerateEffect words={m.content} />
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400">Thinking...</div>}
      </div>

      {/* Input box */}
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded px-2 text-white bg-gray-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  )
}


