#!/usr/bin/env pwsh
# Clean up stuck rebase
$rebasePath = Join-Path (Get-Location) ".git/rebase-merge"
if (Test-Path $rebasePath) {
    Remove-Item -Path $rebasePath -Recurse -Force
    Write-Host "Cleaned up rebase state"
}

# Also try rebase-apply if it exists
$rebaseApplyPath = Join-Path (Get-Location) ".git/rebase-apply"
if (Test-Path $rebaseApplyPath) {
    Remove-Item -Path $rebaseApplyPath -Recurse -Force
    Write-Host "Cleaned up rebase-apply state"
}

Write-Host "Done cleaning up git state"
