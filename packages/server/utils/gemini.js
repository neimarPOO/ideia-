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
  // Use a model that supports image generation
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-preview-image-generation" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  // Assuming the response contains image data or a URL
  // The actual handling of image generation response might be more complex
  // and depend on the exact output format of the model.
  // For now, we'll return a placeholder or a simplified representation.
  const text = response.text(); // Or response.image() if available
  return text; // This will likely need adjustment based on actual API response for images
}

module.exports = { generateText, generateImageFromText };
