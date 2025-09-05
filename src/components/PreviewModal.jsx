"use client"
export default function PreviewModal({ original, suggestion, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-amber-600 p-6 rounded shadow-md max-w-lg w-full">
        <h2 className="text-lg font-bold mb-2">AI Suggestion</h2>
        <p className="mb-2"><strong>Original:</strong> {original}</p>
        <p className="mb-4"><strong>Suggestion:</strong> {suggestion}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="border px-3 py-1 rounded">Cancel</button>
          <button onClick={onConfirm} className="bg-blue-500 text-white px-3 py-1 rounded">Confirm</button>
        </div>
      </div>
    </div>
  )
}
