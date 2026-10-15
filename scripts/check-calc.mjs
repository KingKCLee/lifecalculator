// 계산기 법령 표본 검사: scripts/calc-samples/*.mjs 의 표본을 src/logic 순수 함수로 실행해 expect 와 대조한다.
// 하나라도 다르면 종료코드 1. 표본 0건 실행도 실패(0건 통과 금지).
import {readdirSync} from "node:fs";
import {fileURLToPath, pathToFileURL} from "node:url";
import path from "node:path";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "calc-samples");
const files = readdirSync(dir).filter(f => f.endsWith(".mjs")).sort();
let total = 0, fail = 0;
const lines = [];
for (const f of files) {
  const mod = (await import(pathToFileURL(path.join(dir, f)).href)).default;
  let n = 0, bad = 0;
  if (!mod || typeof mod.run !== "function" || !Array.isArray(mod.samples) || mod.samples.length === 0) {
    lines.push(`FAIL ${f}: run 함수 또는 표본 배열이 없거나 비어 있음 (표본 0건은 실패)`);
    fail++; continue;
  }
  for (const s of mod.samples) {
    n++; total++;
    let out;
    try { out = mod.run(s.input); } catch (e) { out = {__error: String(e)}; }
    const diffs = [];
    for (const [k, v] of Object.entries(s.expect)) {
      if (out[k] !== v) diffs.push(`${k}: 기대 ${v} / 실제 ${out[k]} (차이 ${typeof v === "number" && typeof out[k] === "number" ? out[k] - v : "-"})`);
    }
    if (diffs.length) {
      bad++; fail++;
      lines.push(`FAIL [${mod.name}] ${s.id} ${s.desc}\n     ${diffs.join("\n     ")}\n     근거: ${s.law}`);
    }
  }
  lines.push(`${bad ? "FAIL" : "ok  "} ${mod.name}: 표본 ${n}건 실행, 불일치 ${bad}건`);
}
console.log(lines.join("\n"));
console.log(`check-calc: 표본 ${total}건 실행, 불일치 ${fail}건 (계산기 파일 ${files.length}개)`);
if (total === 0) { console.error("check-calc 실패: 표본 0건 실행"); process.exit(1); }
if (fail > 0) process.exit(1);
