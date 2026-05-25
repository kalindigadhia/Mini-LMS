"use client"

export default function EditButton({ course, onEdit }: any) {
  return (
    <button
      onClick={() => onEdit(course)}
      className="bg-yellow-500 px-4 py-2 rounded-lg"
    >
      Edit
    </button>
  )
}