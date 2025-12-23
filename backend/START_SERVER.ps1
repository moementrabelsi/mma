Write-Host "========================================" -ForegroundColor Green
Write-Host "  Demarrage du Backend MMA Agriculture" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location $PSScriptRoot

Write-Host "Verifying Node.js installation..." -ForegroundColor Yellow
node --version
Write-Host ""

Write-Host "Installing dependencies if needed..." -ForegroundColor Yellow
npm install
Write-Host ""

Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host ""
node src/server.js



