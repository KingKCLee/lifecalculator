import { useState } from "react";

const C = { bd: "#0747A6", bm: "#0052CC", bl: "#E6F0FF", bp: "#F0F6FF", bb: "#B3CFF5" };

function GroupTable({ title, badge, headers, colWidths, rows, note, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid " + C.bb, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", border: "none", cursor: "pointer", fontFamily: "inherit",
          background: open ? "linear-gradient(135deg," + C.bd + "," + C.bm + ")" : "#f8fafc",
          color: open ? "#fff" : C.bd, fontSize: 13, fontWeight: 700, transition: "background .2s"
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {title}
          {badge && <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: open ? "rgba(255,255,255,.2)" : C.bl, color: open ? "#fff" : C.bd }}>{badge}</span>}
        </span>
        <span style={{ fontSize: 16, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </button>
      {open && (
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: colWidths ? "fixed" : "auto" }}>
            {colWidths && <colgroup>{colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}</colgroup>}
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} style={{
                    padding: "8px 12px", background: C.bl, color: C.bd, fontWeight: 600,
                    fontSize: 12, textAlign: i === 0 ? "left" : "center", borderBottom: "1px solid " + C.bb,
                    whiteSpace: "nowrap"
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : C.bp }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "7px 12px", fontSize: 12, borderBottom: "1px solid #f0f0f0",
                      textAlign: ci === 0 ? "left" : "center", color: ci === 0 ? "#0a1628" : "#374151",
                      fontWeight: ci === 0 ? 600 : 400, whiteSpace: "nowrap"
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {note && <div style={{ padding: "8px 12px", fontSize: 11, color: "#6b7280", lineHeight: 1.6, borderTop: "1px solid " + C.bb }}>{note}</div>}
        </div>
      )}
    </div>
  );
}

export default function RateTable({ groups }) {
  if (!groups || groups.length === 0) return null;
  return (
    <div style={{ marginTop: 20 }}>
      {groups.map((g, i) => <GroupTable key={i} {...g} />)}
    </div>
  );
}
