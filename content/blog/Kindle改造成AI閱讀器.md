---
title: Kindle 改造成AI 閱讀器：越獄、KOReader、SimpleUI、AI 翻譯與注音完整手冊
date: 2026-08-24
publish-date: 2026-08-24
status: published
excerpt: 從確認韌體、依官方精靈越獄，到安裝 KOReader、SimpleUI、AI Dictionary、繁體注音鍵盤與重建備份，完整記錄我把 Kindle 改造成中文 AI 閱讀器的過程。
tags:
  - Kindle
  - KOReader
  - 電子書
  - AI翻譯
  - 教學
---

![[Pasted image 20260824223818.png|244]]
# 把 Kindle 改造成 AI 閱讀器

我原本只是想在Kindle上能好好看PDF，原生的軟體看PDF實在痛苦至極，字小不能調整，發現越獄才能解決問題，只好......

先研究越獄，第一次還因為重置與更新，把機器升到不能越獄的版本；隔了幾個月再試，終於在韌體 5.19.2 上成功。接著裝 KOReader、換首頁、加字典、處理幾百本書、接 OpenAI API，最後甚至補了一套 KOReader 官方根本還沒有的繁體中文注音鍵盤。

現在這台 Kindle ，可以直接讀 EPUB、查離線字典、用 AI 解釋英文、顯示自訂鎖定畫面，也能用注音搜尋中文書名

這篇不是「把檔案丟進去就好」的三分鐘教學，而是我的重建手冊。假如哪天換了一台新 Kindle，才能從零開始恢復回現在的樣子。

> [!danger] 先讀這段再動手
> Kindle 越獄方法會隨機型與韌體改變。本文記錄的成功機器韌體是 **5.19.2**，但未來的新機不可以直接沿用舊越獄壓縮檔。每次都要重新使用 Kindle Modding 的 Jailbreak Wizard 判斷。錯用檔案、讓 Kindle 自動更新或隨意恢復原廠設定，都可能使越獄失敗，嚴重時可能無法正常開機。

## 最後完成的配置

| 項目        | 實際配置                        |
| --------- | --------------------------- |
| Kindle 韌體 | 5.19.2                      |
| 原生廣告      | 有；不影響 KOReader 運作           |
| KOReader  | v2026.07.1                  |
| 首頁介面      | SimpleUI                    |
| 擴充首頁模組    | SimpleUI Ext v1.14.0        |
| AI 功能     | AI Dictionary，連接 OpenAI API |
| AI 模型     | gpt-5.4-mini                |
| 中文鍵盤      | 自製台灣大千注音，輸出繁體中文             |
| 書籍格式      | 主要使用 EPUB，保留少數 PDF          |
| 書庫        | 分成 11 大類與細分類                |
| AZW3／MOBI | 已全部移除或轉成 EPUB               |
| 自訂鎖定畫面    | 可顯示目前書籍封面或指定圖片              |
|           |                             |

核心原則：**Kindle 原生系統只負責開機，閱讀工作交給 KOReader。**

## 一、開始以前：先確認機器，不要先下載越獄包

先在 Kindle 原生介面查看：

```text
設定 → 裝置選項 → 裝置資訊
```

記錄三件事：

1. Kindle 型號。
2. 韌體版本。
3. 序號前幾碼。

前幾碼已足夠協助辨認機型。

接著完成這些準備：

- 電量至少 50%，最好接近充滿。
- 準備可傳輸資料的 USB 線；很多線只能充電。
- 暫時關閉 Wi-Fi，降低自動更新風險。
- 備份 Kindle 裡的重要書籍與 `My Clippings.txt`。
- 不要在不確定的情況下按「恢復原廠設定」。

我的第一次失敗，就是折騰一整天後重置機器，結果被更新到新韌體。這種錯誤很心累但也是血的教訓。

## 二、越獄：永遠從官方判斷精靈開始

