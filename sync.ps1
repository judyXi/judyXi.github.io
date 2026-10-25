# ========================================
#   Obsidian -> judy-blog Sync (no push)
# ========================================

$VaultRoot = "C:\Users\user\Desktop\" + (-join ([char[]](0x8166, 0x888B, 0x74DC, 0x74DC)))
$cc1 = [char]0x5275; $cc2 = [char]0x4F5C
$ic1 = [char]0x5716; $ic2 = [char]0x7247
$ObsidianBlog = "$VaultRoot\$cc1$cc2\Blog"
$ObsidianImg  = "$VaultRoot\$ic1$ic2"
$ContentDir   = "C:\Users\user\Desktop\judy-blog\content\blog"
$ImgDir       = "C:\Users\user\Desktop\judy-blog\public\images"

Write-Host ""
Write-Host "============================" -ForegroundColor Cyan
Write-Host "  Obsidian -> judy-blog Sync" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $ObsidianBlog)) {
    Write-Host "  ERROR: Blog folder not found" -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}

if (-not (Test-Path $ContentDir)) {
    New-Item -ItemType Directory -Path $ContentDir -Force | Out-Null
}

$added   = @()
$updated = @()
$skipped = @()

function Remove-BlogPrivateBlocks([string]$Content) {
    return [regex]::Replace(
        $Content,
        '<!--\s*blog-private-start\s*-->.*?<!--\s*blog-private-end\s*-->',
        '',
        [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
}

function Add-BlogCover([string]$FileName, [string]$Content) {
    $covers = @{
        '建立第二大腦-用Obsidian和Claude打造知識系統的工作流.md' = '![建立第二大腦：資料經 AI 整理、連結並轉化為輸出](/images/second-brain-obsidian-claude.png)'
        '你不是在跟AI競爭，是在跟會用AI的人競爭.md' = '![AI 放大人的專業判斷與工作產能](/images/ai-amplifies-human-work.png)'
    }
    if (-not $covers.ContainsKey($FileName)) { return $Content }
    $cover = $covers[$FileName]
    if ($Content.Contains($cover)) { return $Content }
    $frontmatter = [regex]::new('\A(---\s*\r?\n.*?\r?\n---\s*\r?\n)', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    return $frontmatter.Replace($Content, { param($m) $m.Groups[1].Value + "`r`n$cover`r`n`r`n" }, 1)
}

Get-ChildItem "$ObsidianBlog\*.md" | ForEach-Object {
    $src = $_.FullName
    $dst = Join-Path $ContentDir $_.Name
    $fileContent = Get-Content $src -Raw -Encoding UTF8

    if ($fileContent -match '(?m)^(?:status|blog_status):[ \t]*draft[ \t]*(?:#.*)?\r?$') {
        $skipped += $_.Name
        return
    }

    if (-not (Test-Path $dst)) {
        $publicContent = Remove-BlogPrivateBlocks $fileContent
        $publicContent = Add-BlogCover $_.Name $publicContent
        [System.IO.File]::WriteAllText($dst, $publicContent, [System.Text.UTF8Encoding]::new($false))
        $added += $_.Name
    } else {
        $srcTime = (Get-Item $src).LastWriteTime
        $dstTime = (Get-Item $dst).LastWriteTime
        if ($srcTime -gt $dstTime) {
            $publicContent = Remove-BlogPrivateBlocks $fileContent
            $publicContent = Add-BlogCover $_.Name $publicContent
            [System.IO.File]::WriteAllText($dst, $publicContent, [System.Text.UTF8Encoding]::new($false))
            $updated += $_.Name
        }
    }
}

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

Write-Host "---- Result -----------------------" -ForegroundColor White

if ($added.Count -gt 0) {
    Write-Host "  [Added]" -ForegroundColor Green
    $added | ForEach-Object { Write-Host "    + $_" -ForegroundColor Green }
}

if ($updated.Count -gt 0) {
    Write-Host "  [Updated]" -ForegroundColor Yellow
    $updated | ForEach-Object { Write-Host "    ~ $_" -ForegroundColor Yellow }
}

if ($skipped.Count -gt 0) {
    Write-Host "  [Skipped drafts]" -ForegroundColor DarkGray
    $skipped | ForEach-Object { Write-Host "    - $_" -ForegroundColor DarkGray }
}

if ($imgCount -gt 0) {
    Write-Host "  [Images] +$imgCount" -ForegroundColor Cyan
}

if ($added.Count -eq 0 -and $updated.Count -eq 0 -and $imgCount -eq 0) {
    Write-Host "  Nothing to sync" -ForegroundColor DarkGray
}

Write-Host "-----------------------------------" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to close"
