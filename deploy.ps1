# ========================================
#   Judy's Blog - Deploy to GitHub
# ========================================

# Build Chinese paths using Unicode code points to avoid encoding issues
# U+5275 U+4F5C = chuang zuo (the two characters before \Blog)
$cc1 = [char]0x5275; $cc2 = [char]0x4F5C  # folder name
$BlogDir    = "C:\Users\user\Desktop\judy-blog"
$ObsidianBlog = "C:\Users\user\Desktop\Obsidian\$cc1$cc2\Blog"
$ContentDir = "$BlogDir\content\blog"
$ImgDir     = "$BlogDir\public\images"

function Remove-BlogPrivateBlocks([string]$Content) {
    return [regex]::Replace(
        $Content,
        '<!--\s*blog-private-start\s*-->.*?<!--\s*blog-private-end\s*-->',
        '',
        [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
}

Write-Host ""
Write-Host "============================" -ForegroundColor Cyan
Write-Host "  Judy Blog - Deploy" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Verify path
if (-not (Test-Path $ObsidianBlog)) {
    Write-Host "  ERROR: Cannot find blog folder:" -ForegroundColor Red
    Write-Host "  $ObsidianBlog" -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}

# 1. Sync posts (skip drafts and status: draft/cao-gao)
Write-Host "[1/4] Syncing posts..." -ForegroundColor Yellow
if (-not (Test-Path $ContentDir)) {
    New-Item -ItemType Directory -Path $ContentDir -Force | Out-Null
}
Remove-Item "$ContentDir\*.md" -ErrorAction SilentlyContinue

$mdCount = 0
$draftCount = 0
Get-ChildItem "$ObsidianBlog\*.md" | ForEach-Object {
    $fileContent = Get-Content $_.FullName -Raw -Encoding UTF8
    # Skip if status is draft (English or Chinese)
    if ($fileContent -match '(?m)^status:\s*(draft)') {
        Write-Host "      Skip draft: $($_.Name)" -ForegroundColor DarkGray
        $draftCount++
    } else {
        $destination = Join-Path $ContentDir $_.Name
        $publicContent = Remove-BlogPrivateBlocks $fileContent
        [System.IO.File]::WriteAllText($destination, $publicContent, [System.Text.UTF8Encoding]::new($false))
        $mdCount++
        Write-Host "      + $($_.Name)" -ForegroundColor DarkGreen
    }
}
Write-Host "      Synced $mdCount posts (skipped $draftCount drafts)" -ForegroundColor Green

# 2. Sync local images (Obsidian ![[]] embeds only)
Write-Host "[2/4] Syncing images..." -ForegroundColor Yellow
if (-not (Test-Path $ImgDir)) {
    New-Item -ItemType Directory -Path $ImgDir -Force | Out-Null
}

# Build image source path
$ic1 = [char]0x5716; $ic2 = [char]0x7247  # folder name for images
$ObsidianImg = "C:\Users\user\Desktop\Obsidian\$ic1$ic2"

$imgCount = 0
Get-ChildItem "$ContentDir\*.md" | ForEach-Object {
    $fileContent = Get-Content $_.FullName -Raw -Encoding UTF8
    $imgMatches = [regex]::Matches($fileContent, '!\[\[([^\]|]+\.(png|jpg|jpeg|webp|gif))(?:\|[^\]]+)?\]\]')
    foreach ($m in $imgMatches) {
        $imgName = $m.Groups[1].Value
        $safeName = $imgName.Replace(' ', '-').ToLower()
        $srcPath = Join-Path $ObsidianImg $imgName
        $dstPath = Join-Path $ImgDir $safeName
        if (Test-Path $srcPath) {
            Copy-Item $srcPath $dstPath -Force
            $imgCount++
        }
    }
}
Write-Host "      Synced $imgCount images" -ForegroundColor Green

# 3. Verify production output before committing
Write-Host "[3/5] Building and checking output..." -ForegroundColor Yellow
Set-Location $BlogDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Build failed. Nothing was pushed." -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}

$missingImages = @()
Get-ChildItem "$ContentDir\*.md" | ForEach-Object {
    $fileContent = Get-Content $_.FullName -Raw -Encoding UTF8
    [regex]::Matches($fileContent, '!\[\[([^\]|]+\.(png|jpg|jpeg|webp|gif))(?:\|[^\]]+)?\]\]') | ForEach-Object {
        $safeName = $_.Groups[1].Value.Replace(' ', '-').ToLower()
        if (-not (Test-Path (Join-Path $ImgDir $safeName))) { $missingImages += $_.Groups[1].Value }
    }
}
if ($missingImages.Count -gt 0) {
    Write-Host "  Missing images; deploy stopped:" -ForegroundColor Red
    $missingImages | Sort-Object -Unique | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
    Read-Host "Press Enter to close"
    exit 1
}
Write-Host "      Build and image checks passed" -ForegroundColor Green

# 4. Git commit
Write-Host "[4/5] Git commit..." -ForegroundColor Yellow
Set-Location $BlogDir
git add .
$now = Get-Date -Format 'yyyy/MM/dd HH:mm'
git commit -m "deploy $now" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "      Commit created" -ForegroundColor Green
} else {
    Write-Host "      Nothing to commit" -ForegroundColor DarkGray
}

# 5. Push
Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================" -ForegroundColor Green
    Write-Host "  Deploy success!" -ForegroundColor Green
    Write-Host "  https://judyXi.github.io" -ForegroundColor Cyan
    Write-Host "============================" -ForegroundColor Green
} else {
    Write-Host "  Push failed." -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close"
