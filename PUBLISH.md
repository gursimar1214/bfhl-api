# Publishing the repository

Use the included helper script or follow the manual steps below to publish this project to GitHub.

Option A — PowerShell helper (Windows)
1. Open PowerShell in the project root.
2. Run:

```powershell
.\scripts\publish_github.ps1 -RepoName "bfhl-api"
```

This will initialize Git (if needed), commit, and attempt to create and push the repo using the `gh` CLI. If `gh` is not installed you'll be shown the manual git commands to run.

Option B — Manual
1. Create a new public repository on GitHub (name: `bfhl-api`).
2. From project root:

```bash
git init
git add .
git commit -m "Initial BFHL API commit"
git branch -M main
git remote add origin https://github.com/<your-username>/bfhl-api.git
git push -u origin main
```

3. On GitHub: Settings → Secrets and variables → Actions (or Repository secrets) add:
- `GROQ_API_KEY` (if using the provided AI integration)
- `OFFICIAL_EMAIL` (your Chitkara email)

Deployment
- Follow `DEPLOYMENT.md` to deploy on Vercel/Railway/Render.
