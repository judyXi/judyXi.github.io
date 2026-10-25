---
title: 我的 Grok Bot 秘書團隊：一人公司怎麼讓 CEO Agent 帶 7 個 bot
date: 2026-10-24
publish-date: 2026-10-24
blog_status: published
excerpt: 一個總經理 bot 帶 7 個 bot，全部接在 Obsidian 第二大腦上。我現在每天只看一份報告，要我決定的事集中在一張表。
tags:
  - 教學
  - Grok Bot
  - AI
  - Obsidian
  - 一人公司
---

# 我的 Grok Bot 秘書團隊：一人公司怎麼讓 CEO Agent 帶 7 個 bot

上禮拜我在 X 隨手發了一句：

> Grok Bot相見恨晚…
> 有個秘書管理大小事真的輕鬆😌

這篇寫我現在實際怎麼用，重點在 bot 之間怎麼分工。

## 重點摘要

- 我只跟一個總經理 bot（CEO Agent）講話，它底下帶 7 個 bot
- 所有東西都放在 Obsidian 筆記庫，雲端的 bot 跟我 Windows 電腦上的 Codex 看同一份
- 每天 11:30 左右只發一份總報告
- 要我決定的事，集中在儀表板一張表，回 A 或 B 就好
- 規矩：會變的事先查來源、花錢先報價、最後的決策我自己按

> [!danger] 先講清楚
> - 這是我 2026 年 10 月的用法。功能跟方案一直在變，以官方說明為準。
> - 文中提到的功能，有實測過的才寫怎麼用；還沒試的會直接寫「還沒試」。

## Grok Bot 是什麼

Grok Bot 是 xAI 的 AI 助理對初次使用的新手非常好上手。我的 bot 們在雲端共用一台電腦做事，也可以排固定時間自動跑的工作（官方叫 routine）。

我這篇寫的是一人公司怎麼讓一群 bot 分工。

## 開始前準備：方案和費用

Grok Bot 現在包含在 X 的訂閱方案（The X Subscription）裡。以下是官方定價頁寫的月費（2026-10-24 查）：

| 方案      | 月費（美金） | 有沒有 Grok Bot |
| ------- | ------ | ------------ |
| Free    | $0     | 沒有           |
| Plus    | $8     | 沒有           |
| Premium | $30    | 有            |
| Super   | $100   | 有            |
| Ultra   | $200   | 有            |

