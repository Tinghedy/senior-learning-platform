# 樂齡學習平台 — Design System

> 高齡友善設計系統。所有 token 對應 **W3C WAI「Developing Websites for Older People」** 中的 WCAG 2.0/2.1 成功準則。
> 目標：符合 **AA** 等級，視覺面向（字級、對比）達 **AAA**。
> 來源：https://www.w3.org/WAI/older-users/developing/

---

## 核心原則（先讀這段）

W3C WAI **不給固定 px 數字**，給的是原則。本系統的數字是依「W3C 原則 + WCAG 可量化準則」推導，每個都標了對應準則。實作時不要隨意改這些值，要改先回頭看對應準則。

| 原則 | 數字 | WCAG |
|------|------|------|
| 預設提供大字、可放大 200% 不破版 | 基準 18px、全用 rem | 1.4.4 (AA) |
| 文字對比足夠、避免純白眩光 | 文字 ≥ 7:1、底色淺米白 | 1.4.6 (AAA) |
| 不只靠顏色傳達狀態 | 選取加粗框、標籤配圖示 | 1.4.1 (A) |
| 觸控目標夠大、間隔足夠 | 最小 48px、間隔 ≥ 8px | 2.5.5 (AAA) |
| 鍵盤焦點高度可見 | 3px 實線 + 2px offset | 2.4.7 (AA) |
| 導覽位置一致、標示目前頁 | 四個 Tab 固定、麵包屑 | 3.2.3 / 2.4.8 |
| 影片配字幕 | 所有影片內容 | 1.2.2 (A) |
| 輪播可暫停、不自動跳內容 | 提供暫停鍵 | 2.2.2 (A) |
| 送出可回復、有確認紀錄 | 報名後顯示成功狀態 | 3.3.4 (AA) |
| 用日常語言、避免術語 | 「指令」不寫「prompt/咒語」 | 3.1.3 / 3.1.5 |

---

## 1. CSS 變數（單一來源）

把這段放進全域 CSS（例如 `src/styles/tokens.css`），整個專案都引用這些變數。**這是所有顏色與尺寸的唯一來源。**

```css
:root {
  /* ---- 文字色（標註在對應底色上的實測對比）---- */
  --color-text-primary:   #1A1A1A;  /* 16.1:1 on page — AAA */
  --color-text-secondary: #444444;  /* 9.7:1  — AAA */
  --color-text-muted:     #5C5C5C;  /* 7.0:1  — AAA 下限，勿更淺 */
  --color-text-on-accent: #FFFFFF;  /* 5.9:1 on accent — AA */
  --color-link:           #0B5FB0;  /* 連結一律加底線，不只靠色 */

  /* ---- 表面 ---- */
  --color-page:    #FBF9F4;  /* 淺米白頁底，非純白（避免眩光）*/
  --color-card:    #FFFFFF;
  --color-sunken:  #F0EDE6;  /* 搜尋欄、內凹區 */
  --color-border:  #C7C2B8;  /* 3.1:1 — 非文字對比 1.4.11 AA */

  /* ---- 主色 ---- */
  --color-accent:        #1F6FC2;  /* 5.9:1 配白字 */
  --color-accent-hover:  #175699;
  --color-accent-subtle: #E7F0FA;  /* 選取背景 */

  /* ---- 語意回饋 ---- */
  --color-success:    #1E7A45;  /* 4.6:1 配白字 */
  --color-error:      #B3261E;  /* 6.4:1 */
  --color-error-bg:   #FCEEEE;
  --color-warning:    #9A5B00;  /* 5.2:1 */
  --color-warning-bg: #FBF1E2;

  /* ---- 焦點 ---- */
  --color-focus: #0B3D91;

  /* ---- 字級（基準 18px，全 rem，ratio 1.2）---- */
  --font-size-caption: 0.889rem; /* 16px — 地板，勿更小 */
  --font-size-body:    1rem;     /* 18px — 預設閱讀 */
  --font-size-body-lg: 1.125rem; /* 20px — 卡片標題 */
  --font-size-h3:      1.333rem; /* 24px */
  --font-size-h2:      1.6rem;   /* 29px — 區塊標題 */
  --font-size-h1:      2rem;     /* 36px — 頁面標題 */

  /* ---- 行高 ---- */
  --line-height-tight: 1.3;   /* 標題 */
  --line-height-body:  1.6;   /* 內文，W3C 要求 ≥ 1.5 */

  /* ---- 間距（8px grid）---- */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* ---- 尺寸 ---- */
  --touch-target: 48px;  /* 最小可點高度，超過 2.5.5 的 44px */
  --touch-gap:    8px;
  --icon-sm: 20px;
  --icon-md: 24px;
  --icon-lg: 28px;       /* Tab bar 圖示 */

  /* ---- 圓角 ---- */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* ---- 框線 ---- */
  --border-hairline: 1px;
  --border-default:  1.5px;
  --border-strong:   2px;   /* 選取/啟用狀態外框 */

  /* ---- 焦點環 ---- */
  --focus-width:  3px;
  --focus-offset: 2px;

  /* ---- 字體 ---- */
  --font-base: 'Noto Sans TC', system-ui, sans-serif;
}

/* 基準字級設在 html，讓 rem 與 200% 縮放生效 */
html { font-size: 18px; }
body {
  font-family: var(--font-base);
  background: var(--color-page);
  color: var(--color-text-primary);
  line-height: var(--line-height-body);
}

/* 全域焦點環（鍵盤導覽）— 2.4.7 */
*:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}
```

