"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

const EditableRow = ({
  label,
  onSave,
}: {
  label: string
  onSave: (newLabel: string) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempLabel, setTempLabel] = useState(label)

  const handleSave = () => {
    onSave(tempLabel)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-700 p-2">
      {isEditing ? (
        <>
          <div className="flex flex-grow items-center">
            <input
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              className="flex-grow rounded border border-gray-600 bg-black px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="button-primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-grow items-center">
            <span className="flex-grow">{label}</span>
          </div>
          <Button variant="ghost" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </>
      )}
    </div>
  )
}

const EditableTable = () => {
  const [data, setData] = useState([{ id: 1, label: "Feature" }])

  const handleSave = (id: number, newLabel: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    )
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-black text-white shadow-md">
      {data.map((item) => (
        <EditableRow
          key={item.id}
          label={item.label}
          onSave={(newLabel) => handleSave(item.id, newLabel)}
        />
      ))}
    </div>
  )
}

export default EditableTable
