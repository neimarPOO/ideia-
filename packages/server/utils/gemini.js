const { GoogleGenerativeAI } = require('@google/generative-ai');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateText(prompt) {
  // For text-only input, use the gemini-1.5-flash model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

async function generateImageFromText(prompt) {
  const model = genAI.getGenerativeModel({ model: "imagen-2-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const images = response.candidates[0].content.parts;

  if (!images || images.length === 0) {
    throw new Error("No images were generated.");
  }

  const imageData = images[0].fileData;
  return `data:${imageData.mimeType};base64,${imageData.data}`;
}

module.exports = { generateText, generateImageFromText };
