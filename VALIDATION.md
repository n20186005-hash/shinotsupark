# 検証メモ

生成環境で以下を確認しました。

- 記念カード TypeScript の strict 型チェック
- 8ページの内部リンク整合性
- ローカル画像参照とファイル存在確認
- GA4 ID、非公式表記、3種類のカードサイズ、Canvas要素の実装確認
- 記念カードコードに `fetch` / `XMLHttpRequest` / `FormData` / `WebSocket` / `sendBeacon` がないこと
- データベース、認証、CMS関連パッケージがないこと
- 8点の実景写真がローカル WebP として格納されていること

この生成環境は npm registry に接続できなかったため、依存関係を取得する `pnpm install` と最終の `pnpm build` は実行していません。ネットワーク接続可能な環境で、READMEの手順に従って最終ビルドを行ってください。
