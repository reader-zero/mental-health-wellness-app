import { fallbackMessages } from './fallbackMessages'

// Replace this with your actual Groq key
const API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function getAiMessage(prompt) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Updated model name
          messages: [
            { role: "system", content: "You are a supportive mental health companion. Keep messages short and calming." },
            { role: "user", content: prompt }
          ]
        })
      }
    )

    const result = await response.json()

    // Groq follows the OpenAI response format
    if (result.choices && result.choices[0]?.message?.content) {
      return result.choices[0].message.content
    }

    throw new Error("Invalid AI response")

  } catch (error) {
    console.warn("Groq API failed, using fallback:", error)
    // Pick a random fallback message if the internet/API fails
    const random = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]
    return random
  }
}