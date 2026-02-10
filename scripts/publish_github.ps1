Param(
    [string]$RepoName = "bfhl-api",
    [string]$Visibility = "public",
    [string]$DefaultBranch = "main"
)

# PowerShell helper to initialize git repo and create remote via GitHub CLI if available.
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Path) | Out-Null
Set-Location -Path ".." | Out-Null

if (-not (Test-Path -Path .git)) {
    git init
    git add .
    git commit -m "Initial commit - BFHL API"
    git branch -M $DefaultBranch
} else {
    Write-Host "Git repository already initialized."
}

if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "Found GitHub CLI (gh). Creating repo $RepoName ..."
    gh repo create $RepoName --$Visibility --source=. --remote=origin --push
    Write-Host "Repository created and pushed."
} else {
    Write-Host "GitHub CLI not found. Please create a public repository named '$RepoName' on GitHub and run these commands:";
    Write-Host "  git remote add origin https://github.com/<your-username>/$RepoName.git"
    Write-Host "  git push -u origin $DefaultBranch"
}

Write-Host "Next: add repository secrets (GROQ_API_KEY, OFFICIAL_EMAIL) via GitHub Settings -> Secrets."
