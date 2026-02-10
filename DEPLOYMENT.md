# Deployment Notes

This file provides concise deployment steps for Vercel, Railway, and Render, plus a short `ngrok` note for temporary testing.

Common preparation
1. Ensure the repository is public and contains the full source.
2. Add environment variables in the target platform: `OFFICIAL_EMAIL`, `GROQ_API_KEY` (if using AI), `PORT` (if required).
3. Recommended Node version: 18+.

Vercel
1. Create a Vercel account and connect your GitHub repository.
2. Import the project and set framework preset to "Other" or "Node.js".
3. Add environment variables in Project Settings → Environment Variables.
4. Build & Start commands (Vercel will auto-detect):
   - Build command: none (this is a simple Node app)
   - Start command: `npm start`
5. Deploy and copy the public URL.

Railway
1. Create a new project and link the GitHub repo.
2. In Railway project settings add environment variables: `OFFICIAL_EMAIL`, `GROQ_API_KEY`.
3. Set the start command to `npm start` and the correct root directory if needed.
4. Deploy and copy the service URL.

Render
1. New Web Service → Connect GitHub repo.
2. Choose Node environment and set the Start Command to `npm start`.
3. Add environment variables in the deploy configuration.
4. Deploy and copy the URL.

Ngrok (temporary testing)
1. Install `ngrok` locally: https://ngrok.com
2. Run your server locally (e.g. `PORT=3000 npm start`).
3. Expose the running server: `ngrok http 3000` and use the HTTPS forwarding URL for testing.

Security & production tips
- Do not commit `.env` to the repo.
- Restrict API keys using platform secrets and access controls.
- Add logging/monitoring and set `NODE_ENV=production` in production.
- Consider rate-limiting and input sanitization in front-facing deployments.
