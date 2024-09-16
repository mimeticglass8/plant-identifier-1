export default function PlantSpecies() {
  const generalFacts = [
    "Plants have been on Earth for about 400 million years.",
    "There are over 390,000 known species of plants.",
    "Plants produce around 70% of the oxygen in the atmosphere.",
    "The tallest tree in the world is a redwood named Hyperion, standing at 380.1 feet (115.92 meters).",
    "Some plants, like the corpse flower, can generate their own heat.",
  ];

  const plantCategories = [
    { name: "Angiosperms", description: "Flowering plants" },
    { name: "Gymnosperms", description: "Cone-bearing plants" },
    { name: "Ferns", description: "Vascular plants without seeds" },
    { name: "Mosses", description: "Non-vascular plants" },
    { name: "Algae", description: "Aquatic plants" },
    { name: "Carnivorous Plants", description: "Plants that trap and digest insects" },
    { name: "Succulents", description: "Plants that store water in leaves or stems" },
    { name: "Epiphytes", description: "Plants that grow on other plants" },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Plant Species</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-300">General Knowledge Facts</h2>
        <ul className="list-disc list-inside space-y-2">
          {generalFacts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-300">Categories of Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plantCategories.map((category, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-200">{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}