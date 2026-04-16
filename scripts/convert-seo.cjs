#!/usr/bin/env node
// SEO_CONTENT를 5단계 카드 디자인으로 변환
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'src', 'data', 'seoContent.js');
const src = fs.readFileSync(INPUT, 'utf8');

// 카드 색상
const CARDS = [
  { num: 1, title: '이런 분들께 필요해요', bg: '#E6F1FB', color: '#0C447C' },
  { num: 2, title: '이 계산기로 해결되는 것', bg: '#E1F5EE', color: '#085041' },
  { num: 3, title: null, bg: '#FAEEDA', color: '#633806' }, // title from source
  { num: 4, title: null, bg: '#EEEDFE', color: '#3C3489' },
  { num: 5, title: null, bg: '#FCEBEB', color: '#791F1F', headerBg: '#FFF8F8' },
];

// h2 → 카드번호 매핑
function mapSection(h2) {
  if (h2.includes('필요해요')) return 0;
  if (h2.includes('해결되는') || h2.includes('특징')) return 1;
  if (h2.includes('핵심') || h2.includes('비교') || h2.includes('판단')) return 2;
  if (h2.includes('활용') || h2.includes('200%')) return 3;
  if (h2.includes('손해') || h2.includes('유용한') || h2.includes('알아두면')) return 4;
  return 2; // fallback to section 3
}

// <li> 내용을 dot 아이템으로
function liToDots(html) {
  const items = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1].trim());
  if (items.length === 0) return html; // no <li>, return as-is
  return items.map(item =>
    `<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:14px;color:#505f79;line-height:1.6;">${item}</span></div>`
  ).join('');
}

// <li> 내용을 경고 카드로 (section 5)
function liToAlerts(html) {
  const items = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1].trim());
  if (items.length === 0) return `<p style="font-size:14px;color:#505f79;line-height:1.7;margin:0;">${html.replace(/<\/?[up][l]?>/g, '')}</p>`;
  return items.map(item => {
    // Extract bold label if exists
    const boldMatch = item.match(/^<b>([^<]+)<\/b>[:：]?\s*/);
    const label = boldMatch ? boldMatch[1] : '';
    const rest = boldMatch ? item.slice(boldMatch[0].length) : item;
    return `<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;">${label ? `<span style="font-size:12px;font-weight:500;color:#A32D2D;">${label}</span>` : ''}<p style="font-size:14px;color:#505f79;margin:${label ? '2px' : '0'} 0 0;line-height:1.5;">${rest}</p></div>`;
  }).join('');
}

// 단일 섹션을 카드 HTML로
function sectionToCard(num, title, content, cardDef) {
  const headerBg = cardDef.headerBg || '#f8f9fc';
  let bodyHtml;

  if (num === 1) {
    // Section 1: dot list from <ul><li>
    bodyHtml = liToDots(content);
  } else if (num === 5) {
    // Section 5: alert cards from <ul><li>
    bodyHtml = liToAlerts(content);
  } else {
    // Sections 2,3,4: keep as paragraph, strip outer <p> tags for clean wrap
    bodyHtml = `<div style="font-size:14px;color:#505f79;line-height:1.7;">${content.replace(/<\/?ul>/g, '').replace(/<li>/g, '<br>• ').replace(/<\/li>/g, '')}</div>`;
  }

  return `<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:14px 20px;background:${headerBg};border-bottom:0.5px solid #dfe1e6;">
<div style="width:24px;height:24px;border-radius:50%;background:${cardDef.bg};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:${cardDef.color};flex-shrink:0;">${num}</div>
<span style="font-size:14px;font-weight:500;color:#172B4D;">${title}</span>
</div>
<div style="padding:16px 20px;display:flex;flex-direction:column;gap:8px;">
${bodyHtml}
</div>
</div>`;
}

// 전체 엔트리 변환
function convertEntry(html) {
  // Split by <h2>...</h2>
  const parts = html.split(/<h2>/);
  if (parts.length < 2) return html; // no h2 found, return as-is

  const sections = [];
  for (let i = 1; i < parts.length; i++) {
    const closeIdx = parts[i].indexOf('</h2>');
    if (closeIdx < 0) continue;
    const h2Text = parts[i].slice(0, closeIdx).trim();
    const content = parts[i].slice(closeIdx + 5).trim();
    const cardIdx = mapSection(h2Text);
    sections.push({ cardIdx, h2Text, content });
  }

  // Build cards
  const cards = sections.map(s => {
    const def = CARDS[s.cardIdx];
    const title = def.title || s.h2Text;
    return sectionToCard(s.cardIdx + 1, title, s.content, def);
  });

  return `<div style="display:flex;flex-direction:column;gap:12px;">\n${cards.join('\n')}\n</div>`;
}

// Parse all entries from the source file
// Format: key: `...content...`,
const entryRegex = /^(\s*)(\w+):\s*`([\s\S]*?)`/gm;
let result = src;
let converted = 0;

const matches = [...src.matchAll(entryRegex)];
console.log('Found', matches.length, 'entries to convert');

// Process in reverse order to maintain string positions
for (let i = matches.length - 1; i >= 0; i--) {
  const m = matches[i];
  const key = m[2];
  const oldContent = m[3];

  // Skip if already converted (has the card div structure)
  if (oldContent.includes('display:flex;flex-direction:column;gap:12px')) {
    console.log('SKIP (already converted):', key);
    continue;
  }

  const newContent = convertEntry(oldContent);
  const oldFull = `${m[1]}${key}: \`${oldContent}\``;
  const newFull = `${m[1]}${key}: \`${newContent}\``;

  result = result.slice(0, m.index) + newFull + result.slice(m.index + oldFull.length);
  converted++;
}

fs.writeFileSync(INPUT, result, 'utf8');
console.log('\nConverted:', converted, '/', matches.length);
console.log('Output:', INPUT);
