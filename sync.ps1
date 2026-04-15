# ========================================
#   Obsidian -> judy-blog 同步工具
# ========================================

$ObsidianBlog = "C:\Users\user\Desktop\Obsidian\創作\Blog"
$ObsidianImg  = "C:\Users\user\Desktop\Obsidian\圖片"
$ContentDir   = "C:\Users\user\Desktop\judy-blog\content\blog"
$ImgDir       = "C:\Users\user\Desktop\judy-blog\public\images"

Write-Host ""
Write-Host "============================" -ForegroundColor Cyan
Write-Host "  Obsidian -> judy-blog" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $ContentDir)) {
    New-Item -ItemType Directory -Path $ContentDir -Force | Out-Null
}

$added    = @()
$updated  = @()
$skipped  = @()

Get-ChildItem "$ObsidianBlog\*.md" | ForEach-Object {
    $src = $_.FullName
    $dst = Join-Path $ContentDir $_.Name
    $fileContent = Get-Content $src -Raw -Encoding UTF8

    # 跳過草稿
    if ($fileContent -match '(?m)^status:\s*draft') {
        $skipped += $_.Name
        return
    }

    if (-not (Test-Path $dst)) {
        Copy-Item $src $dst -Force
        $added += $_.Name
    } else {
        $srcTime = (Get-Item $src).LastWriteTime
        $dstTime = (Get-Item $dst).LastWriteTime
        if ($srcTime -gt $dstTime) {
            Copy-Item $src $dst -Force
            $updated += $_.Name
        }
    }
}

# 同步圖片
$imgCount = 0
Get-ChildItem "$ContentDir\*.md" | ForEach-Object {
    $fileContent = Get-Content $_.FullName -Raw -Encoding UTF8
    $imgMatches = [regex]::Matches($fileContent, '!\[\[([^\]]+\.(png|jpg|jpeg|webp|gif))\]\]')
    foreach ($m in $imgMatches) {
        $imgName = $m.Groups[1].Value
        $safeName = $imgName.Replace(' ', '-').ToLower()
        $srcPath = Join-Path $ObsidianImg $imgName
        $dstPath = Join-Path $ImgDir $safeName
        if ((Test-Path $srcPath) -and (-not (Test-Path $dstPath))) {
            Copy-Item $srcPath $dstPath -Force
            $imgCount++
        }
    }
}

# 顯示結果
Write-Host "---- 結果 -------------------------" -ForegroundColor White

if ($added.Count -gt 0) {
    Write-Host "  [新增]" -ForegroundColor Green
    $added | ForEach-Object { Write-Host "    + $_" -ForegroundColor Green }
}

if ($updated.Count -gt 0) {
    Write-Host "  [更新]" -ForegroundColor Yellow
    $updated | ForEach-Object { Write-Host "    ~ $_" -ForegroundColor Yellow }
}

if ($skipped.Count -gt 0) {
    Write-Host "  [跳過草稿]" -ForegroundColor DarkGray
    $skipped | ForEach-Object { Write-Host "    - $_" -ForegroundColor DarkGray }
}

if ($imgCount -gt 0) {
    Write-Host "  [圖片] 新增 $imgCount 張" -ForegroundColor Cyan
}

if ($added.Count -eq 0 -and $updated.Count -eq 0 -and $imgCount -eq 0) {
    Write-Host "  沒有需要同步的變更" -ForegroundColor DarkGray
}

Write-Host "-----------------------------------" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to close"
