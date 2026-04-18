import puppeteer from 'puppeteer';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function prerender() {
  console.log('[1/5] 개발 서버 시작 중...');

  // vite dev 서버 백그라운드 실행
  const devServer = exec('npx vite --port 5174', { cwd: process.cwd() });
  devServer.stdout?.on('data', d => {
    if (d.includes('ready')) console.log('  → Vite 준비 완료');
  });

  // 서버 시작 대기
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://localhost:5174');
      if (res.ok) break;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('  → 서버 응답 확인');

  console.log('[2/5] 브라우저 실행 중...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 불필요한 리소스 차단 (속도 향상)
  await page.setRequestInterception(true);
  page.on('request', req => {
    const type = req.resourceType();
    if (['image', 'font', 'media'].includes(type)) req.abort();
    else req.continue();
  });

  console.log('[3/5] 홈페이지 렌더링 중...');
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // 렌더링된 root 내용 캡처
  const rootHTML = await page.evaluate(() => {
    const root = document.getElementById('root');
    if (!root) return '';

    // script 태그 제거 (인라인 이벤트핸들러는 유지)
    const clone = root.cloneNode(true);
    clone.querySelectorAll('script').forEach(s => s.remove());

    // style 태그 중 Vite HMR 관련 제거
    clone.querySelectorAll('style[data-vite-dev-id]').forEach(s => s.remove());

    // React 내부 속성 제거 (data-reactroot 등)
    // 인라인 이벤트 핸들러 제거 (onclick 등은 React가 마운트 후 처리)
    const all = clone.querySelectorAll('*');
    all.forEach(el => {
      // React/Vite 내부 속성 제거
      [...el.attributes].forEach(attr => {
        if (attr.name.startsWith('data-reactroot') ||
            attr.name.startsWith('data-vite')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return clone.innerHTML;
  });

  console.log('  → 캡처 완료. HTML 길이:', rootHTML.length.toLocaleString(), '자');

  // 텍스트만 추출하여 길이 측정
  const textContent = await page.evaluate(() => {
    return document.getElementById('root')?.innerText?.length || 0;
  });
  console.log('  → 텍스트 콘텐츠:', textContent.toLocaleString(), '자');

  await browser.close();
  console.log('[4/5] 브라우저 종료');

  // index.html 업데이트
  let indexHTML = fs.readFileSync('index.html', 'utf-8');
  const before = indexHTML.length;

  // <div id="root">...</div> 교체 (</div> 뒤에 script 태그가 오는 패턴 매칭)
  indexHTML = indexHTML.replace(
    /<div id="root">[\s\S]*?<\/div>\s*(?=<script)/,
    `<div id="root">${rootHTML}</div>\n    `
  );

  fs.writeFileSync('index.html', indexHTML);
  const after = indexHTML.length;

  console.log('[5/5] index.html 업데이트 완료');
  console.log('  → 파일 크기: ', (before / 1024).toFixed(1), 'KB →', (after / 1024).toFixed(1), 'KB');

  // 서버 종료
  devServer.kill();

  console.log('\n완료!');
}

prerender().catch(e => {
  console.error('오류:', e.message);
  process.exit(1);
});
