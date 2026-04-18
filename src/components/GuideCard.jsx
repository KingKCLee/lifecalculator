import React from "react";

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

export default function GuideCard({ section1, section2, section3, section4, section5, isMo, hideSection3 }) {
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

      {!hideSection3 && <Section num={3} title="2026년 핵심 세율과 계산법" bgColor="#FAEEDA" textColor="#633806" isMo={isMo}>
        {(() => {
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
                      <thead><tr style={{ background: "#E6F1FB" }}>
                        {(tbl.headers || []).map((h, i) => <th key={i} style={{ ...thSt, textAlign: i === 0 ? "left" : "center" }}>{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {(tbl.rows || []).map((row, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                            {row.map((cell, j) => <td key={j} style={tdSt(j)}>{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {tbl.note && <div style={{ fontSize: 12, color: "#6b778c", marginTop: 6, lineHeight: 1.6 }}>{tbl.note}</div>}
                  {tbl.law && <div style={{ fontSize: 12, color: "#6b778c", marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                    <span>근거:</span>
                    {tbl.law.map((l, li) => <a key={li} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: "#0141f9", textDecoration: "underline", fontSize: 12 }}>{l.text}</a>)}
                  </div>}
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
        })()}
      </Section>}

      <Section num={hideSection3 ? 3 : 4} title="계산기 200% 활용법" bgColor="#EEEDFE" textColor="#3C3489" isMo={isMo}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(section4 || []).map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: isMo ? 12 : 14, fontWeight: 600, color: "#534AB7", background: "#EEEDFE", padding: "4px 12px", borderRadius: 4, flexShrink: 0, marginTop: 2, whiteSpace: "nowrap" }}>{r.step}</span>
              <span style={{ fontSize: isMo ? 14 : 16, color: "#374151", lineHeight: 1.8 }}>{r.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section num={hideSection3 ? 4 : 5} title="놓치면 손해보는 것들" bgColor="#FCEBEB" textColor="#791F1F" headerBg="#fff8f8" isMo={isMo}>
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
