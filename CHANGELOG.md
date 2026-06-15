# Manasitra - Project Changelog, Governance and Architecture

> **Manasitra** (Mann Ka Mitra — Friend of the Mind) is a multilingual AI emotional companion built for Indian students. It provides empathetic, culturally-aware mental wellness support across 10 Indian languages, with a safety-first architecture, zero PII storage, and a suite of calming tools — all accessible from a mobile-first web app.

---

## Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Safety First** | Every AI response is risk-classified (none/low/medium/high/critical). Critical responses always surface crisis helplines. |
| **Privacy by Default** | No user accounts, no server-side PII storage. All mood logs and progress data live in `localStorage` / `localforage` on the user's device. |
| **Cultural Authenticity** | Prompts are tuned for Indian student pressures: board exams, JEE/NEET, placements, hostel life, family expectations. Warm address forms ("Yaar", "Dost") per language. |
| **Offline Resilience** | Core calming tools (breathing, grounding, affirmations) work fully offline. AI chat degrades gracefully with a local fallback message. |
| **No Scores, No Pressure** | Calming tools carry no win/lose state. Progress dashboard celebrates streaks without shaming gaps. |
| **Accessibility** | Reduced-motion mode, high-contrast theme, large-text mode, screen-reader labels on all interactive elements. |
| **Minimal Footprint** | Backend is a single Express process. Frontend is a Vite/React SPA with no SSR overhead. Total cold-start < 2 s on a 4G connection. |

---

## Safety & Trust Architecture

Manasitra is **not a therapy product**. It is a peer-support companion. The safety architecture enforces this boundary at every layer.

### Layers of Protection

```
User Input
    │
    ▼
[1] Frontend input sanitisation (max 2000 chars, injection pattern strip)
    │
    ▼
[2] Backend safety-service.js — INJECTION_PATTERNS regex filter
    │
    ▼
[3] System prompt hard rules — AI instructed never to diagnose, never to mention methods
    │
    ▼
[4] Response JSON schema — riskLevel field parsed and acted on by frontend
    │
    ▼
[5] Frontend safety-store.js — riskLevel >= HIGH triggers crisis screen overlay
    │
    ▼
[6] Crisis screen — shows helplines, breathing tool, "Talk to someone" CTA
```

### Risk Level Definitions

| Level | Trigger Examples | Frontend Action |
|-------|-----------------|-----------------|
| `none` | General chat, study tips | Normal response bubble |
| `low` | Mild stress, exam anxiety | Normal response + optional tool suggestion |
| `medium` | Persistent sadness, sleep issues | Response + gentle professional help nudge |
| `high` | Hopelessness, self-worth crisis | Response + prominent helpline card |
| `critical` | Explicit self-harm ideation | Crisis screen overlay, helplines foregrounded |

### Prompt Injection Defence

The following patterns are blocked server-side before the prompt reaches Groq:

```js
/ignore (previous|all) instructions/i
/system prompt/i
/you are now/i
/pretend to be/i
/jailbreak/i
/act as(?! a student)/i
```

Matched inputs are replaced with `[Input filtered for safety]` and the AI still responds with a supportive message.

---
## Version History

### v1.5.0 — Calming Tools Suite (Current)
**Released:** July 2025

**Added:**
- 10 calming mini-tools accessible from `/games` route
- `breathing-bubble` — animated 4-7-8 breathing guide with haptic cue support
- `tap-to-calm` — rapid-tap stress release with particle burst animation
- `grounding-guide` — 5-4-3-2-1 sensory grounding walkthrough
- `focus-puzzle` — simple tile-slide puzzle for cognitive redirection
- `mood-canvas` — freehand drawing canvas for emotional expression
- `affirmation-shuffle` — randomised culturally-aware affirmations deck
- `word-reset` — guided word-association reset exercise
- `gratitude-jar` — daily gratitude entry with persistent local storage
- `body-scan` — progressive muscle relaxation audio-guided walkthrough
- `worry-box` — write-and-seal worry journaling with local encryption hint
- Games page grid layout with tag badges and duration estimates
- "No scores. No pressure. No failure." banner on games page

**Changed:**
- Response processor now maps `suggestedTool` field to direct game route navigation
- Crisis screen updated to surface breathing and grounding tools inline

---

### v1.4.0 — Progress Dashboard & Mood Tracking
**Released:** June 2025

