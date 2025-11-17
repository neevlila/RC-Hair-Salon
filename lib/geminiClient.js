import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.error("VITE_GEMINI_API_KEY is not set in .env file. AI features will be disabled.");
}

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export async function getHaircutSuggestion(imageFile) {
  if (!genAI) {
    return "## AI Service Unavailable\n\nPlease ensure the `VITE_GEMINI_API_KEY` is correctly configured in your environment to use this feature.";
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro", // FIX: Using a powerful model from the user's supported list.
  });

  const imagePart = await fileToGenerativePart(imageFile);
  
  const prompt = `
    You are an expert stylist at a premium men's salon. Analyze the provided image of a client. Based on their visible face shape, hair type (if discernible), and overall features, suggest three distinct and stylish haircuts.

    For each of the three suggestions, you MUST provide:
    1.  A "###" heading with a clear, modern name for the haircut (e.g., "### Textured Crop Fade", "### Modern Pompadour", "### Long Layered Quiff").
    2.  A brief, encouraging paragraph (2-3 sentences) explaining why this style would be a great fit for them. Be specific if possible (e.g., "This style would complement your jawline..." or "The texture on top works well with your hair type...").

    Format the entire response in clean Markdown. Do not include any introductory or concluding sentences outside of the three suggestions.
  `;

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    if (!text) {
      // Handle cases where the API returns an empty response, possibly due to safety settings
      return "## Unable to Generate Suggestion\n\nOur AI couldn't process this image, possibly due to safety filters or image quality. Please try another clear, front-facing photo.";
    }
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "## An Error Occurred\n\nSorry, I couldn't generate a suggestion at this time. This could be due to an invalid API key, network issues, or a problem with the service. Please check the console for more details and try again later.";
  }
}
