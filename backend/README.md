# ⚙️ Manasitra Backend

> **Express 5 + Groq AI Orchestration Layer**

This is the server component for Manasitra. It acts as a secure, stateless bridge between the frontend and the Groq LLM API, ensuring all inputs are sanitized and all responses adhere to safety protocols.

## 🛡️ Core Responsibilities
1. **Input Sanitization:** Regex-based filtering for prompt injection and XSS.
2. **AI Orchestration:** Managing sessions and context for the `llama-3.3-70b-versatile` model.
3. **Safety Classification:** Enforcing a strict JSON response schema with `riskLevel` detection.
4. **Rate Limiting:** Protecting the API from abuse with `express-rate-limit`.

## 🛠️ Technology Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express 5
- **AI SDK:** Groq SDK
- **Security:** Helmet, CORS, Morgan (access logging)
- **Validation:** Internal sanitization service

## 📡 API Endpoints

### `POST /api/chat`
The main endpoint for AI interaction.
- **Payload:** `{ message, language, history, responseMode }`
- **Response:** `{ response, detectedMood, riskLevel, suggestedTool }`

### `GET /health`
Diagnostics endpoint.
- **Response:** `{ status: "ok", version: "x.y.z" }`

## 🚀 Setup & Deployment

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Copy `.env.example` to `.env` and add your `GROQ_API_KEY`.

3. **Run Server:**
   ```bash
   npm run dev
   ```
   *The server runs on port 3001 by default.*

---
*Built with safety-first principles for Manasitra.*
