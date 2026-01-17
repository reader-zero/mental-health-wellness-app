import { fallbackMessages } from './fallbackMessages'

export async function getAiMessage(prompt) {
  try {
    // We use HuggingFace here as a free alternative
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: prompt })
      }
    )

    const result = await response.json()

    // If the AI gives us a valid answer, return it
    if (result && result[0]?.generated_text) {
      return result[0].generated_text
    }

    throw new Error("Invalid AI response")

  } catch (error) {
    // If anything goes wrong, pick a random fallback message instead
    console.warn("AI API failed, using fallback:", error)
    const random = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
    return random
  }
}