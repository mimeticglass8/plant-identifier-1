export default function Menu({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'identifier', label: 'Plant Identifier' },
    { id: 'species', label: 'Plant Species' },
    { id: 'history', label: 'History' },
  ]

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}