'use client'

import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const addMessage = (content, isUser = true) => {
    setMessages(prev => [...prev, { content, isUser }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      addMessage(input)
      setInput('')
      // Here you would typically send the message to a backend API
      // and then add the response to the messages
    }
  }

  const identifyPlant = async (file, stage) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('stage', stage)

    try {
      const response = await fetch('/api/identify-plant', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to identify plant')
      }

      return await response.json()
    } catch (error) {
      console.error('Error identifying plant:', error)
      throw error
    }
  }

  const handleImageUpload = async (file) => {
    if (file) {
      setLoading(true)
      addMessage('Uploading image...', false)

      try {
        // First, identify the genus
        const genusInfo = await identifyPlant(file, 'genus')
        addMessage(`Identified genus: ${genusInfo.name}`, false)

        // Then, identify the species
        const speciesInfo = await identifyPlant(file, 'species')
        addMessage(`Identified species: ${speciesInfo.name}`, false)

        // Finally, identify the area
        const areaInfo = await identifyPlant(file, 'area')
        addMessage(`Native area: ${areaInfo.name}`, false)

        // Display full plant info
        addMessage(JSON.stringify(speciesInfo, null, 2), false)

        // Here you would typically generate and display images
        addMessage('Generating related images...', false)
        // Placeholder for image generation
        addMessage('Image 1: [Generated Image Placeholder]', false)
        addMessage('Image 2: [Generated Image Placeholder]', false)
      } catch (error) {
        addMessage(`Error: ${error.message}`, false)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`${message.isUser ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-500' : 'bg-gray-700'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="bg-blue-500 p-2 rounded">Send</button>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-green-500 p-2 rounded"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => cameraInputRef.current.click()}
            className="bg-purple-500 p-2 rounded"
          >
            <Camera />
          </button>
        </form>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  )
}