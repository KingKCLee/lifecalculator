/*
 * _enhance_terms.cjs
 *
 * Enhances public/terms/*.html (302 files) in-place:
 *   1. 관련 계산기 바로가기 (if missing)
 *   2. 관련 법령 조문 (if missing)
 *   3. 계산 예시 (if missing)
 *   4. JSON-LD DefinedTerm + BreadcrumbList (ensured in <head>)
 *   5. <meta name="lastmod" content="2026-04-14">
 *   6. canonical link + og:updated_time 2026-04-14
 *   7. marker <!-- AUTO-ENHANCED-2026-04-14 --> (idempotent)
 *
 * Rules:
 *   - Skip index.html / search.html
 *   - Do not duplicate sections; detect via marker + existing h2 text
 *   - Preserve CRLF / LF line endings
 *   - Only touches files in public/terms/
 */

const fs = require('fs');
const path = require('path');

const TERMS_DIR = path.join(__dirname, 'public', 'terms');
const TERMS_JSON = path.join(TERMS_DIR, 'terms.json');
const MARKER = '<!-- AUTO-ENHANCED-2026-04-14 -->';
const LASTMOD = '2026-04-14';
const SITE = 'https://xn--989a00a691bdfa717h.com';

// Map Korean calculator name -> URL-encoded anchor on home page.
// Uses the same anchor scheme found in existing files.
function calcAnchor(name) {
  return '/#' + encodeURIComponent(name);
}

// Known calculator names (used for defaults / generic fallback).
const GENERIC_CALCS = ['취득세계산기', '양도소득세계산기', '종합소득세계산기'];

// -------- terms.json -> lookup by term name --------
let termsData = { terms: [] };
try {
  termsData = JSON.parse(fs.readFileSync(TERMS_JSON, 'utf8'));
} catch (e) {
  console.error('Failed to read terms.json:', e.message);
}
const termByName = new Map();
for (const t of (termsData.terms || [])) {
  termByName.set(t.term, t);
}

// Given a term's category, pick reasonable default calculators list (fallback).
function calculatorsForCategory(category) {
  const map = {
    '취득세': ['취득세계산기', '등기비용계산기', '총비용시뮬레이터'],
    '양도세': ['양도소득세계산기', '총비용시뮬레이터'],
    '양도소득세': ['양도소득세계산기', '총비용시뮬레이터'],
    '종합부동산세': ['종부세계산기', '보유세통합계산기'],
    '종부세': ['종부세계산기', '보유세통합계산기'],
    '재산세': ['재산세계산기', '보유세통합계산기'],
    '증여세': ['증여세계산기'],
    '상속세': ['상속세계산기'],
    '대출': ['대출이자계산기', 'DSR계산기', 'LTV계산기'],
    '대출·담보': ['대출이자계산기', 'DSR계산기', 'LTV계산기'],
    '임대차': ['전월세전환계산기', '임대수익률계산기'],
    '경매': ['경매비용계산기'],
    '재건축': ['리모델링수익계산기'],
    '등기·법률': ['등기비용계산기', '법무사수수료계산기', '채권할인료계산기'],
    '중개수수료': ['중개보수계산기'],
  };
  return map[category] || ['취득세계산기'];
}

// Extract the H1 term text from the HTML (plain, one line).
function extractH1(html) {
  const m = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  return m ? m[1].trim() : null;
}

// Detect CRLF vs LF so we can preserve line endings when re-serializing.
function detectEol(s) {
  const crlf = (s.match(/\r\n/g) || []).length;
  return crlf > 0 ? '\r\n' : '\n';
}

// Build the rcalc-list HTML for a list of calculator names.
function buildCalcSection(calcs) {
  const links = calcs.map(c => `<a href="${calcAnchor(c)}">${c}</a>`).join('');
  return `  <h2>🧮 이 용어가 적용되는 계산기</h2>\n  <div class="rcalc-list">${links}</div>\n`;
}

function buildLawSection(lawRef) {
  const ref = lawRef || '해당 법령 참조';
  return `  <h2>📚 관련 법령 조항</h2>\n  <div class="law"><strong>${escapeHtml(ref)}</strong> 관련 법령에 근거하여 적용됩니다.</div>\n`;
}

