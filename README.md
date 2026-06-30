# 樂齡學習平台

> 為 60 歲以上長輩設計的高齡友善數位學習平台，遵循 W3C WAI 與 WCAG 2.0/2.1 無障礙標準（目標 AA 等級，視覺面向達 AAA）。

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 專案特色

- **高齡友善設計** — 基準字級 18px、觸控目標最小 48px、米白底色避免眩光，每項設計決策皆對應 WCAG 準則
- **語音問答入口** — 常駐浮動按鈕（FAB），長輩隨時說出問題，降低開口障礙
- **雙模式課程篩選** — 「線上 / 線下」第一層分流，再依類別與關鍵字二次篩選
- **收藏與報名紀錄** — 有興趣的課一鍵收藏，報名成功立即顯示確認紀錄（WCAG 3.3.4）
- **鍵盤完整可操作** — 全域 3px 焦點環、語義標籤（`<nav>` `<main>` `<button>` `<h1~h3>`），支援輔助技術
- **不只靠顏色傳達狀態** — 選取狀態附加粗框、標籤一律圖示＋文字（WCAG 1.4.1）
- **手動控制輪播** — 首頁消息輪播不自動播放，符合 WCAG 2.2.2

---

## 技術棧

### 前端核心
| 套件 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| Vite | 6 | 建置工具 |
| Tailwind CSS | 3 | Utility-first CSS，完整對應 Design Token |
| React Router | 7 | 四頁路由切換 |
| Heroicons | 2 | Outline 圖示（24×24, stroke 1.5） |

### 設計系統
- CSS 自訂變數（`tokens.css`）作為唯一顏色與尺寸來源
- Tailwind 設定引用 CSS 變數，一處修改全專案同步
- W3C Design Tokens 格式匯出（`leji_design_tokens.json`），可直接匯入 Figma Tokens Studio

### 開發工具
- PostCSS + Autoprefixer
- ESLint（Vite 預設設定）
- Web Speech API（語音辨識 demo，`lang: zh-TW`）

---

## 本地開發環境設置

### 前置需求

- Node.js `>= 18`
- npm `>= 9`

### 安裝步驟

```bash
# 1. Clone 專案
git clone https://github.com/Tinghedy/senior-learning-platform.git
cd senior-learning-platform

# 2. 安裝相依套件
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

瀏覽器開啟 `http://localhost:5173`，桌面端會看到置中的 390px 手機框模擬畫面。

### 建置專案

```bash
npm run build
```

輸出至 `dist/` 資料夾，可直接部署至任何靜態主機。

```bash
# 本地預覽建置結果
npm run preview
```

---

## 專案結構

```
senior-learning-platform/
├── index.html
├── vite.config.js
├── tailwind.config.js          # Tailwind 設定，引用 CSS 變數
├── postcss.config.js
├── DESIGN_SYSTEM.md            # 設計規格文件（顏色、字級、元件）
├── PROJECT_SPEC.md             # 產品規格文件（頁面、假資料、無障礙清單）
├── leji_design_tokens.json     # W3C Design Tokens，供 Figma 匯入
└── src/
    ├── main.jsx                # 應用程式進入點
    ├── App.jsx                 # Router + 共用 Layout（TabBar / FAB 固定）
    ├── styles/
    │   ├── tokens.css          # CSS 自訂變數（單一來源）
    │   └── index.css           # Tailwind 指令 + tokens 匯入
    ├── components/
    │   ├── TabBar.jsx          # 底部固定四個 Tab（首頁/找課程/收藏/問問題）
    │   ├── VoiceFab.jsx        # 語音問答浮動鈕（每頁常駐）
    │   ├── TopBar.jsx          # 頂部標題列（含回上一步）
    │   ├── CourseCard.jsx      # 課程卡片（線上/線下自動切換 meta 資訊）
    │   ├── Tag.jsx             # 標籤（影片/文章/線上/線下/類別）
    │   ├── Chip.jsx            # 類別篩選晶片
    │   └── SearchField.jsx     # 搜尋欄
    ├── pages/
    │   ├── HomePage.jsx        # 首頁（輪播 + 搜尋 + 類別格狀）
    │   ├── FindCoursePage.jsx  # 找課程（核心頁，多維度篩選）
    │   ├── SavedPage.jsx       # 有興趣的課（已報名 + 收藏列表）
    │   └── VoiceAskPage.jsx    # 語音問答（麥克風 + 常見問題 + 對話泡泡）
    └── data/
        └── courses.js          # 假課程資料（7 筆，線上/線下混合）
```

---

## 頁面說明

| 路由 | 頁面 | 核心功能 |
|------|------|----------|
| `/` | 首頁 | 消息輪播、類別捷徑、搜尋入口 |
| `/find` | 找課程 | 關鍵字搜尋、上課方式 toggle、類別 Chip 篩選、課程卡片列表 |
| `/saved` | 有興趣的課 | 已報名確認紀錄、收藏課程列表、空狀態引導 |
| `/voice` | 語音問答 | 麥克風錄音（Web Speech API）、常見問題快捷、對話氣泡 |

---

## 部署

本專案為純靜態前端，建置後可部署至任何靜態主機服務。

### Vercel（推薦）

1. 前往 [vercel.com](https://vercel.com)，使用 GitHub 帳號登入
2. 點「Add New Project」→ 選擇此 repo
3. Framework Preset 選 **Vite**，其餘預設不動
4. 點「Deploy」，完成後取得線上網址

### GitHub Pages

```bash
# 安裝 gh-pages 套件
npm install -D gh-pages

# package.json 新增 scripts
# "deploy": "vite build && gh-pages -d dist"

npm run deploy
```

> **注意**：使用 GitHub Pages 需在 `vite.config.js` 設定 `base: '/senior-learning-platform/'`，否則路徑會錯誤。

---

## 無障礙設計對應

| WCAG 準則 | 實作方式 |
|-----------|----------|
| 1.1.1 非文字內容 | 圖示皆有 `aria-label` 或 `aria-hidden` |
| 1.4.1 顏色使用 | 選取狀態附粗框、標籤圖示＋文字雙重標示 |
| 1.4.4 文字縮放 | 基準 18px、全用 rem，支援 200% 縮放不破版 |
| 1.4.6 對比度（加強） | 文字對比 ≥ 7:1（AAA） |
| 2.2.2 暫停、停止 | 輪播不自動播放，手動控制 |
| 2.4.7 焦點可見 | 全域 3px 實線焦點環 |
| 2.5.5 目標尺寸 | 觸控目標最小 48px |
| 3.2.3 一致性導覽 | TabBar 固定四頁位置完全一致 |
| 3.3.4 錯誤預防 | 收藏、報名後顯示明確成功回饋 |

---

## 聯絡方式

**Hedy Liang**

- GitHub：[@Tinghedy](https://github.com/Tinghedy)
- Email：ting7169133@gmail.com

---

> 本專案設計靈感來自對 6 位高齡使用者的 UX 訪談（KJ 分析），所有設計決策皆有訪談痛點對應，詳見 `PROJECT_SPEC.md`。
