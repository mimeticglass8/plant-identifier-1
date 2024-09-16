import { useState } from 'react'
import ImageUpload from './ImageUpload'
import PlantInfo from './PlantInfo'

export default function GenerativeImages() {
  const [plantInfo, setPlantInfo] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)

  const handlePlantIdentified = async (file) => {
    setUploadedImage(URL.createObjectURL(file))

    // First, identify the genus
    const genusInfo = await identifyPlant(file, 'genus')

    // Then, identify the species
    const speciesInfo = await identifyPlant(file, 'species')

    // Finally, get the area information
    const areaInfo = await identifyPlant(file, 'area')

    setPlantInfo({
      genus: genusInfo,
      species: speciesInfo,
      area: areaInfo
    })
  }

  const identifyPlant = async (file, level) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('level', level)

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
      console.error(`Error identifying plant ${level}:`, error)
      return { error: `Failed to identify plant ${level}` }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-green-400">Plant Identifier</h1>
      <ImageUpload setPlantInfo={handlePlantIdentified} />
      {plantInfo && <PlantInfo info={plantInfo} uploadedImage={uploadedImage} />}
    </div>
  )
}