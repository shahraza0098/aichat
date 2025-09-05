


// "use client"

// import { useEditor } from "@tiptap/react"
// import StarterKit from "@tiptap/starter-kit"

// import { EditorContent } from "@tiptap/react"
// import FloatingToolbar from "@/components/FloatingToolbar"
// import ChatSidebar from "@/components/ChatSidebar"

// export default function Page() {
//   //editor starts here
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Start writing here...</p>",
//     immediatelyRender: false,
//   })

//   const handleAiApply = (edit) => {
//     console.log("Applied AI edit:", edit)
//   }

//   if (!editor) return null

//   return (
//     <div className="flex h-screen">
//       {/* Editor area */}
//       <div className="flex-1 flex flex-col p-4 border">
//         <div className="relative border rounded flex-1 flex flex-col">
//           {/* Editor text area */}
//           <EditorContent
//             editor={editor}
//             className="flex-1 overflow-auto p-3 h-full w-full outline-none"
//           />

//           {/* Floating toolbar */}
//           <div className="border-t">
//             <FloatingToolbar editor={editor} onAiApply={handleAiApply} />
//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="w-80 border-l">
//         <ChatSidebar editor={editor} onAiEdit={handleAiApply} />
//       </div>
//     </div>
//   )
// }

"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import FloatingToolbar from "@/components/FloatingToolbar"
import ChatSidebar from "@/components/ChatSidebar"
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Page() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing here...</p>",
    immediatelyRender: false,
  })

  const handleAiApply = (edit) => {
    console.log("Applied AI edit:", edit)
  }

  if (!editor) return null

  return (
    <div className="h-screen w-full relative flex items-center justify-center bg-neutral-900 rounded-md">
      {/* Background effects */}
      <ShootingStars />
      <StarsBackground />

      {/* Foreground content */}
      <div className="flex h-[80%] w-[90%] max-w-6xl z-10">
        {/* Editor area */}
        <div className="flex-1 flex flex-col p-4 border rounded-md bg-neutral-800/50 backdrop-blur">
          <div className="relative flex-1 flex flex-col">
            <EditorContent
              editor={editor}
              className="flex-1 overflow-auto p-3 h-full w-full outline-none text-white"
            />
            <div className="border-t border-neutral-700">
              <FloatingToolbar editor={editor} onAiApply={handleAiApply} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-neutral-700 bg-neutral-800/50 backdrop-blur">
          <ChatSidebar editor={editor} onAiEdit={handleAiApply} />
        </div>
      </div>
    </div>
  )
}

