export default function RecentSearches({ searches }) {
  const interestingFacts = [
    "The Amazon rainforest produces 20% of the world's oxygen.",
    "Bamboo can grow up to 35 inches in a single day.",
    "Some plants, like sunflowers, can remove toxic ingredients from soil.",
    "The corpse flower is the world's largest flower and smells like rotting meat.",
    "Trees can communicate with each other through underground fungal networks.",
  ]

  return (
    <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-green-400">Recent Searches</h2>
      {searches.length > 0 ? (
        searches.map((search, index) => (
          <div key={index} className="mb-4">
            <img src={search.image} alt="Plant" className="w-full h-32 object-cover mb-2 rounded" />
            <p className="text-sm text-gray-300">{search.info.name || 'Unknown Plant'}</p>
          </div>
        ))
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-400">Interesting Facts</h3>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {interestingFacts.map((fact, index) => (
              <li key={index} className="mb-2">{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}