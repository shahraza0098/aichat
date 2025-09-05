// "use client"

// import { useEditor, EditorContent } from "@tiptap/react"
// import StarterKit from "@tiptap/starter-kit"
// import FloatingToolbar from "./FloatingToolbar"

// export default function Editor({ onAiApply }) {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Start writing here...</p>",
//     immediatelyRender: false, // prevent SSR mismatch
//   })

//   if (!editor) return null

//   return (
//     <div className="relative border rounded p-2 min-h-[200px]">
//       <EditorContent editor={editor} />
//       <FloatingToolbar editor={editor} onAiApply={onAiApply} />
//     </div>
//   )
// }



// "use client"

// import { useEditor, EditorContent } from "@tiptap/react"
// import StarterKit from "@tiptap/starter-kit"
// import FloatingToolbar from "./FloatingToolbar"

// export default function Editor({ onAiApply }) {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Start writing here...</p>",
//     immediatelyRender: false,
//   })

//   if (!editor) return null

//   return (
//     <div className="relative border rounded flex-1 flex flex-col">
//       {/* Scrollable content */}
//       <div className="flex-1 overflow-auto p-3">
//         <EditorContent editor={editor} className="h-full w-full outline-none" />
//       </div>

//       {/* Floating toolbar stays inside */}
//       <FloatingToolbar editor={editor} onAiApply={onAiApply} />
//     </div>
//   )
// }




"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import FloatingToolbar from "./FloatingToolbar"

export default function Editor({ onAiApply }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing here...</p>",
    immediatelyRender: false,
  })

  

  if (!editor) return null

  return (
    <div className="relative border rounded flex-1 flex flex-col">
      {/* Text input area takes all space */}
      <EditorContent
        editor={editor}
        className="flex-1 overflow-auto p-3 h-full w-full outline-none"
      />

      {/* Toolbar at bottom */}
      <div className="border-t">
        <FloatingToolbar editor={editor} onAiApply={onAiApply} />
      </div>
    </div>
  )
}

