
椎葉あびらの勉強ノート置き場
---

### 紹介

勉強したPDFをここに置いておきます。

---
---

# （サイト作成用）生成手順

TypeScript + GitHub Pages で構築した **勉強ノート公開サイト** です。

👉 公開サイト: [https://abirashiba.github.io/study-notes/](https://abirashiba.github.io/study-notes/)

---

## 🚀 セットアップ手順

### 1. リポジトリを取得

```bash
git clone https://github.com/AbiraShiba/study-notes.git
cd study-notes
```

### 2. 依存関係のインストール

```bash
npm install
```

---

## 📂 ディレクトリ構成

```
study-notes/
├─ src/                   # TypeScript ソース
│   ├─ index.ts
│   └─ notes.json         # ノート一覧（PDF へのリンク）
├─ public/                # 公開フォルダ (GitHub Pages で配信)
│   ├─ index.html         # HTML (Tailwind CDN を利用)
│   ├─ index.js           # TypeScript から生成される
│   ├─ notes.json         # src からコピーされる
│   └─ pdf/               # PDF ファイル
│       ├─ phys/
│       │   └─ quantum.pdf
│       └─ math/
│           └─ linear-algebra.pdf
├─ package.json
├─ tsconfig.json
└─ .gitignore
```

---

## 📝 ノートの追加方法

### 1. PDF を追加

`public/pdf/カテゴリ名/` に配置してください。
例：

```
public/pdf/phys/quantum.pdf
public/pdf/math/linear-algebra.pdf
```

### 2. `src/notes.json` を編集

```json
[
  {
    "title": "量子力学ノート",
    "file": "pdf/phys/quantum.pdf",
    "tags": ["physics", "quantum"],
    "category": "Physics"
  },
  {
    "title": "線形代数ノート",
    "file": "pdf/math/linear-algebra.pdf",
    "tags": ["math", "linear algebra"],
    "category": "Math"
  }
]
```

⚠️ `file` のパスは `public/` からの相対パスで指定します。

---

## 🔨 ビルド & デプロイ

1. TypeScript をビルド

```bash
npm run build
```

2. GitHub に反映

```bash
git add src/ public/
git commit -m "Update notes"
git push origin main
```

3. 数分後、GitHub Pages に反映されます

---

## 🎨 デザイン

* **TailwindCSS (CDN版)** を利用しているため、追加設定は不要です
* ノートはカード表示 + 検索欄 + カテゴリタブ付きでモダンな見た目になっています

---

## ✅ まとめ

* `src/notes.json` を編集
* PDF を `public/pdf/` に配置
* `npm run build && git push` で公開


