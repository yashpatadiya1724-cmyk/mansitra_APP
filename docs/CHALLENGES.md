# Engineering Challenges & Lessons Learned

## 1. Challenge: Zero-Latency Crisis Escalation
- **Problem:** Mental wellness apps cannot afford a 3-second LLM timeout when a student indicates self-harm intent. Furthermore, LLM guardrails can occasionally be bypassed by non-English colloquial slang (e.g. *khatam kar lunga*, *mar jaunga*).
- **Solution:** Implemented a pre-LLM deterministic regex classifier covering 10 regional dialects. When matched, it intercepts the request immediately and returns national emergency hotline cards without waiting for LLM token generation.

## 2. Challenge: Sub-Word Vector Memory for Indian English & Hinglish
- **Problem:** Traditional word-level embeddings fail when students type mixed Hinglish or slang (*"neend nahi aa rhi"* vs *"can't fall asleep"*).
- **Solution:** Designed a character tri-gram shingle algorithm combined with domain-specific emotional cluster roots (sleep, exam, anxiety, relationship). This achieved cosine similarity scores above 0.80 on cross-lingual topic recall.

## 3. Challenge: Maintaining Authentic Cultural Personas
- **Problem:** Standard LLMs tend to sound like clinical psychologists ("I hear that you are distressed. Here are 5 coping mechanisms:"). Indian students reject clinical tones from peers.
- **Solution:** Customized persona system prompts with elder sibling / close friend tone (*"Dost"*, *"Mitra"*, *"Yaar"*), strict rules prohibiting numbered lists, and instructions to validate emotions conversationally before offering solutions.