---

## 2. Tailwind 設定（引用 CSS 變數）

`tailwind.config.js` — 讓 utility class 對應到上面的變數，改一處全專案同步。

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
          'on-accent': 'var(--color-text-on-accent)',
        },
        link:    'var(--color-link)',
        page:    'var(--color-page)',
        card:    'var(--color-card)',
        sunken:  'var(--color-sunken)',
        border:  'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
          subtle:  'var(--color-accent-subtle)',
        },
        success: 'var(--color-success)',
        error:   'var(--color-error)',
        'error-bg': 'var(--color-error-bg)',
        warning: 'var(--color-warning)',
        'warning-bg': 'var(--color-warning-bg)',
        focus:   'var(--color-focus)',
      },
      fontSize: {
        caption: 'var(--font-size-caption)',
        body:    'var(--font-size-body)',
        'body-lg': 'var(--font-size-body-lg)',
        h3: 'var(--font-size-h3)',
        h2: 'var(--font-size-h2)',
        h1: 'var(--font-size-h1)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        touch: 'var(--touch-target)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      minHeight: { touch: 'var(--touch-target)' },
      minWidth:  { touch: 'var(--touch-target)' },
      fontFamily: { base: 'var(--font-base)' },
    },
  },
  plugins: [],
}
```

用法範例：`<button className="min-h-touch px-lg rounded-pill bg-accent text-on-accent text-body">`

---

## 3. 元件規格

每個元件的硬性規格。實作時照這個做，不要憑感覺調尺寸。

### 主要按鈕 Button
- `min-height: 48px`、`border-radius: pill`、`padding: 0 24px`
- 背景 `accent`、文字 `on-accent`、字級 `body`
- hover → `accent-hover`；focus → 全域焦點環
- 圖示在文字左側，`20px`

### 分類晶片 Chip
- `min-height: 44px`、`border-radius: pill`、`padding: 0 16px`
- 預設：`card` 底 + `1.5px border`
- **選取：`accent-subtle` 底 + `2px accent 框` + 文字 `accent` 加粗** ← 顏色＋框雙重標示（1.4.1）

### 搜尋欄 Search field
- `min-height: 48px`、`sunken` 底、`pill` 圓角
- 左側放大鏡圖示 `20px`、placeholder 用 `text-muted`

### 標籤 Tag
- `padding: 3px 10px`、`radius-sm`、字級 `caption`
- **一律圖示 + 文字**，不只靠顏色（1.4.1）
- 影片 = success 系、線上 = accent 系、線下 = warning 系、類別 = sunken 系

### 卡片 Card
- `card` 底、`1.5px border`、`radius-md`、`box-shadow: 0 1px 3px #00000014`
- 縮圖區高 120px（手機）、標題 `body-lg` 粗體、描述 `body` 用 `text-secondary`

### 底部 Tab Bar（手機固定四個）
- 四個：首頁 / 找課程 / 有興趣的課 / 問問題
- 每個 `min-height: 56px`、圖示 `28px` + 文字 `caption`
- 目前頁：`accent` 色 + 加粗（位置每頁一致，3.2.3）

### 語音問答浮動鈕 FAB
- 藍色 pill、麥克風圖示 + 「語音問問題」文字
- 固定右下、`box-shadow: 0 4px 16px #0000001f`
- **每頁都在**（常駐求助入口，3.3.5）

### 回饋訊息 Feedback
- 成功 = `success` 框 + 勾選圖示；錯誤 = `error` 框 + 警告圖示
- 錯誤訊息要「說明問題 + 給解法」（3.3.1 / 3.3.3）

---

## 4. 圖示

用 **Heroicons**（outline, 24x24, stroke 1.5）。安裝：`npm i @heroicons/react`

| 用途 | Heroicon |
|------|----------|
| 首頁 | HomeIcon |
| 找課程 / 搜尋 | MagnifyingGlassIcon |
| 有興趣的課 | StarIcon |
| 問問題 / 語音 | MicrophoneIcon |
| 線上 | GlobeAltIcon |
| 線下 | MapPinIcon |
| 影片 | PlayCircleIcon |
| 文章 | DocumentTextIcon |
| 時長 | ClockIcon |
| 觀看數 | EyeIcon |
| 回上一步 | ChevronLeftIcon |
| 手機操作 | DevicePhoneMobileIcon |
| AI 入門 | CpuChipIcon |
| 網路購物 | ShoppingCartIcon |
| 健保查詢 | HeartIcon |

---

## 5. 匯入 Figma（給設計用）

`leji_design_tokens.json` 是 W3C Design Tokens 格式。Figma 裝外掛 **Tokens Studio for Figma** → Tools → Import → 貼上 JSON，即生成 variables / styles。
