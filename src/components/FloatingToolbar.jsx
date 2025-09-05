"use client"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import PreviewModal from "./PreviewModal"

export default function FloatingToolbar({ editor, onAiApply }) {
  const [showModal, setShowModal] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [original, setOriginal] = useState("")
  const [coords, setCoords] = useState(null)
  const [loading, setLoading] = useState(false)
  const toolbarRef = useRef(null)

  if (!editor) return null

 
  useEffect(() => {
    const update = () => {
      const { from, to } = editor.state.selection
      if (from === to) {
        setCoords(null)
        return
      }
      const start = editor.view.coordsAtPos(from)
      const end = editor.view.coordsAtPos(to)
      setCoords({
        left: (start.left + end.right) / 2,
        top: Math.min(start.top, end.top),
        from,
        to,
      })
    }

    editor.on("selectionUpdate", update)
    return () => editor.off("selectionUpdate", update)
  }, [editor])

  const handleAiEdit = async () => {
    setLoading(true)
    if (!coords) return
    const { from, to } = coords
    const selectedText = editor.state.doc.textBetween(from, to)
    setOriginal(selectedText)

    const res = await axios.post("/api/chat", { selection: selectedText })
    setSuggestion(res.data.edit)
    setLoading(false)
    setShowModal(true)
  }

  return (
    <>
      {coords && (
        <div
          ref={toolbarRef}
          className="absolute bg-white border p-2 rounded shadow-md z-50"
          style={{
            top: coords.top - 40 + window.scrollY,
            left: coords.left - 50 + window.scrollX,
          }}
        >
          <button
            className="px-2 py-1 bg-green-500 text-white rounded"
            onClick={handleAiEdit}
          >
             {loading ? <div><span className="loading loading-ring loading-lg"></span></div>: "AI Edit"}
          </button>
        </div>
      )}

      {showModal && (
        <PreviewModal
          original={original}
          suggestion={suggestion}
          onConfirm={() => {
            const { from, to } = coords
            editor
              .chain()
              .focus()
              .insertContentAt({ from, to }, suggestion)
              .run()
            onAiApply?.(suggestion)
            setShowModal(false)
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}
