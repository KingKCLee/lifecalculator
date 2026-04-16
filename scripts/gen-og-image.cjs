#!/usr/bin/env node
const puppeteer = require('puppeteer');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; }
.wrap {
  width: 1200px; height: 630px;
  background: #0141f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 104px;
  font-family: -apple-system, Arial, sans-serif;
}
.left { flex: 1; min-width: 0; }
.badge { font-size: 22px; font-weight: 700; color: rgba(255,255,255,0.65); margin-bottom: 28px; }
.title { font-size: 56px; font-weight: 900; color: #fff; line-height: 1.25; margin-bottom: 28px; letter-spacing: -2px; }
.desc { font-size: 24px; color: rgba(255,255,255,0.75); line-height: 1.8; margin-bottom: 32px; }
.tags { display: flex; gap: 12px; }
.tag { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 40px; padding: 6px 18px; font-size: 20px; color: #fff; }
.right { flex-shrink: 0; margin-left: 80px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
.logo-name { font-size: 36px; font-weight: 900; color: #fff; text-align: center; }
.logo-sub { font-size: 18px; color: rgba(255,255,255,0.5); margin-top: 6px; text-align: center; }
</style>
</head>
<body>
<div class="wrap">
  <div class="left">
    <div class="badge">대한민국 NO.1 세금·부동산·재테크 계산기</div>
    <div class="title">세금·대출·부동산<br>한 번에 해결</div>
    <div class="desc">주소 입력 → 실거래가 자동 조회<br>감면 특례 자동 적용 · 2026 최신 세법</div>
    <div class="tags">
      <span class="tag">취득세</span>
      <span class="tag">양도세</span>
      <span class="tag">DSR</span>
      <span class="tag">연말정산</span>
    </div>
  </div>
  <div class="right">
    <svg viewBox="0 0 512 512" width="280" height="280">
      <rect width="512" height="512" rx="102" fill="#ffffff"/>
      <rect x="90" y="145" width="140" height="28" rx="14" fill="#0141f9"/>
      <g transform="translate(370,160)">
        <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#0141f9" transform="rotate(45)"/>
        <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#0141f9" transform="rotate(-45)"/>
      </g>
      <rect x="90" y="340" width="140" height="28" rx="14" fill="#0141f9"/>
      <rect x="146" y="284" width="28" height="140" rx="14" fill="#0141f9"/>
      <rect x="282" y="320" width="140" height="28" rx="14" fill="#0141f9"/>
      <rect x="282" y="370" width="140" height="28" rx="14" fill="#0141f9"/>
    </svg>
    <div>
      <div class="logo-name">생활계산기<span style="opacity:0.7">.com</span></div>
      <div class="logo-sub">62가지 무료 계산기</div>
    </div>
  </div>
</div>
</body>
</html>`;

(async () => {
  const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outPath, type: 'png' });
  await browser.close();
  const fs = require('fs');
  const stat = fs.statSync(outPath);
  console.log('OG image saved:', outPath, '(' + Math.round(stat.size / 1024) + ' KB)');
})();
