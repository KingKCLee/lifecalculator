import React, { useState } from "react";

function Section({ num, title, bgColor, textColor, headerBg, isMo, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: isMo ? "14px 18px" : "18px 24px", background: headerBg || "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: textColor, flexShrink: 0 }}>{num}</div>
        <span style={{ fontSize: isMo ? 16 : 18, fontWeight: 600, color: "#0a1628" }}>{title}</span>
      </div>
      <div style={{ padding: isMo ? "16px 18px" : "20px 24px" }}>{children}</div>
    </div>
  );
}

/* ── 아코디언 세율표 (section3 내부용) ── */
const AC = { bd: "#0747A6", bm: "#0052CC", bl: "#E6F0FF", bp: "#F0F6FF", bb: "#B3CFF5" };

function AccordionGroup({ g, open, onToggle, isMo }) {
  const rowCount = g.rows?.length || g.tables?.reduce((s, t) => s + (t.rows?.length || 0), 0) || 0;
  return (
    <div style={{ border: `1px solid ${open ? AC.bb : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden", transition: "border-color .2s" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: `linear-gradient(135deg, ${AC.bd}, ${AC.bm})`, border: "none", borderRadius: open ? "10px 10px 0 0" : 10, cursor: "pointer", fontFamily: "inherit", transition: "border-radius .2s" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{g.title}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {rowCount > 0 && <span style={{ fontSize: 11, color: AC.bb, fontWeight: 500 }}>{rowCount}개 항목</span>}
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 700, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", display: "inline-block" }}>&#9662;</span>
        </div>
      </button>
      {open && <div style={{ padding: isMo ? "12px 12px 16px" : "16px 20px 20px", background: "#fff" }}>
        {g.tables ? g.tables.map((t, ti) => (
          <div key={ti} style={{ marginBottom: ti < g.tables.length - 1 ? 16 : 0 }}>
            {t.subtitle && <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{t.subtitle}</div>}
            <AccTable headers={t.headers} rows={t.rows} isMo={isMo} />
            {t.note && <div style={{ fontSize: 12, color: "#6b778c", marginTop: 6, lineHeight: 1.6 }}>{t.note}</div>}
            {t.law && <LawLinks law={t.law} />}
          </div>
        )) : <>
          <AccTable headers={g.headers} rows={g.rows} isMo={isMo} />
          {g.note && <div style={{ fontSize: 12, color: "#6b778c", marginTop: 6, lineHeight: 1.6 }}>{g.note}</div>}
          {g.law && <LawLinks law={g.law} />}
        </>}
      </div>}
    </div>
  );
}

function AccTable({ headers, rows, isMo }) {
  const thSt = { padding: "10px 12px", textAlign: "center", color: AC.bm, fontWeight: 700, background: AC.bl, border: `1px solid ${AC.bb}`, fontSize: 13, whiteSpace: "nowrap" };
  const badgeW = 76;
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "fixed", minWidth: isMo ? 420 : undefined }}>
        <thead><tr>{(headers || []).map((h, i) => <th key={i} style={{ ...thSt, textAlign: i === 0 ? "left" : "center" }}>{h}</th>)}</tr></thead>
        <tbody>{(rows || []).map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : AC.bp }}>
            {row.map((cell, ci) => {
              const isLast = ci === row.length - 1 && (headers || [])[ci] === "합계";
              return <td key={ci} style={{ padding: "9px 12px", border: `1px solid ${ri % 2 === 0 ? "#e5e7eb" : AC.bb}`, fontSize: 13, color: ci === 0 ? "#0a1628" : "#374151", fontWeight: ci === 0 || isLast ? 600 : 400, textAlign: ci === 0 ? "left" : "center", whiteSpace: "nowrap" }}>
                {isLast ? <span style={{ display: "inline-block", width: badgeW, textAlign: "center", padding: "3px 0", background: AC.bl, borderRadius: 4, fontWeight: 700, color: AC.bd, fontSize: 12 }}>{cell}</span> : cell}
              </td>;
            })}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function LawLinks({ law }) {
  return (
    <div style={{ fontSize: 12, color: "#6b778c", marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
      <span style={{ color: "#94a3b8" }}>근거:</span>
      {law.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: AC.bm, textDecoration: "underline", fontSize: 12 }}>{l.text}</a>)}
    </div>
  );
}

function RateAccordionInline({ groups, isMo }) {
  const [openSet, setOpenSet] = useState(() => new Set(groups.map((_, i) => i)));
  const allOpen = openSet.size === groups.length;
  const toggle = (idx) => { setOpenSet(prev => { const n = new Set(prev); if (n.has(idx)) n.delete(idx); else n.add(idx); return n; }); };
  const toggleAll = () => { if (allOpen) setOpenSet(new Set()); else setOpenSet(new Set(groups.map((_, i) => i))); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button onClick={toggleAll} style={{ padding: "5px 14px", background: "#fff", border: `1px solid ${AC.bb}`, borderRadius: 6, fontSize: 12, fontWeight: 600, color: AC.bd, cursor: "pointer", fontFamily: "inherit" }}>{allOpen ? "전체 접기" : "전체 펼치기"}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {groups.map((g, i) => <AccordionGroup key={i} g={g} open={openSet.has(i)} onToggle={() => toggle(i)} isMo={isMo} />)}
      </div>
    </div>
  );
}

/* ── 기존 guideData section3 테이블 (tables/table 형식) ── */
function GuideDataTable({ section3, isMo }) {
  const isExtended = section3 && !Array.isArray(section3) && (section3.table || section3.tables || section3.badges);
  const tables = isExtended ? (section3.tables || (section3.table ? [section3.table] : [])) : [];
  const badges = isExtended ? (section3.badges || []) : (section3 || []);
  const thSt = { padding: "8px 12px", textAlign: "center", color: "#0C447C", fontWeight: 600, border: "1px solid #B5D4F4", fontSize: 13, whiteSpace: "nowrap" };
  const tdSt = (j) => ({ padding: "8px 12px", border: "1px solid #e5e7eb", fontSize: 13, color: j === 0 ? "#0a1628" : "#374151", fontWeight: j === 0 ? 600 : 400, textAlign: j === 0 ? "left" : "center", whiteSpace: "nowrap" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {tables.map((tbl, ti) => (
        <div key={ti}>
          {tbl.subtitle && <div style={{ fontSize: isMo ? 14 : 15, fontWeight: 700, color: "#0a1628", marginBottom: 8 }}>{tbl.subtitle}</div>}
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 480 }}>
              <thead><tr style={{ background: "#E6F1FB" }}>{(tbl.headers || []).map((h, i) => <th key={i} style={{ ...thSt, textAlign: i === 0 ? "left" : "center" }}>{h}</th>)}</tr></thead>
              <tbody>{(tbl.rows || []).map((row, i) => (<tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>{row.map((cell, j) => <td key={j} style={tdSt(j)}>{cell}</td>)}</tr>))}</tbody>
            </table>
          </div>
          {tbl.note && <div style={{ fontSize: 12, color: "#6b778c", marginTop: 6, lineHeight: 1.6 }}>{tbl.note}</div>}
          {tbl.law && <LawLinks law={tbl.law} />}
        </div>
      ))}
      {badges.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {badges.map((r, i) => {
            if (typeof r === "string") return <div key={i} style={{ fontSize: isMo ? 13 : 14, color: "#374151", lineHeight: 1.8, paddingLeft: 12, borderLeft: "3px solid #FAEEDA" }}>{r}</div>;
            return (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: isMo ? 12 : 14, fontWeight: 600, color: r.color || "#185FA5", background: r.bg || "#E6F1FB", padding: "4px 12px", borderRadius: 4, flexShrink: 0, marginTop: 2, whiteSpace: "nowrap" }}>{r.badge}</span>
                <span style={{ fontSize: isMo ? 14 : 16, color: "#374151", lineHeight: 1.8 }}>{r.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── GuideCard 메인 ── */
export default function GuideCard({ section1, section2, section3, section4, section5, isMo, rateGroups }) {
  return (
    <div style={{ width: "100%", marginTop: 32, marginBottom: 48, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden", padding: isMo ? 16 : 24, display: "flex", flexDirection: "column", gap: 16 }}>

      <Section num={1} title="이런 분들께 필요해요" bgColor="#E6F1FB" textColor="#0C447C" isMo={isMo}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(section1 || []).map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#378ADD", marginTop: 8, flexShrink: 0 }} />
              <span style={{ fontSize: isMo ? 14 : 16, color: "#374151", lineHeight: 1.8 }}>{t}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section num={2} title="이 계산기로 해결되는 것" bgColor="#E1F5EE" textColor="#085041" isMo={isMo}>
        <p style={{ fontSize: isMo ? 14 : 16, color: "#374151", lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: section2 || "" }} />
      </Section>

      <Section num={3} title="2026년 핵심 세율과 계산법" bgColor="#FAEEDA" textColor="#633806" isMo={isMo}>
        {rateGroups ? (
          <RateAccordionInline groups={rateGroups} isMo={isMo} />
        ) : (
          <GuideDataTable section3={section3} isMo={isMo} />
        )}
      </Section>

      <Section num={4} title="계산기 200% 활용법" bgColor="#EEEDFE" textColor="#3C3489" isMo={isMo}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(section4 || []).map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: isMo ? 12 : 14, fontWeight: 600, color: "#534AB7", background: "#EEEDFE", padding: "4px 12px", borderRadius: 4, flexShrink: 0, marginTop: 2, whiteSpace: "nowrap" }}>{r.step}</span>
              <span style={{ fontSize: isMo ? 14 : 16, color: "#374151", lineHeight: 1.8 }}>{r.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section num={5} title="놓치면 손해보는 것들" bgColor="#FCEBEB" textColor="#791F1F" headerBg="#fff8f8" isMo={isMo}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(section5 || []).map((r, i) => (
            <div key={i} style={{ padding: "14px 18px", background: "#f9fafb", borderRadius: 8, borderLeft: "3px solid " + (r.border || "#E24B4A") }}>
              <div style={{ fontSize: isMo ? 14 : 15, fontWeight: 600, color: (r.border || "#E24B4A") === "#378ADD" ? "#185FA5" : "#A32D2D", marginBottom: 6 }}>{r.title}</div>
              <div style={{ fontSize: isMo ? 14 : 16, color: "#374151", lineHeight: 1.8 }}>{r.text}</div>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
