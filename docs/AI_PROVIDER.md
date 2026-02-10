# AI Provider Setup

This project is configured to use an external AI provider via the `GROQ_API_KEY` environment variable. The code expects a compatible REST endpoint configured via `GROQ_API_URL` and optional `GROQ_MODEL`.

Recommended approaches:

- Google Gemini (AI Studio):
  1. Visit https://aistudio.google.com and sign in with your Google account.
 2. Create an API key for a project and copy it.
 3. Set `GROQ_API_KEY` to the generated key in your `.env` or deployment secrets.

- OpenAI:
  1. Create an API key at https://platform.openai.com/account/api-keys.
  2. To use OpenAI, set `GROQ_API_URL` to the appropriate OpenAI REST endpoint and `GROQ_API_KEY` to your key. (The current code expects the same request shape — you may need to adapt `ai.service.js` for provider differences.)

Notes
- If `GROQ_API_KEY` is not present or the external call fails, `ai.service.js` falls back to a deterministic mapper for some factual queries (e.g., capitals).
- Never commit API keys to the repository. Use repository secrets or platform environment variables.
