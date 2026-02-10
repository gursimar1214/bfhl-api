# BFHL API

Backend API built using Node.js and Express for the BFHL assignment.

---

## API Endpoints

### GET /health
http://localhost:3000/health

Returns API status and official email.

---

### POST /bfhl
http://localhost:3000/bfhl

Accepts JSON input for:
- fibonacci
- prime
- lcm
- hcf
- AI query

---

## Notes
- `.env` file is ignored for security
- AI API keys are optional (fallback logic exists)