**Added:**
- `mood-page.jsx` — daily mood check-in with 7-state emoji selector
- `progress-store.js` — Zustand store tracking streaks, daily wins, tool usage
- `dashboard-page.jsx` — Recharts-powered weekly mood trend chart
- Daily wins counter with celebratory micro-animation
- Streak tracking with grace period (1 missed day does not break streak)
- `mood-store.js` — persisted mood log via `localforage` (device-only)

**Changed:**
- Onboarding flow now includes optional mood baseline question
- Settings page shows current streak and total sessions

---

### v1.3.0 — Privacy Audit & Shared Device Mode
**Released:** May 2025

**Added:**
- `privacy-page.jsx` — full audit view of all locally stored data keys
- One-tap "Clear All My Data" with confirmation dialog
- `SHARED_DEVICE` flag in `localStorage` — suppresses mood log display on home screen
- Privacy notice shown on first launch explaining zero-server-storage model

**Changed:**
- `session-store.js` now clears chat history on tab close when shared device mode is active
- Onboarding page updated with explicit privacy commitment statement

---

### v1.2.0 — Multilingual Engine & i18n
**Released:** April 2025

**Added:**
- Full i18n via `i18next` + `react-i18next`
- 10 language JSON files: `en`, `hi`, `gu`, `mr`, `bn`, `ta`, `te`, `kn`, `ml`, `pa`
- `language-store.js` — persists language choice, applies on mount
- Language selector in onboarding and settings
- Backend `validateLanguage()` — rejects unsupported codes, defaults to `en`
- System prompt dynamically injects language name for strict single-language responses

**Changed:**
- All UI strings moved from hardcoded JSX to i18n keys
- Affirmations JSON keyed by language code

---

### v1.1.0 — Crisis Support & Helplines
**Released:** March 2025

**Added:**
- `crisis-screen.jsx` — full-screen overlay triggered on `riskLevel >= high`
- `helplines.json` — 4 verified Indian crisis helplines with hours and language support
- `safety-store.js` — Zustand store managing crisis state and dismissal logic
- Crisis screen includes: helpline cards, breathing tool shortcut, "I am safe" dismiss button
- Backend `/api/safety` route for future server-side risk classification

**Changed:**
- Chat hook now reads `riskLevel` from AI JSON response and dispatches to safety store
- Message bubble renders a soft warning card for `medium` risk responses

---

### v1.0.0 — Foundation Release
**Released:** February 2025

**Added:**
- Express backend with Helmet, CORS, Morgan, express-rate-limit
- Groq SDK integration (`llama-3.3-70b-versatile` model)
- `buildSystemPrompt()` — structured prompt with 6 response modes
- `/api/chat` POST endpoint with JSON response schema enforcement
- React 19 + Vite 8 frontend scaffold
- Zustand stores: `session-store`, `theme-store`
- `chat-page.jsx` with message bubbles, typing indicator, input bar
- `onboarding-page.jsx` — nickname + language selection
- Dark/light theme toggle with CSS variable system
- `settings-page.jsx` with about modal and report modal
- Rate limiting: 20 req/min chat, 60 req/min general
- Health check endpoint `GET /health`

---
## Architecture

### System Overview

The frontend is a React 19 + Vite 8 SPA. It communicates with a Node.js + Express 5 backend over HTTPS. The backend sanitises input, builds a structured system prompt, and forwards the conversation to Groq Cloud (llama-3.3-70b-versatile). The AI response is a strict JSON object parsed by the frontend to drive UI state.

**Request flow:** User input -> Frontend sanitisation -> Backend injection filter -> Groq LLM -> JSON response -> Frontend risk-level dispatch -> UI render

### Frontend Directory Structure

- app/config/ — constants (languages, moods, risk levels, storage keys)
- app/providers/ — i18n.js, theme-provider.jsx
- app/store/ — 6 Zustand stores (session, language, mood, progress, safety, theme)
- app/routes/ — React Router v7 route definitions
- data/affirmations/ — multilingual affirmations JSON
- data/helplines/ — 4 verified Indian crisis helplines
- data/i18n/ — 10 language JSON files
- data/prompts/ — system-prompts.js
- features/chat/ — chat-page, message-bubble, input-bar, use-chat hook
- features/crisis-support/ — crisis-screen overlay
- features/mini-games/ — 10 calming tool components + games-page
- features/mood-tracking/ — mood-page
- features/onboarding/ — onboarding-page
- features/privacy-audit/ — privacy-page
- features/progress-dashboard/ — dashboard-page (Recharts)
- features/settings/ — settings-page, about-modal, report-modal

### Backend Directory Structure

