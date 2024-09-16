export default function PlantInfo({ info, uploadedImage }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl w-full">
      <div className="flex mb-4">
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded plant" className="w-full h-64 object-cover rounded mr-4" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-green-400">Plant Information</h2>
      <p className="mb-2"><span className="font-semibold text-green-400">Genus:</span> {info.genus.name || "Unknown"}</p>
      <p className="mb-2"><span className="font-semibold text-green-400">Species:</span> {info.species.name || "Unknown"}</p>
      <p className="mb-2"><span className="font-semibold text-green-400">Area:</span> {info.area.name || "Unknown"}</p>
      <p className="mb-4"><span className="font-semibold text-green-400">Description:</span> {info.species.description || "No description available"}</p>
      <h3 className="text-xl font-semibold mb-2 text-green-400">Care Instructions:</h3>
      <ul className="list-disc list-inside text-gray-300">
        <li>Water: {info.species.care?.water || "Unknown"}</li>
        <li>Light: {info.species.care?.light || "Unknown"}</li>
        <li>Soil: {info.species.care?.soil || "Unknown"}</li>
      </ul>
    </div>
  )
}