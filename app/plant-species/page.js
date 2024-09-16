import Menu from '../../components/Menu'

export default function PlantSpecies() {
  const generalFacts = [
    "There are over 390,000 known species of plants.",
    "Plants produce oxygen through photosynthesis.",
    "The oldest known living tree is over 5,000 years old.",
    "Some plants can communicate with each other through underground fungal networks.",
    "Plants can sense gravity, light, and touch."
  ]

  const plantCategories = [
    "Angiosperms (Flowering Plants)",
    "Gymnosperms (Cone-bearing Plants)",
    "Ferns and Fern Allies",
    "Mosses and Liverworts",
    "Algae",
    "Fungi (though not technically plants, often studied in botany)"
  ]

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Menu />
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6 text-green-400">Plant Species</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-300">General Knowledge Facts</h2>
          <ul className="list-disc list-inside">
            {generalFacts.map((fact, index) => (
              <li key={index} className="mb-2">{fact}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-300">Categories of Plants</h2>
          <ul className="list-disc list-inside">
            {plantCategories.map((category, index) => (
              <li key={index} className="mb-2">{category}</li>
            ))}
          </ul>
        </section>
      </div>
      <footer className="bg-gray-800 p-2 text-center text-sm">
        <p>Contact: i@deepjyotimondal.com</p>
        <p>&copy; 2024 All rights reserved</p>
      </footer>
    </main>
  )
}