打開 [Kindle Modding Jailbreak Wizard](https://kindlemodding.org/jailbreak-wizard.html)，依序選擇機型與韌體。精靈會告訴你當下適用的方法；如果顯示沒有可用越獄，就先停止，不要拿別人的壓縮檔硬試。[S1]

現代 Kindle 越獄的目標不是安裝另一套作業系統，而是取得執行外部程式的能力。原生書店、Kindle Unlimited 和一般閱讀功能仍然存在。[S1]

實際操作時遵守四個規則：

1. 完整閱讀精靈指定頁面，不跳步。
2. 只下載精靈當下指定的檔案。
3. 若教學要求填滿儲存空間阻擋更新，就照做，完成後再刪除填充檔。
4. 越獄成功前不要重新連上 Wi-Fi，除非教學明確要求。

成功後，現代越獄通常會一併建立更新阻擋與 KPM 套件管理器。越獄是系統狀態，不是每次重開機都要重做；一般重新啟動不會讓它消失。但是恢復原廠設定、錯誤更新韌體或移除越獄，可能破壞這個狀態。[S1]

越獄完成後先重新啟動一次 Kindle，再刪除根目錄殘留的韌體 `.bin` 更新檔與教學用填充檔。[S2]

## 三、使用 KPM 安裝 KOReader

現代越獄使用 KPM 管理套件，不必再照舊文章安裝 KUAL；Kindle Modding 已將 KUAL 標示為舊式流程。[S3]

先讓 Kindle 連上 Wi-Fi，在原生 Kindle 首頁的搜尋欄依序輸入：

```text
;kpm update
```

等待畫面上方顯示更新訊息並返回首頁，再輸入：

```text
;kpm install koreader
```

安裝完成後，首頁會出現 KOReader Scriptlet。圖示沒有立刻出現時，稍等一下或重新啟動。也可以直接在搜尋欄輸入：

```text
;kpm launch koreader
```

這套做法的優點是，未來要更新或移除 KOReader 時，可以繼續由 KPM 處理：

```text
;kpm update
;kpm uninstall koreader
```

KOReader 是另一個閱讀器，不會把 Kindle 原生系統刪掉。要回到原生 Kindle，從 KOReader 選單選擇「退出」；若按了沒有反應，先等待幾秒，不要連續猛按。仍卡住時再重新啟動裝置。

### 電腦突然連不到 Kindle 怎麼辦？

我遇過在 KOReader 裡插 USB，電腦只充電卻看不到磁碟。最穩定的處理方式是：

1. 從 KOReader 完全退出，回到 Kindle 原生首頁。
2. 拔掉 USB。
3. 等待五秒，再重新插入。
4. 更換確定能傳資料的 USB 線或 USB 孔。
5. 在 Windows「磁碟管理」確認 Kindle 是否有磁碟代號。

## 四、先認識 KOReader 的資料夾

把 Kindle 連到電腦後，這次配置會使用以下結構：

```text
Kindle 根目錄/
├─ books/                         電子書與分類
├─ koreader/
│  ├─ plugins/                   第三方 KOPlugin
│  ├─ data/dict/                 StarDict 離線字典
│  ├─ fonts/                     自訂字體
│  ├─ settings/                  KOReader 設定
│  ├─ styletweaks/               自訂排版樣式
│  └─ frontend/ui/data/
│     └─ keyboardlayouts/        鍵盤與自製注音補丁
└─ documents/                    KPM Scriptlet 與原生文件
```

第三方插件一定要保留完整的 `.koplugin` 資料夾。例如：

```text
/koreader/plugins/simpleui.koplugin/main.lua
```

錯誤情況通常是多包了一層：

```text
/koreader/plugins/simpleui.koplugin-main/simpleui.koplugin/main.lua
```

KOReader 只會掃描正確層級。放完插件後要完整重新啟動 KOReader。

## 五、安裝 SimpleUI：把檔案瀏覽器變成真正的首頁

SimpleUI 是這套配置最明顯的外觀改造。它能顯示目前閱讀、最近書籍、閱讀進度、封面列、統計、快捷按鈕、底部導覽列、狀態列與自訂桌布。[S5]

安裝方式：

1. 前往 [SimpleUI GitHub](https://github.com/doctorhetfield-cmd/simpleui.koplugin)。
2. 選擇 `Code → Download ZIP`。
3. 解壓縮。
4. 確認真正的插件資料夾名稱為 `simpleui.koplugin`。
5. 複製到 `/koreader/plugins/`。
6. 重啟 KOReader。

開啟位置：

```text
選單 → 工具 → Simple UI
```

建議先設定：

- Home Screen：啟用首頁。
- Start with Home Screen：啟動 KOReader 時直接開首頁。
- Navigation Bar：保留首頁、書庫、歷史、統計與電源。
- Currently Reading：顯示目前閱讀封面和進度。
- Recent Books：顯示最近開啟書籍。
- Reading Stats：顯示閱讀時間與頁數。
- Wallpaper：選擇首頁背景；它和鎖定畫面是不同功能。

SimpleUI 和 Bookshelf 類插件可能同時安裝，但若兩者都接管首頁，容易出現重複導覽或操作混亂。我的最終配置以 SimpleUI 為主，沒有依賴 Bookshelf 才能運作。

## 六、安裝 SimpleUI Ext：加入更多閱讀統計模組

SimpleUI Ext 是 SimpleUI 的額外模組與補丁，目前這台安裝的是 v1.14.0。[S6]

安裝方式同樣是下載、解壓縮後，把：

```text
simpleui_ext.koplugin
```

放到：

```text
/koreader/plugins/
```

重啟 KOReader 後，進入 SimpleUI 的 Arrange Modules。擴充模組會自動出現在可選清單中，不必編輯 `main.lua`。

值得開啟的模組包括：

- Hero Currently Reading：大型目前閱讀卡片，含封面、進度與預估剩餘時間。
- Recent Book Stats：目前書籍的閱讀時間與速度。
- Reading Streaks：連續閱讀天數與週數。
- Reading Insights：年度與月份閱讀活動。
- Currently Reading with Pace：每日閱讀時間、每分鐘頁數、每日完成百分比。

模組太多會使 Kindle 首頁變慢。我的做法是只保留每天真的會看的資訊。

## 七、書籍格式：以 EPUB 為主，不再讓 AZW3 搗亂

KOReader 官方列出的常見支援格式包括 EPUB、PDF、DjVu、MOBI、CBZ、DOCX、HTML、TXT 等。[S4] 但在這台 Kindle 的實際使用中，AZW3 無法可靠開啟，因此最後採取很單純的規則：

> **可重排文字書全部轉成 EPUB；版面型文件保留 PDF。**

### 用 Calibre 轉檔

1. 在 Calibre 選取書籍。
2. 點「轉換書本」。
3. 右上角輸出格式選擇 `EPUB`。
4. 檢查書名、作者、封面與語言。
5. 完成後確認書籍格式欄出現 EPUB。
6. 將 EPUB 複製到 Kindle 的 `/books/` 分類資料夾。

不要只把副檔名從 `.azw3` 改成 `.epub`；那不叫轉檔。

## 八、建立能長期使用的書庫分類

我的 `/books/` 參考 Kobo 類別再細分：

```text
01_文學小說/
  01_當代文學  02_散文詩歌  03_科幻奇幻  04_輕小說
  05_愛情與LGBT  06_經典文學  07_懸疑推理  08_幽默
02_心理成長/
  01_心理學  02_自我成長  03_學習與思考
03_商業理財/
  01_個人理財  02_管理與職場  03_經濟與商業  04_創業與行銷
04_人文歷史/
  01_歷史  02_哲學與思考  03_宗教與靈性  04_文化藝術
05_科學科技/
  01_科學與自然  02_科技與電腦
06_生活實用/
  01_健康與幸福  02_家庭與關係  03_旅行  04_飲食與生活
07_人物傳記/01_傳記與回憶錄
08_社會紀實/
  01_社會文化  02_政治與紀實
09_語言學習/01_語言學習
10_童書青少年/
  01_兒童文學  02_青少年
11_漫畫/01_漫畫與圖像小說
99_待分類/
```

## 九、加入字體與離線字典

### 自訂字體

將 `.ttf` 或 `.otf` 字體放入：

```text
/koreader/fonts/
```

重啟 KOReader，開啟 EPUB 後從底部排版選單選擇字體。PDF 是固定版面，通常不能像 EPUB 一樣直接換字體。[S4]

中文閱讀建議選擇涵蓋繁體中文字形的字體。缺字時，畫面可能出現方框或退回系統字體。

### 離線字典

KOReader 使用 StarDict 字典。完整字典通常包含：

```text
字典名稱.ifo
字典名稱.idx
字典名稱.dict 或 字典名稱.dict.dz
```

解壓縮後，整套檔案放入：

```text
/koreader/data/dict/字典名稱/
```

不要把一般 `.mobi` 字典誤當成 StarDict。

重啟後長按文字測試。如果有多本字典，可在字典設定調整順序。我偏好保留一套英漢字典，再加一套中文字典：英文閱讀時先看中文義，中文概念不清楚時仍能查中文解釋。

## 十、安裝 AI Dictionary：直接在書裡取得解釋

這套配置使用 [AI Dictionary for KOReader](https://github.com/nhanhhunter/AI_Dictionary.koplugin)。它可以針對選取的單字、片語或段落，連同上下文一起詢問 AI，並提供 Dictionary、Explain 等功能。[S7]

### 申請 OpenAI API

1. 前往 [OpenAI Platform](https://platform.openai.com/)。
2. 建立 API Key。
3. 在 Billing 加入預付額度。
4. 將 Key 存入密碼管理器。

API Key 不是 ChatGPT 密碼，也不是 ChatGPT Plus 訂閱。不要放進截圖、GitHub 或公開備份。

### 安裝插件

1. 下載最新版 `AI_Dictionary.koplugin`。
2. 複製到 `/koreader/plugins/`。
3. 重啟 KOReader。
4. 開一本書。
5. 進入：

```text
選單 → 更多工具 → AI Dictionary
```

6. 編輯目前 Profile。

OpenAI Chat Completions 可使用：

```text
Provider type: OpenAI-compatible Chat Completions
Base URL: https://api.openai.com/v1
Model: gpt-5.4-mini
API Key: 只填在裝置設定，不要寫進文章
```

設定後選取一個英文單字，點「AI Dictionary」或「AI Explain」。

### 強制輸出繁體中文

- 打開 Assistant 的「設定」。
- 點最上面的「AI Language／AI 語言」。
- 在兩個欄位都輸入：

```text
Traditional Chinese
```

回覆越短，API 輸出費用越低。以 `gpt-5.4-mini` 查單字或短句，5 美元通常可以使用數千次；真正的數量取決於插件每次帶入多少上下文與回覆長度。[S8]

### `max_tokens` 錯誤

我曾遇到：

```text
Unsupported parameter: 'max_tokens' is not supported with this model.
Use 'max_completion_tokens' instead.
```

這表示舊版插件仍傳送 `max_tokens`，但模型要求 `max_completion_tokens`。處理順序是：

1. 更新 AI Dictionary 到最新版。
2. 優先使用插件內建的 OpenAI Responses Profile；或確認 Chat Completions Profile 已支援新參數。
3. 重新載入模型清單並選擇帳戶可用模型。
4. 若仍失敗，再修改插件請求參數，不要反覆重試燒時間。

## 十一、自製繁體中文注音鍵盤

KOReader 官方目前只有中文筆畫輸入與簡體中文拼音。官方「加入注音輸入法」的功能請求仍未完成，因此這套注音不是商店插件，而是自製補丁。[S9]

這個版本使用：

- 台灣大千注音排列。
- 繁體中文候選字。
- 1,466 組注音碼。
- 可省略聲調。
- 逐字輸入，降低舊 Kindle 的記憶體負擔。

補丁有兩個檔案：

```text
zh_keyboard.lua
zh_zhuyin_data.lua
```

安裝位置：

```text
/koreader/frontend/ui/data/keyboardlayouts/
```

安裝前一定先備份原本的：

```text
zh_keyboard.lua
```

這台 Kindle 的備份放在：

```text
/koreader/patch-backups/zhuyin-20260824/
```

覆蓋並重啟 KOReader 後，鍵盤設定中的「中文」會從筆畫輸入變成注音。輸入完成後按「選字」，用左右箭頭切換候選。

例如輸入「中文」：

```text
ㄓ ㄨ ㄥ → 選字
ㄨ ㄣ ˊ → 選字
```

KOReader 更新可能覆蓋核心鍵盤檔，所以恢復包必須另外保存。若更新後 KOReader 無法啟動，刪除 `zh_zhuyin_data.lua`，再把原始 `zh_keyboard.lua` 放回去。

## 十二、封面鎖定畫面與固定圖片

KOReader 可以在休眠時顯示目前書籍封面，也可以顯示指定圖片。[S4]

### 顯示目前閱讀封面

開啟 KOReader 的螢幕／休眠畫面設定，將 screensaver 類型改為目前書籍封面。書檔本身要有正確封面；沒有時可先用 Calibre 補封面，或在 KOReader 書籍資訊中設定自訂封面。

### 使用固定圖片

建立一個清楚的資料夾，例如：

```text
/koreader/screensavers/
```

放入 JPG 或 PNG，再把 KOReader screensaver 設成自訂圖片或自訂圖片資料夾。電子紙適合高對比灰階圖；太暗、太細或彩度很高的圖片，轉成灰階後通常會糊成一團。

注意兩件事：
- SimpleUI Wallpaper 是 KOReader 首頁背景。
- KOReader Screensaver 才是休眠／鎖定畫面。

## 十四、最常見的故障

### 插件沒有出現

- 資料夾多包了一層。
- 名稱不是 `.koplugin` 結尾。
- 只返回首頁，沒有真正重啟 KOReader。
- 插件版本和 KOReader 不相容。

### 書太多，首頁變慢

- 減少首頁模組。
- 關閉不必要的封面牆。
- 清理已刪書籍留下的封面快取。
- 避免把大型掃描 PDF 全部放進最近閱讀。
- 分批放書，每批測試一次。

### 更新 KOReader 後注音消失

這是預期行為，因為更新可能覆蓋 `zh_keyboard.lua`。重新套用注音恢復包；如果新版本改了鍵盤架構，先不要硬蓋舊檔。

## 參考來源

- [S1] [Kindle Modding：Jailbreaking Your Kindle](https://kindlemodding.org/jailbreaking/)
- [S2] [Kindle Modding：What's Next](https://kindlemodding.org/jailbreaking/whats-next/)
- [S3] [Kindle Modding：Installing Homebrew](https://kindlemodding.org/jailbreaking/whats-next/installing-homebrew.html)
- [S4] [KOReader User Guide](https://koreader.rocks/user_guide/)
- [S5] [SimpleUI GitHub](https://github.com/doctorhetfield-cmd/simpleui.koplugin)
- [S6] [SimpleUI Ext GitHub](https://github.com/omer-faruq/simpleui_ext.koplugin)
- [S7] [AI Dictionary KOReader GitHub](https://github.com/nhanhhunter/AI_Dictionary.koplugin)
- [S8] [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing)
- [S9] [KOReader 注音輸入法功能請求](https://github.com/koreader/koreader/issues/11361)
- [S10] [Rime Bopomofo](https://github.com/rime/rime-bopomofo)



