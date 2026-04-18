import React, { useState } from "react";

const C = { bd: "#0747A6", bm: "#0052CC", bl: "#E6F0FF", bp: "#F0F6FF", bb: "#B3CFF5" };

function GroupHeader({ title, open, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px", background: `linear-gradient(135deg, ${C.bd}, ${C.bm})`,
      border: "none", borderRadius: open ? "10px 10px 0 0" : 10, cursor: "pointer",
      fontFamily: "inherit", transition: "border-radius .2s"
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {count > 0 && <span style={{ fontSize: 11, color: "#B3CFF5", fontWeight: 500 }}>{count}개 항목</span>}
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 700, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", display: "inline-block" }}>&#9662;</span>
      </div>
    </button>
  );
}

function RateTable({ headers, rows, note, law, isMo }) {
  const thSt = { padding: "10px 12px", textAlign: "center", color: C.bd, fontWeight: 700, background: C.bl, border: `1px solid ${C.bb}`, fontSize: 13, whiteSpace: "nowrap" };
  const badgeW = 76;
  return (
    <div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "fixed", minWidth: isMo ? 480 : undefined }}>
          <colgroup>
            <col style={{ width: "auto" }} />
            {headers.slice(1).map((_, i) => <col key={i} style={{ width: headers[headers.length - 1] === "합계" && i === headers.length - 2 ? badgeW : undefined }} />)}
          </colgroup>
          <thead>
            <tr>{headers.map((h, i) => <th key={i} style={{ ...thSt, textAlign: i === 0 ? "left" : "center" }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : C.bp }}>
                {row.map((cell, ci) => {
                  const isLast = ci === row.length - 1 && headers[ci] === "합계";
                  return (
                    <td key={ci} style={{
                      padding: "9px 12px", border: `1px solid ${ri % 2 === 0 ? "#e5e7eb" : C.bb}`,
                      fontSize: 13, color: ci === 0 ? "#0a1628" : "#374151",
                      fontWeight: ci === 0 || isLast ? 600 : 400,
                      textAlign: ci === 0 ? "left" : "center", whiteSpace: "nowrap"
                    }}>
                      {isLast ? (
                        <span style={{ display: "inline-block", width: badgeW, textAlign: "center", padding: "3px 0", background: C.bl, borderRadius: 4, fontWeight: 700, color: C.bd, fontSize: 12 }}>{cell}</span>
                      ) : cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <div style={{ fontSize: 12, color: "#6b778c", marginTop: 8, lineHeight: 1.6, paddingLeft: 4 }}>{note}</div>}
      {law && law.length > 0 && (
        <div style={{ fontSize: 12, color: "#6b778c", marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center", paddingLeft: 4 }}>
          <span style={{ color: "#94a3b8" }}>근거:</span>
          {law.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: C.bm, textDecoration: "underline", fontSize: 12 }}>{l.text}</a>)}
        </div>
      )}
    </div>
  );
}

export default function TaxRateAccordion({ groups, isMo }) {
  const [openSet, setOpenSet] = useState(() => new Set(groups.map((_, i) => i)));
  const allOpen = openSet.size === groups.length;

  const toggle = (idx) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const toggleAll = () => {
    if (allOpen) setOpenSet(new Set());
    else setOpenSet(new Set(groups.map((_, i) => i)));
  };

  return (
    <div style={{ width: "100%", marginTop: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0a1628" }}>2026년 세율표</div>
        <button onClick={toggleAll} style={{
          padding: "6px 14px", background: "#fff", border: `1px solid ${C.bb}`, borderRadius: 6,
          fontSize: 12, fontWeight: 600, color: C.bd, cursor: "pointer", fontFamily: "inherit"
        }}>{allOpen ? "전체 접기" : "전체 펼치기"}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {groups.map((g, i) => {
          const open = openSet.has(i);
          return (
            <div key={i} style={{ border: `1px solid ${open ? C.bb : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden", transition: "border-color .2s" }}>
              <GroupHeader title={g.title} open={open} onClick={() => toggle(i)} count={g.rows?.length || g.tables?.reduce((s, t) => s + (t.rows?.length || 0), 0) || 0} />
              {open && (
                <div style={{ padding: isMo ? "12px 12px 16px" : "16px 20px 20px", background: "#fff" }}>
                  {g.tables ? g.tables.map((t, ti) => (
                    <div key={ti} style={{ marginBottom: ti < g.tables.length - 1 ? 16 : 0 }}>
                      {t.subtitle && <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{t.subtitle}</div>}
                      <RateTable headers={t.headers} rows={t.rows} note={t.note} law={t.law} isMo={isMo} />
                    </div>
                  )) : (
                    <RateTable headers={g.headers} rows={g.rows} note={g.note} law={g.law} isMo={isMo} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
