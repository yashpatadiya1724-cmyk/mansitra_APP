# Manasitra (Friend of the Mind)

Empathetic, multilingual AI emotional companion and mental wellness platform built for Indian students.

[Live demo](https://www.mansitra.in) | [Docs](docs/DESIGN.md) | [License](LICENSE)

> [!IMPORTANT]
> **Safety & Medical Disclaimer:** Manasitra is an AI peer companion designed for emotional support, academic stress navigation, and daily reflection. **It is not a doctor, licensed therapist, or clinical psychiatric service.** For emergencies, please call **112** or the 24/7 National Mental Health Helpline (Tele-MANAS) at **14416**.

---

## Features
- **10+ Indian Languages & Dialects:** True cultural emotional empathy in Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, and Hinglish.
- **RAG Long-Term Vector Memory:** 64-dimensional semantic embedding engine that recalls ongoing student challenges (exam pressure, sleep debt, hostel loneliness) across sessions.
- **Automated Crisis Escalation:** Deterministic keyword intercept that instantly surfaces 24/7 national helplines (Tele-MANAS `14416`, KIRAN `1800-599-0019`) whenever severe distress or self-harm intent is detected.
- **Privacy-First Ephemeral Design:** Zero personal identifiable information (PII) is stored in server logs; conversations remain private.
- **Low-Latency Inference:** Powered by Groq LLaMA 3.3 70B for near-instant conversational responses.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Electron (Desktop), Capacitor (Android / iOS)
- **Backend:** Node.js, Express, Helmet, Morgan, Express Rate Limit
- **AI & Memory:** Groq Cloud SDK (LLaMA 3.3 70B), Custom In-Memory Vector Store / Cosine Similarity Engine
- **Deploy:** Vercel (Web Frontend), Railway / Docker (Backend API)

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

### Installation
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
   # Root / Frontend
   npm install

   # Backend
   cd backend
   npm install
   cd ..
   ```

4. Run the application:
   ```bash
   # Run backend API
   cd backend && npm start

   # In a separate terminal, run web frontend
   cd manasitra-web && npm run dev
   ```

5. Run test suite:
   ```bash
   cd backend && npm test
   ```

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
- **No PII Logging:** Morgan HTTP logger logs only HTTP verb, status code, and latency — never user text.
- **Input Sanitization:** Guard against prompt injection attacks (`ignore previous instructions`, jailbreak tokens).
- **Rate Limiting:** IP-based sliding window rate limiter protects endpoints against automated scraping and abuse.
- **Known Limitations:** AI generation may occasionally provide imperfect emotional tone in noisy contexts; crisis screening relies on both deterministic pattern matching and heuristic LLM classification.

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

## License
MIT
