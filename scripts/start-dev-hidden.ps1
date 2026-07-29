Start-Process -FilePath "npm.cmd" -ArgumentList "start" -WorkingDirectory $PSScriptRoot\.. -WindowStyle Hidden
Write-Host "React dev server started in the background."
Write-Host "Open http://localhost:3000 in your browser."
