import { defineMiddleware } from 'astro/middleware';

// すべての HTTP アクセスを HTTPS へ 301 リダイレクトし、www なしの正規 URL に統一します。
// （Search Console で http:// が別収録されるのを防ぎ、サイトの権威を集中させます）
export const onRequest = defineMiddleware((context, next) => {
  const url = context.url;
  if (url.protocol === 'http:') {
    const secure = new URL(url);
    secure.protocol = 'https:';
    return context.redirect(secure.toString(), 301);
  }
  return next();
});
