# Manasitra (Friend of the Mind)

Empathetic, multilingual AI emotional companion and mental wellness platform built for Indian students.

[Live demo](https://www.mansitra.in) | [Docs](docs/DESIGN.md) | [License](LICENSE)

![Screenshot](docs/screenshot.png)  <!-- TODO: owner to add -->

> [!IMPORTANT]
> **Safety & Medical Disclaimer:** Manasitra is an AI peer companion designed for emotional support, academic stress navigation, and daily reflection. **It is not a doctor, licensed therapist, or clinical psychiatric service.** For emergencies, please call **112** or the 24/7 National Mental Health Helpline (Tele-MANAS) at **14416** or KIRAN at **1800-599-0019**.

---

## Features
- **10+ Indian Languages & Dialects:** Cultural emotional empathy in Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, and Hinglish.
- **RAG Long-Term Vector Memory:** 64-dimensional semantic embedding engine that recalls ongoing student challenges (exam pressure, sleep debt, hostel loneliness) across sessions.
- **Automated Crisis Escalation:** Deterministic keyword intercept that instantly surfaces 24/7 national helplines (Tele-MANAS `14416`, KIRAN `1800-599-0019`) whenever severe distress or self-harm intent is detected.
- **Privacy-First Ephemeral Design:** Zero personal identifiable information (PII) is stored in server logs; conversations remain private.
- **Low-Latency Inference:** Powered by Groq LLaMA 3.3 70B for near-instant conversational responses.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Electron (Desktop), Capacitor (Android / iOS)
- **Backend:** Node.js, Express, Helmet, Morgan, Express Rate Limit
- **Database & Storage:** Supabase (Relational & Auth), LocalForage (IndexedDB client cache)
- **AI & Memory:** Groq Cloud SDK (LLaMA 3.3 70B), Custom In-Memory Vector Store / Cosine Similarity Engine
- **Deployment:** Vercel (Web Frontend), Railway / Docker (Backend API)

## Architecture

```mermaid
flowchart TD
    Client["Student Client (Web / Mobile / Desktop)"]
    Sanitizer["Input Sanitizer & Prompt Injection Guard"]
    CrisisGate{"Distress / Crisis Check"}
    Helpline["National Helplines (Tele-MANAS 14416 / KIRAN)"]
    VectorMem["Vector Memory Engine (64-dim Embeddings)"]
    GroqLLM["Groq LLaMA 3.3 70B (Empathetic Dost Persona)"]

    Client --> Sanitizer
    Sanitizer --> CrisisGate
    CrisisGate -- Critical Risk --> Helpline
    CrisisGate -- Safe Flow --> VectorMem
    VectorMem --> GroqLLM
    GroqLLM --> Client
```

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 and 24)
- A Groq API key from [groq.com](https://console.groq.com)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yashpatadiya1724-cmyk/mansitra_APP.git
   cd mansitra_APP
   ```

2. Copy environment template:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```
   *Edit `backend/.env` with your `GROQ_API_KEY`.*

3. Install dependencies:
   ```bash
   # Root & Frontend
   npm install --legacy-peer-deps

   # Backend
   cd backend
   npm install
   cd ..
   ```

4. Start the app:
   ```bash
   # Terminal 1: Backend API
   cd backend && npm start

   # Terminal 2: Web frontend
   cd manasitra-web && npm run dev
   ```

5. Run tests:
   ```bash
   cd backend && npm test
   ```

## Environment Variables

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Authentication key for Groq Cloud inference (LLaMA 3.3 70B) |
| `GROQ_MODEL` | AI model name (`llama-3.3-70b-versatile`) |
| `GROQ_MAX_TOKENS` | Max tokens per response (default: `800`) |
| `PORT` | Backend HTTP server listening port (default: `3001`) |
| `ALLOWED_ORIGINS` | Permitted CORS client origins (e.g. `http://localhost:5173,https://mansitra.in`) |
| `ENABLE_ADMIN` | Toggle administrative API routes (`true`/`false`) |
| `SAFETY_CLASSIFICATION_ENABLED` | Toggles LLM fallback evaluation in addition to regex triage (`true`/`false`) |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Main conversational endpoint with mood analysis & crisis gates |
| `POST` | `/api/memory/store` | Stores conversation summary embeddings in vector memory |
| `POST` | `/api/memory/query` | Retrieves relevant past conversational context via semantic search |
| `GET` | `/api/safety/helplines` | Fetches verified 24/7 Indian crisis helplines and medical disclaimers |
| `POST` | `/api/safety/classify` | Evaluates message risk classification |
| `GET` | `/health` | Service health check |

## Security and Privacy
- **Medical Disclaimer**: Manasitra is strictly an AI wellness and emotional support tool, not a doctor or therapist.
- **No PII Logging**: Morgan HTTP logger logs only HTTP verb, status code, and latency — never user text or IP payloads.
- **Input Sanitization**: Guards against prompt injection attacks (`ignore previous instructions`, jailbreak tokens).
- **Rate Limiting**: IP-based sliding window rate limiter protects endpoints against automated scraping and abuse.
- **Crisis Escalation**: Intercepts emergency distress cues and routes directly to Tele-MANAS `14416` and KIRAN `1800-599-0019`.
- **Known Limitations**: AI responses can occasionally have nuanced tone variations; safety screening combines deterministic regex filtering with AI classification.

## Roadmap
- [x] Multilingual prompt engineering across 10 Indian regional languages
- [x] Semantic vector memory RAG engine
- [x] National helpline crisis interception
- [ ] On-device offline fallback model (Manasitra Local Whisper/Nano)
- [ ] End-to-end encrypted local SQLCipher journal

## What I Learned
- Balancing conversational empathy with strict safety boundaries is the most critical engineering challenge in mental health tech.
- Pure LLM-based crisis detection has latency; having a deterministic regex rule gate in front of the LLM guarantees zero-latency emergency hotline surfacing.
- Sub-word tri-gram semantic shingles offer resilient similarity search without needing a heavy cloud vector database for edge use cases.

## Author
Yash Patadiya: [LinkedIn](https://www.linkedin.com/in/yash-patadiya-973161272/)

## License
MIT
