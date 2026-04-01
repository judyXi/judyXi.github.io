# ========================================
#   Judy's Blog - 一鍵發布到 GitHub
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Judy's Blog - 一鍵發布到 GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ── 設定路徑 ──────────────────────────────
$BlogDir      = "C:\Users\user\Desktop\judy-blog"
$ObsidianBlog = "C:\Users\user\Desktop\Obsidian\創作\Blog"
$ObsidianImg  = "C:\Users\user\Desktop\Obsidian\圖片"
$ContentDir   = "$BlogDir\content\blog"
$ImgDir       = "$BlogDir\public\images"

# ── 1. 同步 Obsidian 文章 ─────────────────
Write-Host "[1/4] 同步 Obsidian 文章..." -ForegroundColor Yellow
if (-not (Test-Path $ContentDir)) { New-Item -ItemType Directory -Path $ContentDir -Force | Out-Null }
Copy-Item "$ObsidianBlog\*.md" $ContentDir -Force
$mdCount = (Get-ChildItem "$ContentDir\*.md").Count
Write-Host "      已同步 $mdCount 篇文章" -ForegroundColor Green

# ── 2. 同步圖片 ──────────────────────────
Write-Host "[2/4] 同步圖片..." -ForegroundColor Yellow
if (-not (Test-Path $ImgDir)) { New-Item -ItemType Directory -Path $ImgDir -Force | Out-Null }

$imgCount = 0
Get-ChildItem "$ContentDir\*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    # 匹配 ![[xxx.png]] 或 ![[xxx.jpg]] 等
    $matches = [regex]::Matches($content, '!\[\[([^\]]+\.(png|jpg|jpeg|webp|gif))\]\]')
    foreach ($match in $matches) {
        $imgName = $match.Groups[1].Value
        $safeName = $imgName.Replace(' ', '-').ToLower()
        $srcPath = Join-Path $ObsidianImg $imgName
        $dstPath = Join-Path $ImgDir $safeName
        if (Test-Path $srcPath) {
            Copy-Item $srcPath $dstPath -Force
            $imgCount++
        }
    }
}
Write-Host "      已同步 $imgCount 張圖片" -ForegroundColor Green

# ── 3. Git 提交 ──────────────────────────
Write-Host "[3/4] Git 提交..." -ForegroundColor Yellow
Set-Location $BlogDir
git add .
$commitMsg = "更新部落格 - $(Get-Date -Format 'yyyy/MM/dd HH:mm')"
$commitResult = git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "      已建立 commit" -ForegroundColor Green
} else {
    Write-Host "      沒有新的變更需要提交" -ForegroundColor DarkGray
}

# ── 4. 推送到 GitHub ─────────────────────
Write-Host "[4/4] 推送到 GitHub..." -ForegroundColor Yellow
git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  發布成功!" -ForegroundColor Green
    Write-Host "  GitHub Actions 正在自動部署中..." -ForegroundColor Green
    Write-Host "  稍等幾分鐘後查看:" -ForegroundColor Green
    Write-Host "  https://judyXi.github.io" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "  推送失敗，請檢查網路連線或 Git 設定" -ForegroundColor Red
}

Write-Host ""
Read-Host "按 Enter 關閉"
