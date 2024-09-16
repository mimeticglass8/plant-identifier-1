'use client'

import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'

export default function ImageUpload({ setPlantInfo }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const handleImageUpload = async (file) => {
    if (file) {
      setLoading(true)
      setError(null)
      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch('/api/identify-plant', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.details || 'Failed to identify plant')
        }

        setPlantInfo(result, URL.createObjectURL(file))
      } catch (error) {
        console.error('Error identifying plant:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="mb-8 flex items-center space-x-4">
      <label htmlFor="image-upload" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors">
        Upload Image
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={() => cameraInputRef.current.click()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
      >
        <Camera className="w-6 h-6" />
      </button>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleImageUpload(e.target.files[0])}
        className="hidden"
        ref={cameraInputRef}
      />
      {loading && <p className="text-green-400">Identifying plant...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  )
}