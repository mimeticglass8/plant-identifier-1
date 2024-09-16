import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
console.log('API Key:', apiKey) // Remove this line after debugging

const genAI = new GoogleGenerativeAI(apiKey)

export async function identifyPlant(imageFile) {
  // ... rest of the code remains the same
}