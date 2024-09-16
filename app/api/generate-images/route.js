import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    const result = await model.generateContent([
      'Generate an image based on this description:',
      prompt
    ]);

    const response = await result.response;
    const image = response.text(); // This might need adjustment based on the actual API response

    // For demonstration purposes, we're returning a placeholder image URL
    // In a real scenario, you would process the generated image data and return its URL
    const placeholderImageUrl = `https://via.placeholder.com/300x200?text=${encodeURIComponent(prompt)}`;

    return NextResponse.json({ imageUrl: placeholderImageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}