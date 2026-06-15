const Groq = require('groq-sdk')

let groqClient = null

const getGroqClient = () => {
  if (!groqClient) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY })
  }
  return groqClient
}

const createChatCompletion = async (messages, options = {}) => {
  const groq = getGroqClient()
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
  const maxTokens = options.max_tokens || parseInt(process.env.GROQ_MAX_TOKENS) || 800
  const temperature = options.temperature || 0.85

  return groq.chat.completions.create({
    model,
    messages,
    max_tokens: maxTokens,
    temperature,
    ...options,
  })
}

module.exports = { createChatCompletion }