- middleware/rate-limiter.js — chatLimiter (20/min), generalLimiter (60/min)
- routes/chat.js — POST /api/chat
- routes/safety.js — POST /api/safety
- services/groq-client.js — Groq SDK singleton
- services/safety-service.js — sanitizeInput(), validateLanguage(), validateResponseMode()
- utils/prompt-builder.js — buildSystemPrompt(language, responseMode)
- server.js — Express app entry point

---

## Environment Setup

### Prerequisites

- Node.js >= 18.x
- A free Groq API key (https://console.groq.com)

### Backend Setup

    cd backend
    cp .env.example .env
    # Edit .env and set GROQ_API_KEY
    npm install
    npm run dev   # node --watch server.js on port 3001

### Frontend Setup

    cd manasitra-web
    npm install
    npm run dev   # Vite dev server on port 5173

### Environment Variables (backend/.env)

| Variable | Default | Description |
|----------|---------|-------------|
| GROQ_API_KEY | — | Required. Groq Cloud API key |
| GROQ_MODEL | llama-3.3-70b-versatile | LLM model identifier |
| GROQ_MAX_TOKENS | 800 | Max tokens per AI response |
| PORT | 3001 | Backend HTTP port |
| ALLOWED_ORIGINS | — | Comma-separated allowed CORS origins |
| ENABLE_ADMIN | false | Feature flag for admin/CMS routes |
| SAFETY_CLASSIFICATION_ENABLED | true | Enables server-side risk classification |

### LAN / Mobile Testing

The backend binds to 0.0.0.0 and prints all LAN IPs on startup. Point your phone browser to http://<LAN_IP>:5173 after setting VITE_API_URL=http://<LAN_IP>:3001 in the frontend .env file.

---

## AI Response System

### Request Schema (POST /api/chat)

    {
      message: string,        // max 2000 chars, injection-filtered
      language: string,       // one of 10 supported codes
      responseMode: string,   // standard|study|panic|crisis|celebration|grief
      history: Array<{role, content}>  // last N turns for context
    }

### Response Schema

The LLM is instructed to return strict JSON only:

    {
      response: string,       // full message to display
      detectedMood: string,   // anxious|sad|overwhelmed|calm|happy|other
      riskLevel: string,      // none|low|medium|high|critical
      suggestedTool: string   // breathing|grounding|tap|null
    }

### Response Modes

| Mode | When Used | Prompt Behaviour |
|------|-----------|-----------------|
| standard | Default chat | Balanced empathy + action |
| study | Study/exam context | Break reminders, one-task focus |
| panic | Acute anxiety detected | Slow pacing, breathing first |
| crisis | High/critical risk | Safety first, hope, professional help nudge |
| celebration | Positive mood detected | Amplify joy, no caveats |
| grief | Loss or bereavement | Validation-first, non-prescriptive |

### Model Configuration

- Model: llama-3.3-70b-versatile (Groq)
- Temperature: 0.75 (warm, varied but not erratic)
- Max tokens: 800 (configurable via GROQ_MAX_TOKENS)
- Session history: last MAX_SESSION_MESSAGES turns (default 5)
- JSON extraction: manual regex fallback if model wraps JSON in markdown

### Fallback Behaviour

If the Groq API is unavailable or the API key is missing, the backend returns a pre-written fallback message in the requested language. The fallback always includes a breathing exercise suggestion and a helpline reference.

---

## Privacy Architecture

### Data Storage Model

| Data Type | Storage Location | Retention | User Control |
|-----------|-----------------|-----------|--------------|
| Chat messages | sessionStorage (in-memory) | Tab session only | Auto-cleared on close |
| Mood log | localforage (IndexedDB) | Indefinite | Clear All button |
| Daily wins | localforage | Indefinite | Clear All button |
| Progress/streaks | localforage | Indefinite | Clear All button |
| Language preference | localStorage | Indefinite | Settings reset |
| Theme preference | localStorage | Indefinite | Settings reset |
| Nickname | localStorage | Indefinite | Settings reset |
| Onboarding flag | localStorage | Indefinite | Settings reset |
| Accessibility prefs | localStorage | Indefinite | Settings reset |

**Nothing is sent to any server except the current chat message and language code.** No user ID, no device fingerprint, no IP logging beyond standard Morgan access logs (method + URL + status only).

### Shared Device Mode

When SHARED_DEVICE flag is set:
- Mood log is hidden from home screen
- Chat history is cleared on tab close
- No nickname is displayed
- Privacy page shows a reminder about shared device risks

### Privacy Page

Route: /privacy

Shows all localStorage and localforage keys currently in use, their approximate size, and a one-tap Clear All Data button with a confirmation dialog.

---

## Supported Languages

| Code | Language | Native Name | Script | UI Translated | AI Responses | Affirmations |
|------|----------|-------------|--------|---------------|--------------|--------------|
| en | English | English | Latin | Yes | Yes | Yes |
| hi | Hindi | हिंदी | Devanagari | Yes | Yes | Yes |
| gu | Gujarati | ગુજરાતી | Gujarati | Yes | Yes | Yes |
| mr | Marathi | मराठी | Devanagari | Yes | Yes | Yes |
| bn | Bengali | বাংলা | Bengali | Yes | Yes | Yes |
| ta | Tamil | தமிழ் | Tamil | Yes | Yes | Yes |
| te | Telugu | తెలుగు | Telugu | Yes | Yes | Yes |
| kn | Kannada | ಕನ್ನಡ | Kannada | Yes | Yes | Yes |
| ml | Malayalam | മലയാളം | Malayalam | Yes | Yes | Yes |
| pa | Punjabi | ਪੰਜਾਬੀ | Gurmukhi | Yes | Yes | Yes |

Language is enforced at two levels:
1. **Frontend** — i18next loads the correct JSON bundle; all UI strings render in the selected language
2. **Backend** — system prompt explicitly instructs the LLM to respond ONLY in the selected language and never mix languages

---

## Calming Tools

| Tool | Route | Tag | Duration | Description |
|------|-------|-----|----------|-------------|
| Breathing Bubble | /games/breathing | Breathing | ~2 min | Animated 4-7-8 breathing guide with visual bubble expansion |
| Tap to Calm | /games/tap | Release | ~1 min | Rapid-tap stress release with particle burst animation |
| Grounding Guide | /games/grounding | Grounding | ~3 min | 5-4-3-2-1 sensory grounding walkthrough |
| Focus Puzzle | /games/puzzle | Focus | ~2 min | Simple tile-slide puzzle for cognitive redirection |
| Mood Canvas | /games/canvas | Express | Open | Freehand drawing canvas for emotional expression |
| Affirmation Shuffle | /games/affirmations | Uplift | ~1 min | Randomised culturally-aware affirmations deck |
| Word Reset | /games/words | Reflect | ~2 min | Guided word-association reset exercise |
| Gratitude Jar | /games/gratitude | Gratitude | ~3 min | Daily gratitude entry with persistent local storage |
| Body Scan | /games/bodyscan | Body | ~4 min | Progressive muscle relaxation walkthrough |
| Worry Box | /games/worrybox | Release | ~3 min | Write-and-seal worry journaling |

### Design Rules for All Tools

- No win/lose state
- No scores or leaderboards
- No time pressure
- No notifications or reminders
- Each tool is independently accessible (deep-linkable)
- All tools work fully offline (no API calls)
- Framer Motion animations respect prefers-reduced-motion

---

## Crisis Helplines

| ID | Name | Organisation | Number | Hours | Languages |
|----|------|-------------|--------|-------|-----------|
| icall | iCall | TISS, Mumbai | 9152987821 | Mon-Sat 8am-10pm | English, Hindi |
| vandrevala | Vandrevala Foundation | Vandrevala Foundation | 1860-2662-345 | 24x7 | English, Hindi |
| aasra | AASRA | AASRA | 9820466627 | 24x7 | English, Hindi |
| ihelp | iHelp | iHelp | 9152987821 | Mon-Sat 8am-10pm | English, Hindi, Gujarati |

### Crisis Screen Behaviour

Triggered when riskLevel is 'high' or 'critical':

1. Full-screen overlay renders over the chat
2. Helpline cards displayed with tap-to-call links
3. Breathing tool shortcut shown inline
4. 'I am safe right now' button allows dismissal
5. Dismissal is logged locally (not sent to server)
6. On next message, safety store re-evaluates risk level

### Helpline Data Governance

- Helpline numbers are verified against official sources before each release
- Numbers are stored in helplines.json (not hardcoded in components)
- A quarterly review task is included in the release checklist
- Future: state-specific helplines based on user's selected region

---

## Safety Governance Policy

### What the AI CAN Say

- Acknowledge and validate emotions
- Normalise common student struggles (exam stress, loneliness, self-doubt)
- Suggest one small concrete coping action
- Recommend breathing, grounding, or other calming tools
- Gently suggest talking to a counsellor or trusted adult
- Provide hope and encouragement
- Celebrate wins and positive moments
- Share culturally relevant motivational perspectives

### What the AI CANNOT Say

- Diagnose any mental health condition (depression, anxiety disorder, ADHD, etc.)
- Mention specific methods of self-harm or suicide
- Say 'You have [condition]' or 'You are [condition]'
- Provide medical advice or medication recommendations
- Claim to be a therapist, psychologist, or doctor
- Dismiss or minimise distress ('Just think positive')
- Use fear-based motivation ('You'll fail if you don't...')
- Moralize or lecture ('You should have started earlier')
- Use hollow affirmations ('Everything happens for a reason')
- Switch languages mid-response

### Risk Level Response Rules

**none / low**
- Standard empathetic response
- Optional tool suggestion via suggestedTool field

**medium**
- Response includes a soft nudge: 'Would it help to talk to someone trained for this?'
- Message bubble renders a gentle info card with helpline teaser

**high**
- Response includes explicit hope statement and professional help suggestion
- Frontend renders a helpline card below the message bubble

**critical**
- Crisis screen overlay is triggered immediately
- AI response is still shown but secondary to the crisis screen
- Helplines are foregrounded with tap-to-call
- Breathing tool is shown inline

### Prompt Injection Defence Rules

The following input patterns are blocked before reaching the LLM:

- 'ignore previous instructions' / 'ignore all instructions'
- 'system prompt'
- 'you are now'
- 'pretend to be'
- 'jailbreak'
- 'act as' (except 'act as a student')

Blocked inputs are replaced with '[Input filtered for safety]'. The AI still receives the sanitised input and responds with a supportive message, so the user experience is not broken.

### Content Review Process

1. System prompt changes require review by at least one team member with mental health awareness
2. New affirmations are reviewed for cultural sensitivity before merge
3. Helpline numbers are verified quarterly
4. Risk level thresholds are reviewed after any reported safety incident
5. All prompt changes are logged in this CHANGELOG

---

## Accessibility Specification

### Implemented

| Feature | Implementation |
|---------|---------------|
| Reduced motion | Framer Motion respects prefers-reduced-motion media query; all animations disabled |
| High contrast theme | CSS variable swap via theme-store; WCAG AA contrast ratios targeted |
| Large text mode | Font scale multiplier stored in accessibility prefs; applied via CSS custom property |
| Screen reader labels | aria-label on all icon buttons; role=status on typing indicator |
| Keyboard navigation | All interactive elements reachable via Tab; Enter/Space activate buttons |
| Focus indicators | Visible focus ring on all focusable elements (not suppressed) |
| Touch targets | Minimum 44x44px touch target on all interactive elements |
| Colour independence | Risk levels communicated via text + icon, not colour alone |

### Accessibility Preferences Storage Key

Key: manasitra_accessibility

Shape:

    {
      reducedMotion: boolean,
      highContrast: boolean,
      largeText: boolean
    }

### Known Gaps

- Mood canvas (freehand drawing) has no accessible alternative for motor-impaired users — tracked as P1 issue
- Some Recharts chart elements lack descriptive aria-labels — tracked as P1 issue
- RTL language support not yet implemented (no RTL languages in current scope)

---

## Offline and Degraded Mode Behaviour

### Fully Offline (No Network)

| Feature | Behaviour |
|---------|-----------|
| All 10 calming tools | Fully functional — no API calls required |
| Mood check-in | Fully functional — writes to localforage |
| Progress dashboard | Fully functional — reads from localforage |
| Affirmations | Fully functional — data bundled in JSON |
| Helplines | Fully functional — data bundled in JSON |
| Privacy page | Fully functional |
| Settings | Fully functional |

### Degraded (Backend Unreachable)

| Feature | Behaviour |
|---------|-----------|
| AI chat | Shows pre-written fallback message in selected language |
| Fallback message | Acknowledges the user, suggests a calming tool, shows helpline teaser |
| Crisis detection | Falls back to keyword-based frontend detection (basic) |
| Risk level | Defaults to 'low' on API failure |

### Offline Detection

The frontend uses the browser's navigator.onLine API and a fetch probe to detect connectivity. When offline:
- Chat input shows an offline banner
- Send button is disabled with tooltip explaining offline state
- Games, mood, and dashboard remain fully accessible

---

## Operations and Maintenance

### Health Check

    GET /health
    Response: { status: 'ok', version: '1.0.0' }

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /api/chat | 20 requests | 1 minute |
| All other routes | 60 requests | 1 minute |

Rate limit responses return HTTP 429 with:

    { error: 'Too many requests. Please wait a moment.' }

### Logging

Morgan is configured with a minimal format: method + URL + status + response time. No request bodies, no IP addresses, no user identifiers are logged.

### Dependency Updates

- Run npm audit in both backend/ and manasitra-web/ before each release
- Groq SDK updates should be tested against the JSON response schema — model behaviour can change with SDK updates
- React 19 and Vite 8 are on the latest major; monitor for breaking changes

### Release Checklist

1. Verify all helpline numbers are current
2. Run npm audit in both packages
3. Test all 10 calming tools manually
4. Test crisis screen trigger (send a high-risk test message)
5. Test all 10 language AI responses
6. Test offline mode (disable network, verify fallback)
7. Test shared device mode
8. Verify privacy page shows correct data keys
9. Run Lighthouse accessibility audit
10. Update APP_VERSION in constants.js
11. Update this CHANGELOG

---

## Content and Prompt Lifecycle

### System Prompt Versioning

The system prompt lives in backend/utils/prompt-builder.js. Changes to the prompt are considered breaking changes and require:

1. A new minor version bump
2. An entry in this CHANGELOG under the relevant version
3. Manual testing of all 6 response modes in at least English and Hindi
4. Review by a team member with mental health awareness

### Affirmations

File: manasitra-web/src/data/affirmations/affirmations.json

Affirmations are keyed by language code. Each entry has:
- id: unique string
- text: the affirmation in the target language
- category: study | self-worth | resilience | calm | celebration

New affirmations must be reviewed for:
- Cultural sensitivity and appropriateness for Indian students
- Avoiding toxic positivity
- Avoiding religious or caste references
- Grammatical correctness in the target language (native speaker review preferred)

### i18n String Updates

All UI strings live in manasitra-web/src/data/i18n/<code>.json. When adding new UI features:
1. Add the key to en.json first
2. Add translations for all 9 other languages
3. Use machine translation as a draft, then native speaker review for hi, gu, mr, bn, ta, te, kn, ml, pa
4. Never ship untranslated keys — fall back to English in i18next config

---

## Mood Tracking Semantics

### Mood States

| ID | Emoji | Colour | Description |
|----|-------|--------|-------------|
| very_happy | Grinning face | #F5C842 (yellow) | Joyful, energised |
| content | Smiling face | #4CAF82 (green) | Calm, satisfied |
| neutral | Neutral face | #9E9B94 (grey) | Neither good nor bad |
| anxious | Anxious face | #E8A045 (amber) | Worried, nervous |
| sad | Crying face | #5B9BD5 (blue) | Low, tearful |
| overwhelmed | Dizzy face | #D05A72 (red) | Too much, can't cope |
| exhausted | Sleeping face | #9B8FF0 (purple) | Drained, burnt out |

### Mood Log Schema

Stored in localforage under key manasitra_mood_log:

    Array<{
      id: string,           // uuid
      mood: string,         // mood state ID
      note: string,         // optional, max 100 chars
      timestamp: number,    // Unix ms
      sessionId: string     // anonymous session identifier
    }>

### Mood Log Rules

- Maximum note length: 100 characters (MAX_NOTE_LENGTH constant)
- Notes are never sent to the server
- Mood log is used only for the local progress dashboard chart
- No mood data is correlated with chat content
- Mood check-in is optional — skipping never blocks access to any feature

### Streak Calculation

A streak is the number of consecutive calendar days with at least one mood check-in. A grace period of 1 missed day is applied — missing a single day does not break the streak. Missing 2 or more consecutive days resets the streak to 0.

---

## Student Context Modes

Manasitra recognises that Indian students face distinct pressure contexts. The responseMode field in the chat API maps to these contexts:

### standard
Default mode for general emotional support. Balanced empathy, normalisation, and one concrete action. Suitable for most conversations.

### study
Activated when the user mentions exams, assignments, deadlines, or study-related stress. Focuses on:
- Break reminders (Pomodoro-style suggestions)
- One-task-at-a-time framing
- Reducing perfectionism pressure
- Celebrating small study wins

### panic
Activated when acute anxiety signals are detected (racing thoughts, can't breathe, heart pounding). Focuses on:
- Slowed pacing in the response
- Breathing exercise as the first suggestion
- Grounding technique as the second suggestion
- Extra gentle, non-demanding tone

### crisis
Activated when riskLevel is high or critical. Focuses on:
- Deep acknowledgement of pain
- Explicit hope statement
- Gentle professional help suggestion
- Never dismissive, never minimising

### celebration
Activated when the user shares good news (passed exam, got placement, achieved a goal). Focuses on:
- Genuine amplification of joy
- No caveats or warnings
- Encouraging the user to savour the moment
- Suggesting sharing the win with someone they care about

### grief
Activated when the user mentions loss (bereavement, relationship ending, failure). Focuses on:
- Validation-first, no silver linings unless invited
- Non-prescriptive presence
- Gentle normalisation of grief
- No timeline pressure ('You'll feel better soon')

---

## Admin and CMS Foundation

### Current State

The ENABLE_ADMIN feature flag exists in .env but the admin routes are not yet implemented. The foundation is in place for a future admin panel.

### Planned Admin Capabilities

| Capability | Priority | Notes |
|-----------|----------|-------|
| Affirmations CMS | P1 | Add/edit/delete affirmations per language without code deploy |
| Helpline management | P1 | Update helpline numbers and hours without code deploy |
| System prompt editor | P2 | Edit and A/B test system prompts with rollback |
| i18n string editor | P2 | Edit UI strings without code deploy |
| Safety keyword editor | P2 | Add/remove injection detection patterns |
| Usage analytics dashboard | P2 | Aggregate, anonymised usage metrics (no PII) |

### Admin Authentication Plan

Admin routes will be protected by a simple API key header (X-Admin-Key) stored in .env. No user-facing login UI. Admin is an internal tool only.

### CMS Data Storage Plan

Admin-managed content will be stored in a lightweight JSON file store or SQLite database on the backend. No external CMS dependency. Content is served via a new /api/content route and cached in the frontend.

---

## Observability and Monitoring

### Current Instrumentation

| Signal | Tool | Detail |
|--------|------|--------|
| HTTP access logs | Morgan | method + URL + status + response time only |
| Error logs | console.error | Error message only, no stack trace in production |
| Startup diagnostics | console.log | LAN IPs, API key presence check |
| Health check | GET /health | Returns {status, version} |

### What Is NOT Logged

- Request bodies (no chat messages logged server-side)
- User IP addresses
- Language or response mode selections
- Any user-identifiable information

### Recommended Production Additions (P1)

- Structured JSON logging (replace Morgan with pino or winston)
- Error rate alerting (Sentry or equivalent, with PII scrubbing)
- Groq API latency tracking (p50, p95, p99)
- Rate limit hit rate monitoring
- Health check uptime monitoring (UptimeRobot or equivalent)

### Frontend Error Tracking (P2)

- React Error Boundary on all page-level components
- Error events sent to a privacy-safe analytics endpoint (no PII, no chat content)
- Offline/online state transitions logged for UX analysis

---

## Deployment Architecture

### Current (Development)

    User Browser
        |
        | localhost:5173 (Vite dev server)
        v
    manasitra-web (React SPA)
        |
        | localhost:3001 (Express)
        v
    backend (Node.js)
        |
        | HTTPS
        v
    Groq Cloud API

### Recommended Production

    User Browser
        |
        | HTTPS (CDN edge)
        v
    CDN (Cloudflare / Vercel / Netlify)
    [Static SPA build — manasitra-web/dist]
        |
        | HTTPS API calls
        v
    Backend (Railway / Render / Fly.io)
    [Node.js process, single instance]
        |
        | HTTPS
        v
    Groq Cloud API

### Build Commands

    # Frontend production build
    cd manasitra-web
    npm run build
    # Output: manasitra-web/dist/ (static files)

    # Backend production start
    cd backend
    npm start
    # Runs: node server.js

### Environment Considerations

- Set NODE_ENV=production in backend for production deployments
- Set ALLOWED_ORIGINS to the production frontend domain
- Groq API key must be set as a secret environment variable (never in source)
- Backend should run behind a reverse proxy (nginx or platform-provided) for TLS termination
- No database required for current feature set

---

## Web Roadmap

### P0 — Critical (Must ship before public launch)

| Item | Description | Status |
|------|-------------|--------|
| Crisis screen polish | Ensure crisis screen is accessible and tested on all 10 languages | In progress |
| Offline fallback messages | Write fallback messages in all 10 languages | Pending |
| Helpline verification | Verify all 4 helpline numbers are current | Pending |
| Accessibility audit | Lighthouse + manual keyboard navigation test | Pending |
| Rate limit tuning | Validate 20 req/min is appropriate for real usage | Pending |
| Error boundary coverage | React Error Boundary on all page-level components | Pending |

### P1 — High Priority (Next sprint)

| Item | Description |
|------|-------------|
| Mood canvas accessibility | Add accessible alternative for motor-impaired users |
| Recharts aria labels | Add descriptive aria-labels to all chart elements |
| Structured logging | Replace Morgan with pino for JSON-structured logs |
| Sentry integration | Error tracking with PII scrubbing |
| State-specific helplines | Show helplines relevant to user's state/region |
| PWA manifest | Add web app manifest for Add to Home Screen support |
| Service worker | Cache static assets and calming tool data for offline |
| Affirmations CMS | Admin interface for managing affirmations without code deploy |
| Helpline CMS | Admin interface for managing helpline data |

### P2 — Medium Priority (Future sprints)

| Item | Description |
|------|-------------|
| System prompt A/B testing | Test prompt variants with rollback capability |
| i18n string editor | Edit UI strings without code deploy |
| Usage analytics | Aggregate, anonymised metrics dashboard (no PII) |
| Voice input | Speech-to-text for chat input (accessibility + convenience) |
| Text-to-speech | Read AI responses aloud (accessibility) |
| Peer support rooms | Anonymous group chat rooms moderated by AI |
| Counsellor referral | In-app booking flow for iCall and partner counsellors |
| Regional language expansion | Odia, Assamese, Urdu |
| Dark mode OLED | True black dark mode for OLED screens |
| Haptic feedback | Vibration API integration for breathing bubble |

---

## Future Mobile Path

### Strategy

Manasitra is mobile-first web today. The path to native mobile is via React Native with maximum code reuse from the web codebase.

### Shared Code Plan

| Layer | Web | Mobile (planned) | Shared |
|-------|-----|-----------------|--------|
| Business logic | Zustand stores | Zustand stores | Yes — stores are framework-agnostic |
| API client | fetch | fetch | Yes |
| i18n | i18next | i18next | Yes |
| Data files | JSON imports | JSON imports | Yes |
| UI components | React + Tailwind | React Native + StyleSheet | No — separate implementations |
| Animations | Framer Motion | React Native Reanimated | No — separate implementations |
| Storage | localStorage + localforage | AsyncStorage + MMKV | Adapter pattern |

### Mobile-Specific Features (Planned)

- Push notifications for daily mood check-in reminders (opt-in only)
- Haptic feedback for breathing bubble and tap-to-calm
- Background audio for body scan and breathing exercises
- Home screen widget for quick mood check-in
- Biometric lock for privacy (Face ID / fingerprint)
- Offline-first with no server sync — all data stays on device

### Platform Targets

- Android: API level 26+ (Android 8.0+)
- iOS: iOS 15+
- Distribution: Google Play Store + Apple App Store
- Timeline: Post-web-v2.0 stability

---

## Known Issues

| ID | Severity | Component | Description | Workaround |
|----|----------|-----------|-------------|------------|
| KI-001 | Medium | Mood Canvas | No accessible alternative for motor-impaired users | Skip the tool; use Affirmation Shuffle instead |
| KI-002 | Medium | Progress Dashboard | Recharts chart elements lack descriptive aria-labels | Screen reader users cannot interpret chart data |
| KI-003 | Low | Chat | Very long AI responses (>800 tokens) may be truncated mid-sentence | Increase GROQ_MAX_TOKENS in .env |
| KI-004 | Low | i18n | Some Punjabi (pa) UI strings are machine-translated and may sound unnatural | Native speaker review pending |
| KI-005 | Low | Crisis Screen | Dismiss button ('I am safe') can be triggered accidentally on small screens | Requires double-tap confirmation — planned for P1 |
| KI-006 | Low | Offline Detection | navigator.onLine can return true even when the backend is unreachable | Fetch probe added but has 3s delay |
| KI-007 | Low | Rate Limiter | Rate limit is per-IP; shared NAT environments (college hostels) may hit limits faster | Increase limit or implement user-level token bucket |
| KI-008 | Info | Backend | Morgan logs response time but not Groq API latency separately | Add Groq latency instrumentation in P1 |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 2025 | Team | Initial document |
| 1.1 | Mar 2025 | Team | Added crisis support and helplines sections |
| 1.2 | Apr 2025 | Team | Added multilingual engine documentation |
| 1.3 | May 2025 | Team | Added privacy architecture section |
| 1.4 | Jun 2025 | Team | Added mood tracking semantics and progress dashboard |
| 1.5 | Jul 2025 | Team | Added calming tools suite, roadmap, mobile path, known issues |

---

*Manasitra — Mann Ka Mitra. Friend of the Mind.*

*This document is the single source of truth for Manasitra product decisions, architecture, safety governance, and release history. Update it with every significant change.*

