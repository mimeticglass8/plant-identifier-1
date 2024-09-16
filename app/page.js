'use client'

import { useState } from 'react'
import Menu from '../components/Menu'
import Chat from '../components/Chat'

export default function Home() {
  const [activeTab, setActiveTab] = useState('identifier')

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4">
        {activeTab === 'identifier' && <Chat />}
        {/* Add other tab content here */}
      </div>
      <footer className="bg-gray-800 p-4 text-center text-sm">
        <p>Contact: i@deepjyotimondal.com</p>
        <p>&copy; 2024 All rights reserved</p>
      </footer>
    </main>
  )
}