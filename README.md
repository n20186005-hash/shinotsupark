# しのつ公園 非公式ガイド

北海道・新篠津村の「しのつ公園」を紹介する、Astro + Tailwind CSS + TypeScript の多ページ観光サイトです。Cloudflare Workers 向けに構成しています。

## 技術構成

- Astro 7.1.6
- Tailwind CSS 4.3.3（Vite plugin）
- TypeScript strict
- pnpm 11.18.0
- Cloudflare Workers / Wrangler 4.115.0
- GA4: `G-HXM22WWPKP`
- データベース・ログイン・CMSなし

## セットアップ

```bash
corepack enable
corepack use pnpm@11.18.0
pnpm install
cp .env.example .env
pnpm dev
```

`.env` の `PUBLIC_SITE_URL` は `https://shinotsupark.com` を使用します。未指定時も同じドメインが既定値になります。

## ビルド

```bash
pnpm build
pnpm preview
```

## Cloudflare Workers へデプロイ

```bash
pnpm wrangler login
pnpm deploy
```

`wrangler.jsonc` は Astro Cloudflare adapter の統一エントリーポイント `@astrojs/cloudflare/entrypoints/server` と静的アセット `dist` を使用します。

## 記念カード機能

`/memory-card/` では次の処理をすべてブラウザ内で行います。

- カメラ・セルフィー・アルバムから画像選択
- 1:1 / はがき縦 / 9:16
- 3スタイル
- スポット名・日付の編集
- Canvas 合成
- PNGダウンロード

画像アップロードAPIやサーバー保存処理はありません。

## 写真

`public/images/` の実景写真は、観光PR用途として公開されている「さっぽろ観光写真ライブラリー」のしのつ公園素材をローカル保存したものです。利用・再配布時は同ライブラリーの最新利用条件を必ず再確認してください。

## 情報更新

営業日、営業時間、料金、交通、季節アクティビティは変わる可能性があります。公開前と定期更新時に、新篠津村観光情報、道の駅しんしのつ、たっぷの湯等の公式情報と照合してください。
