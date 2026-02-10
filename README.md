# BFHL API

Lightweight REST API implementing the BFHL assignment: fibonacci, prime, lcm, hcf, and AI. Includes `POST /bfhl` and `GET /health` endpoints, strict response shape, validation, and an AI integration (configurable via environment variables).

## Quick Start

Prerequisites:
- Node.js 18+ and npm

Install and run locally:

```bash
npm install
# set required env vars (see below) or create a .env file
npm start
```

Run the included quick smoke tests (uses `BASE_URL` env or localhost:3000):

```bash
npm run quick-test
```

## Environment Variables

- `PORT` (optional) — default 3000
- `OFFICIAL_EMAIL` (required) — your Chitkara email to appear in API responses
- `GROQ_API_KEY` (optional) — API key for the AI provider (if unset, deterministic fallback used)
- `GROQ_API_URL` (optional) — override AI endpoint
- `GROQ_MODEL` (optional) — model identifier to use
- `NODE_ENV` (optional)

Create a `.env` file in the project root for local development:

```
OFFICIAL_EMAIL=you@chitkara.edu.in
GROQ_API_KEY=<your_api_key>
PORT=3000
```

## Endpoints

- `GET /health` — returns `{ is_success: true, official_email: OFFICIAL_EMAIL }` (200)

- `POST /bfhl` — request body must contain exactly one of: `fibonacci`, `prime`, `lcm`, `hcf`, `AI`.

Mandatory success response structure (HTTP 200):

```json
{ "is_success": true, "official_email": "YOUR_CHITKARA_EMAIL", "data": ... }
```

On validation error respond with appropriate HTTP status (400) and `is_success: false`.

### Request examples

Fibonacci:
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"fibonacci":7}'
```

Prime filter:
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"prime":[2,4,7,9,11]}'
```

LCM / HCF:
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"lcm":[12,18,24]}'
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"hcf":[24,36,60]}'
```

AI (requires `GROQ_API_KEY` to use external AI; otherwise fallback used):
```bash
curl -X POST http://localhost:3000/bfhl -H "Content-Type: application/json" -d '{"AI":"What is the capital of Maharashtra?"}'
```

## Notes on AI

The project expects an external AI API key in `GROQ_API_KEY`. If the key is missing or the external call fails, a deterministic fallback (for some common factual queries) is used. For production use, provide a valid AI API key via environment variables.

## Running in production / deployment

See `DEPLOYMENT.md` for step-by-step deployment instructions for Vercel, Railway, and Render, plus a short `ngrok` usage note for temporary public testing.

## Project structure

- `src/` — application code
- `src/controllers` — route handlers
- `src/services` — `ai.service.js` + `math.service.js`
- `src/routes` — express routes
- `utils/validator.js` — request validation
- `scripts/quick_test.js` — quick smoke tests

## Contact

If you hand this to the company, ensure `OFFICIAL_EMAIL` and `GROQ_API_KEY` are set in the deployment environment.

Good luck!
# BFHL API

Simple REST API implementing the assignment endpoints.

Quick start

1. Copy `.env.example` to `.env` and set `OFFICIAL_EMAIL` and optionally `GROQ_API_KEY`.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Run quick tests (server must be running):

```bash
npm run quick-test
```

API endpoints

- `POST /bfhl` — accepts one key among `fibonacci`, `prime`, `lcm`, `hcf`, `AI`. See examples in the task description.
- `GET /health` — returns basic status.

Notes

- Set `GROQ_API_KEY` in `.env` to enable AI integration. If absent, a small deterministic fallback handles some capital-city questions.
- `OFFICIAL_EMAIL` must be set to your Chitkara email address.