function buildExampleSection(example) {
  const ex = example || '자세한 내용은 관련 계산기를 이용해주세요.';
  return `  <h2>💡 실제 계산 예시</h2>\n  <div class="example"><strong>예시</strong>${escapeHtml(ex)}</div>\n`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Build DefinedTerm JSON-LD if missing.
function buildDefinedTermLD(term, description, fileUrl) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: '생활계산기 부동산 용어사전',
      url: SITE + '/terms/'
    },
    url: fileUrl
  };
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function buildBreadcrumbLD(term, fileUrl) {
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '생활계산기', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: '부동산 용어사전', item: SITE + '/terms/' },
      { '@type': 'ListItem', position: 3, name: term, item: fileUrl }
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function enhanceFile(filePath) {
  const base = path.basename(filePath);
  if (base === 'index.html' || base === 'search.html') return { status: 'skipped' };
  if (!base.endsWith('.html')) return { status: 'skipped' };

  let html = fs.readFileSync(filePath, 'utf8');
  const eol = detectEol(html);

  // Work on a normalized \n copy; re-apply eol at write time.
  let content = html.replace(/\r\n/g, '\n');

  const alreadyMarked = content.includes(MARKER);

  // Identify term by H1; fall back to deriving from filename.
  const h1 = extractH1(content);
  const termEntry = h1 ? termByName.get(h1) : null;
  const termName = h1 || base.replace(/\.html$/, '');
  const description = termEntry ? termEntry.definition : '';
  const category = termEntry ? termEntry.category : '';
  const lawRef = termEntry ? termEntry.law_ref : null;
  const example = termEntry ? termEntry.example : null;
  const calcsList = (termEntry && termEntry.calculators && termEntry.calculators.length)
    ? termEntry.calculators
    : calculatorsForCategory(category);

  const fileUrl = `${SITE}/terms/${base}`;
  let changed = false;

  // ---------- HEAD: lastmod meta ----------
  if (!/<meta\s+name=["']lastmod["']/i.test(content)) {
    content = content.replace(/<\/head>/i, `<meta name="lastmod" content="${LASTMOD}">\n</head>`);
    changed = true;
  }

  // ---------- HEAD: og:updated_time ----------
  if (!/property=["']og:updated_time["']/i.test(content)) {
    content = content.replace(/<\/head>/i, `<meta property="og:updated_time" content="${LASTMOD}">\n</head>`);
    changed = true;
  }

  // ---------- HEAD: canonical (ensure exists) ----------
  if (!/<link\s+rel=["']canonical["']/i.test(content)) {
    content = content.replace(/<\/head>/i, `<link rel="canonical" href="${fileUrl}">\n</head>`);
    changed = true;
  }

  // ---------- HEAD: DefinedTerm JSON-LD ----------
  if (!/"@type"\s*:\s*"DefinedTerm"/.test(content)) {
    const ld = buildDefinedTermLD(termName, description || termName, fileUrl);
    content = content.replace(/<\/head>/i, `${ld}\n</head>`);
    changed = true;
  }

  // ---------- HEAD: BreadcrumbList JSON-LD ----------
  if (!/"@type"\s*:\s*"BreadcrumbList"/.test(content)) {
    const ld = buildBreadcrumbLD(termName, fileUrl);
    content = content.replace(/<\/head>/i, `${ld}\n</head>`);
    changed = true;
  }

  // ---------- BODY SECTIONS ----------
  // Injection point: just before </main> (fallback to </body>)
  const hasLaw = /관련 법령 조항/.test(content);
  const hasExample = /실제 계산 예시/.test(content);
  const hasCalcs = /이 용어가 적용되는 계산기/.test(content);

  const injections = [];
  if (!hasLaw) injections.push(buildLawSection(lawRef));
  if (!hasExample) injections.push(buildExampleSection(example));
  if (!hasCalcs) injections.push(buildCalcSection(calcsList));

  if (injections.length) {
    const block = '\n  ' + MARKER + '\n' + injections.join('\n');
    if (/<\/main>/i.test(content)) {
      content = content.replace(/<\/main>/i, `${block}\n</main>`);
    } else if (/<\/body>/i.test(content)) {
      content = content.replace(/<\/body>/i, `${block}\n</body>`);
    } else {
      content += block;
    }
    changed = true;
  }

  // ---------- Marker (body) ----------
  if (!content.includes(MARKER)) {
    // Add marker near end of main/body so it's idempotent.
    if (/<\/main>/i.test(content)) {
      content = content.replace(/<\/main>/i, `  ${MARKER}\n</main>`);
    } else if (/<\/body>/i.test(content)) {
      content = content.replace(/<\/body>/i, `  ${MARKER}\n</body>`);
    } else {
      content += '\n' + MARKER + '\n';
    }
    changed = true;
  }

  if (!changed && alreadyMarked) {
    return { status: 'already' };
  }

  // Re-apply original EOL style.
  const finalContent = eol === '\r\n' ? content.replace(/\n/g, '\r\n') : content;
  fs.writeFileSync(filePath, finalContent, 'utf8');
  return { status: changed ? 'enhanced' : 'already' };
}

function main() {
  let total = 0, enhanced = 0, skipped = 0, already = 0, errors = 0;
  const errorList = [];

  const files = fs.readdirSync(TERMS_DIR).filter(f => f.endsWith('.html'));
  for (const f of files) {
    total++;
    const full = path.join(TERMS_DIR, f);
    try {
      const r = enhanceFile(full);
      if (r.status === 'enhanced') enhanced++;
      else if (r.status === 'skipped') skipped++;
      else if (r.status === 'already') already++;
    } catch (e) {
      errors++;
      errorList.push(`${f}: ${e.message}`);
    }
  }

  console.log('=== Terms enhancement summary ===');
  console.log('Total HTML files processed:', total);
  console.log('Enhanced:', enhanced);
  console.log('Already up-to-date:', already);
  console.log('Skipped (index/search):', skipped);
  console.log('Errors:', errors);
  if (errorList.length) {
    console.log('--- errors ---');
    for (const e of errorList) console.log(' -', e);
  }
}

main();
