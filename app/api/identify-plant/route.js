import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const data = await request.formData();
  const image = data.get('image');
  const stage = data.get('stage');

  if (!image) {
    console.error('No image provided');
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const imageData = await image.arrayBuffer();
    const result = await model.generateContent([
      `Identify the ${stage} of this plant and provide the following information:`,
      'Name, Scientific Name, Family, Description, Care Instructions (Water, Light, Soil)',
      {
        inlineData: {
          data: Buffer.from(imageData).toString('base64'),
          mimeType: image.type
        }
      },
    ]);

    const response = await result.response;
    const text = response.text();

    console.log('Gemini API response:', text);

    const info = {
      name: text.match(/Name: (.+)/)?.[1] || 'Unknown',
      scientificName: text.match(/Scientific Name: (.+)/)?.[1] || 'Unknown',
      family: text.match(/Family: (.+)/)?.[1] || 'Unknown',
      description: text.match(/Description: (.+)/)?.[1] || 'No description available',
      care: {
        water: text.match(/Water: (.+)/)?.[1] || 'Unknown',
        light: text.match(/Light: (.+)/)?.[1] || 'Unknown',
        soil: text.match(/Soil: (.+)/)?.[1] || 'Unknown',
      },
    };

    return NextResponse.json(info);
  } catch (error) {
    console.error('Error identifying plant:', error);
    return NextResponse.json({ 
      error: 'Failed to identify plant', 
      details: error.message 
    }, { status: 500 });
  }
}