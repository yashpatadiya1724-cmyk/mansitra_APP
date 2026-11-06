# Manasitra Architecture & Design Document

## 1. System Overview
Manasitra is built to provide accessible, empathetic emotional support to Indian university students facing placement pressure, academic stress, and isolation. It blends low-latency LLM inference with localized cultural personas, safety guardrails, and persistent memory.

## 2. Key Architecture Decisions

### Why Groq LLaMA 3.3 70B?
- **Sub-Second TTFT (Time-To-First-Token):** Conversational empathy breaks when latency exceeds 2 seconds. Groq LPUs deliver response streams in under 600ms.
- **Multilingual Tokenizer Support:** High proficiency across Indian languages (Devanagari, Gujarati, Bengali, Tamil, Telugu).

### Why In-Memory Vector Shingles for Semantic Memory?
- For individual student sessions, managing a heavy cloud Vector DB (like Pinecone or Cloud Qdrant) introduces cold starts, unnecessary monthly billing, and privacy leakage.
- A 64-dimensional sparse embedding engine using character tri-grams and emotional cluster roots runs locally in Node.js in <2ms with zero cloud dependencies.

### Dual-Layer Crisis Detection Engine
1. **Layer 1 (Deterministic Fast Gate):** High-risk suicide/self-harm regex keywords evaluate in 0.1ms. If matched, the system immediately attaches emergency helplines (`Tele-MANAS 14416`, `KIRAN 1800-599-0019`) and switches the prompt to de-escalation mode.
2. **Layer 2 (Heuristic LLM Classification):** Subtler emotional states (burnout, grief, mild anxiety) are parsed by the LLM with `temperature: 0.0`.

## 3. Data Privacy and Storage Model
- **Ephemeral By Default:** The core backend does not persist student raw chat transcripts to any relational database.
- **Client-Side Ownership:** Chat logs and mood tracker metrics stay inside the user's browser (localStorage / IndexedDB) or mobile device storage.

## 4. Trade-Offs & Future Improvements
- **Trade-off:** In-memory vector memory is session-bound unless synced to authenticated user storage.
- **Future Improvement:** Optional end-to-end encrypted backup using client-side AES-GCM-256 keys.