來源：[官方定價](https://docs.x.ai/x-subscription/pricing)、[Grok Bot 方案說明](https://cursor.com/help/grok-bot/plans)

- Grok Bot 跟 Grok App、Cursor 共用同一個每週額度，不是另外算。
- 額度用完之後，可以改扣預先儲值的 credit，在 grok.com/dashboard/billing 設定。
- 用量在 grok.com/dashboard 看。
- 原本訂舊方案的人，官方說可以繼續用。

我自己是付費訂閱 X Premium 30美金的額度。

![[Pasted image 20261024190850.png]]

我自己還準備了：

1. Obsidian 筆記庫，開 Obsidian Sync，讓雲端跟電腦看同一份(又噴一份錢)。
2. 電腦上的 Codex，負責要動電腦檔案的事。
3. 一份寫給所有 bot 看的規則檔（我叫它 AGENTS.md），放在筆記庫最上層。

## 一、我的團隊：一個總經理帶 7 個 bot

以前我想到什麼就找不同的 bot。現在只找一個，我叫它總經理（CEO Agent）。總經理負責派工、追進度、回報，不自己包辦專業的事。

| 角色             | 負責              |
| -------------- | --------------- |
| 總經理（CEO Agent） | 接我的需求、派工、每天發總報告 |
| 企劃總監           | 行銷、貼文草稿         |
| 繪師             | 圖片（歸企劃總監管）      |
| 晨間秘書           | 整理每日筆記、信箱、行事曆   |
| 財務管家           | 市場資訊            |
| 計畫教練           | 週日陪我做週回顧        |
| 學習夥伴           | 每天丟我一題          |
| 工作助理           | 顧我工作上的事         |

bot 之間可以互傳文字訊息派工。我有試過讓 bot 互傳圖片，沒成功，所以圖片一律放進筆記庫給它們讀。
PS:圖是文章後面新增的，多了幾個機器人

![[Pasted image 20261024191632.png]]

**可以直接複製的指令：**

```
你是我的總經理。
我只跟你講話，你負責把事情派給對應的 bot。
你不要自己包辦專業的事，負責分派、追進度、把關、回報。
派工的時候一定要寫：任務、要交什麼、怎樣算做好。
```

## 二、Obsidian 第二大腦＋Windows 電腦雙向同步

我的筆記庫「第二大腦」。bot 讀的是這裡，做完的東西也寫回這裡。

| 資料夾   | 放什麼          |
| ----- | ------------ |
| 每日筆記  | 我隨手打的東西，不用分類 |
| 生成    | bot 做好的報告    |
| Tasks | 任務看板、交接紀錄    |
| 佇列    | 要問我的問題       |
| Skill | 每個固定流程的做法    |

1. 想到什麼就打進當天的每日筆記。
2. 早上晨間秘書整理昨天的筆記，在下面加一段「AI 整理結果」。
3. 雲端的 bot 跟電腦上的 Codex 都在「Grok-Codex 交接紀錄」留言交接。

![[Pasted image 20261024192002.png]]

![[Pasted image 20261024192247.png]]


## 三、每天只收一份總報告

現在每天 11:30 左右，總經理發一份總報告給我，大概照這個順序：

1. 今天的行程
2. 天氣
3. 要我回答的問題
4. 市場
5. 新聞（5–8 則，每則附來源連結）

設定步驟：

1. 在 Skill 資料夾寫一份「每日總報告」，寫清楚要哪些段落、什麼順序。
2. 請總經理開一個每天 11:30 跑的 routine，提示詞寫「照這份筆記的格式做」。
3. 跑幾天覺得哪裡不好，就改那份筆記，不用重設 routine。

![[Pasted image 20261024194648.png]]

**可以直接複製的指令：**

```
每天 11:30 給我一份總報告，這是我一天唯一一份報告。
格式照 Skill/每日總報告.md。
其他 bot 有要給我的東西，併進這份，不要另外傳。
沒有新東西的段落寫「無」就好。
```

## 四、佇列問答：要問我的，集中在一張表

bot 有問題要問我的時候，不會一直在聊天裡追。它在「佇列」開一則問題筆記，統一顯示在儀表板「 需要你回答」的表格。

1. 每則問題筆記上方有一個 指定欄位。
2. 有選項的寫好 A、B，我填一個字母就好。
3. 我有空打開儀表板一次填完，bot 下次跑的時候讀到再處理。

>![[Pasted image 20261024194750.png]]


**可以直接複製的指令：**

```
有問題要問我的時候，不要在聊天裡一直問。
在 佇列 資料夾開一則問題筆記，上面加 XXX 欄位。
有選項就寫成 A／B，我回一個字母就好。
```

## 五、「先查來源」規則

這條是 10 月才加的。會變的事，像日期、行程、價格、狀態，bot 回答之前要先去查（行事曆、筆記庫、信箱），還要寫出查了哪裡、什麼時候查的。查不到的要標「推測」。

**可以直接複製的指令：**

```
會變的事實（日期、行程、價格、狀態）回答前先查來源，不要靠記憶。
寫出你查了哪裡、什麼時候查的。
查不到就標「推測」。
```

## 六、交辦一定要寫驗收標準

每個任務都要寫三件事：

- 任務是什麼（一句話）
- 要交出什麼
- 怎樣才算做好

任務記在「團隊任務看板」，看板說完成才算完成。

![[Pasted image 20261024195128.png]]

## 七、額度用超快，我這樣做

覺得grok bot非常好用但是額度消耗得有點快，所以我用以下方式。

1. routine 一天最多跑一兩次。
2. 沒新東西就不要傳訊息給我。
3. bot 之間少聊天，改用筆記庫的檔案交接。
4. 要做很久的事，先講好預算。

## 安全與權限：自己的規矩

1. 花錢、花點數之前先報價，我說好才算。像繪師做頭像，一張多少點都會先講。
2. 會變的事先查來源。

|       |                                          |                               |
| ----- | ---------------------------------------- | ----------------------------- |

## 比較表：電腦上的 Codex vs 雲端的 Grok Bot

|      | Codex               | Grok Bot               |
| ---- | ------------------- | ---------------------- |
| 在哪跑  | 我的 Windows 電腦       | 雲端、手機                  |
| 適合做  | 要動電腦裡檔案的事、寫程式       | 每天的 routine、查資料、派工、提示詞 |
| 怎麼交接 | 寫在「Grok-Codex 交接紀錄」 | 同一份交接紀錄                |

## FAQ

**Q：一定要用 Obsidian 嗎？**
不一定。我用 Obsidian 是因為雲端跟電腦可以看同一份，bot 做完的東西也有地方放。

**Q：bot 那麼多，不會很亂嗎？**
我只跟CEO講話，其他 bot 我很少直接找。要我決定的事都在同一張表。

**Q：bot 會自己幫我發文、花錢嗎？**
我的規矩是不會。發文我自己按，有需要花錢先報價。

**Q：bot 之間可以傳圖片嗎？**
我試的時候失敗。現在都把圖放進筆記庫。

**Q：額度夠用嗎？**
30美金的方案覺得用很快，所以 routine 一天最多跑一兩次。

## 開始的第一步

不用一次設好。可以這樣慢慢加：

1. 先把筆記庫的資料夾分好：每日筆記、生成、Tasks、佇列。
2. 先只開一個 bot，請它每天整理一次每日筆記。
3. 順了再加一份每天固定時間的總報告。
4. bot 變多之後，再設一個總經理負責派工。

## 新手第一天：照這樣做就能開始

以下步驟對照官方的 [Get started](https://docs.x.ai/grok-bot/get-started)。介面名稱照官方英文寫，中文介面的字可能不一樣。

1. **確認方案**：要 Premium 以上才有 Grok Bot（看上面的價格表）。
2. **裝 app、登入**：桌面版有 Mac、Windows、Linux，手機有 iPhone 和 Android。第一次登入會跑一段簡短介紹，雲端電腦在背景設定，好了之後會自動建好第一個 bot，名字就叫 Grok Bot。
3. **第一句話先講它的工作**：它負責什麼、要怎麼做，最後加一句「記住這個做法」。官方建議一個 bot 一個主要工作，比一個什麼都做的 bot 好用。
4. **第一個任務：選不用登入任何網站的**。丟一份文件給它，請它整理。

**可以直接複製的指令（改寫自官方範例）：**

```
幫我把這份文件整理成 5 點重點。
日期、決定、還沒解決的問題分開列。
每一點註明在第幾頁或哪一段。
不要改原始檔案。
```

5. **不滿意就直接講**。想以後都照這樣，就明講「以後都用這個格式」。
6. **第一個 routine：同一件事做順了再排**。官方建議的順序是：先做一次 → 做穩 → 存成 skill → 最後才排 routine（[Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)）。

**可以直接複製的指令（第一個 routine，小小的就好）：**

```
每天早上 9:00，在這個對話給我今天台北的天氣，
再提醒我一件今天要做的事。
沒有要提醒的就只給天氣。
```

排好之後要注意（官方 [Routines](https://cursor.com/help/grok-bot/routines)）：

- 打開 bot 的詳細資料，在 Routines 點進去看「When to run」，確認時間跟時區對不對。
- 新排的 routine 不會馬上跑，要等下一次排定的時間。想馬上試可以按 Test，但 Test 是真的會做事。
- 每跑一次都會用到額度，跑越頻繁用越多。

## 常見卡關和解法

| 卡在哪            | 怎麼解                                                                                                                                           | 來源                                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 登入一直沒完成        | app 先開著，確認瀏覽器顯示登入成功，再自己切回 app                                                                                                                 | [官方 Troubleshooting](https://docs.x.ai/grok-bot/troubleshooting)                                                       |
| 網站一直要登入、驗證碼    | bot 會請你接手（Take over），自己輸入密碼或驗證碼，按 I'm done 交回去。密碼和驗證碼不要貼在聊天裡                                                                                  | [官方 Get started](https://docs.x.ai/grok-bot/get-started)、[Troubleshooting](https://docs.x.ai/grok-bot/troubleshooting) |
| bot 好像卡住       | 打開它的電腦畫面，看是不是在等你登入、或有問題卡片沒回。方向錯就直接講，要它停就直接叫它停                                                                                                 | [官方 Troubleshooting](https://docs.x.ai/grok-bot/troubleshooting)                                                       |
| routine 沒有跑    | 確認沒有暫停、時間和時區對、新的 routine 要等下一次排定時間                                                                                                            | [官方 Routines](https://cursor.com/help/grok-bot/routines)                                                               |
| 外掛連不上          | 到側邊欄 Connect apps 確認有裝好，重新授權一次                                                                                                                | [官方 Troubleshooting](https://docs.x.ai/grok-bot/troubleshooting)                                                       |
| bot 不能動我電腦裡的檔案 | bot 用的是雲端電腦，跟你面前那台是分開的。要不要讓它動你的電腦，在 Settings → Computer → Your computer 的 Execution on this computer 設定，預設是每次都問。我自己有開，用來核對 Windows 電腦上的筆記（實測） | [官方 Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy)                       |
| 額度掉很快          | 先看 routine 跑多頻繁，用不到的先暫停。我自己是一天最多跑一兩次（實測）                                                                                                      | [官方 Routines](https://cursor.com/help/grok-bot/routines)                                                               |
| bot 之間傳圖片失敗    | 我試的時候失敗，改成把圖放進筆記庫給它讀（實測）                                                                                                                      | 我自己試的                                                                                                                  |

## 文章還沒寫到、但新手用得到的功能

只寫查得到官方來源的。「實測」是我自己用過的，「還沒試」就是還沒試。（2026-10-24 查）

| 功能              | 能做什麼                                                                           | 我的狀態                                                        | 官方來源                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 連接器／外掛（plugins） | 把其他服務接上 bot，讓它直接讀寫。在側邊欄 Connect apps 加，手機版是點頭像再找 Connect apps，接的時候要授權          | 實測（我接了 Gmail、Google 日曆、Google Drive、X、Composio，每天的總報告都會讀日曆） | [Connect plugins](https://cursor.com/help/grok-bot/connect-plugins)、[Use the computer and apps](https://docs.x.ai/grok-bot/computer-and-apps) |
| Skill           | 把做順的流程存成一份做法，所有 bot 都能用。在輸入框打 `/` 可以叫出來                                        | 實測                                                          | [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)                                                             |
| Routine         | 排固定時間自動跑；有些情況也能等事情發生才跑（官方舉的例子是 Slack 訊息、GitHub 通知）。在雲端跑，筆電關著也會跑                | 實測                                                          | [Routines](https://cursor.com/help/grok-bot/routines)、[Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations)       |
| 記憶（memory）      | bot 記住的事，換一個對話也記得。官方也提醒：會變的事要叫它查現在的來源，不要只靠記憶                                   | 實測                                                          | [10/22 更新紀錄](https://x.ai/changelog/bot)、[Grok Bot 官方說明](https://docs.x.ai/grok-bot)                                                          |
| bot 互傳訊息        | bot 之間可以互傳訊息，也可以開群組                                                            | 實測（文字可以，圖片沒成功）                                              | [Grok Bot 官方說明](https://docs.x.ai/grok-bot)                                                                                                   |
| 連結自己的電腦         | 讓 bot 在你面前那台電腦跑指令、讀檔案。預設每次都會問你，官方建議沒特別需要就關掉                                    | 實測（我用來核對 Windows 電腦上的筆記）                                    | [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy)                                                 |
| Page            | 在聊天裡請 bot 把結果做成一頁（官方叫 Page），之後在 bot 詳細資料的 Library 找得到。官方說是陸續開放                 | 實測（做過一個唯讀總覽 Page）                                           | [Pages](https://cursor.com/help/grok-bot/pages)、[10/22 更新紀錄](https://x.ai/changelog/bot)                                                      |
| Vault           | 在 Settings > Vault 存登入資料、卡片、聯絡資訊，bot 登入或結帳時幫你填。官方說 bot 看不到密碼、卡號和安全碼            | 還沒試                                                         | [Store secrets securely](https://cursor.com/help/grok-bot/secrets)、[10/23 更新紀錄](https://x.ai/changelog/bot)                                   |
| 手機 app          | iPhone（iOS 18 以上）、Android（9 以上），跟桌面版是同一批 bot、同一台雲端電腦。改 routine 和按 Test 目前要用桌面版 | 實測（有在用）                                                     | [Grok Bot for Mobile](https://docs.x.ai/grok-bot/mobile)                                                                                      |
| 用量              | Grok Bot、Grok App、Cursor 共用每週額度，在 grok.com/dashboard 看                         | 上面方案那段有寫                                                    | [Plans and billing](https://cursor.com/help/grok-bot/plans)                                                                                   |

## 最後

| 項目    | 我的做法          |
| ----- | ------------- |
| 資料放哪  | Obsidian 筆記庫  |
| 跟誰講話  | 只跟總經理         |
| 每天看什麼 | 11:30 一份總報告   |
| 問題怎麼回 | 儀表板表格，填 A 或 B |
| 會變的事  | 先查來源          |
| 花錢    | 先報價           |
| 發文    | 暫時我自己按        |

還在邊用邊調，有在用的可以交流一下😅
