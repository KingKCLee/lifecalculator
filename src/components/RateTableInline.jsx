import { useState } from 'react'

/* ── 색상 상수 ── */
const C = {
  blue1: '#0747A6',
  blue2: '#0052CC',
  blueLight: '#E6F0FF',
  bluePale: '#F0F6FF',
  blueBorder: '#B3CFF5',
  textMain: '#172B4D',
  textSub: '#5E6C84',
}

/* ── 합계 뱃지 색상: 수치 기준 자동분류 ── */
function badgeStyle(val) {
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''))
  if (isNaN(n)) return { bg: '#D1FAE5', tx: '#064E3B' }  // 텍스트값
  if (n >= 9)   return { bg: '#FEE2E2', tx: '#991B1B' }  // 빨강 9%+
  if (n >= 4)   return { bg: '#FEF3C7', tx: '#78350F' }  // 노랑 4~9%
  return               { bg: '#D1FAE5', tx: '#064E3B' }  // 초록 ~4%
}

/* ── 세율 텍스트 색상 ── */
function rateColor(val) {
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''))
  if (isNaN(n)) return C.textMain
  if (n >= 9)   return '#B91C1C'
  if (n >= 4)   return '#92400E'
  return '#065F46'
}

export default function RateTableInline({ groups }) {
  const [openMap, setOpenMap] = useState(
    () => Object.fromEntries(groups.map((_, i) => [i, true]))
  )
  const allOpen = Object.values(openMap).every(Boolean)

  return (
    <div style={{ padding: '4px 0' }}>

      {/* 전체 접기/펼치기 버튼 */}
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:8 }}>
        <button
          onClick={() =>
            setOpenMap(Object.fromEntries(groups.map((_, i) => [i, !allOpen])))
          }
          style={{
            fontSize:12, color:C.blue2, background:'#fff',
            border:`1px solid ${C.blue2}`, borderRadius:6,
            padding:'4px 12px', cursor:'pointer', fontWeight:500,
          }}
        >
          전체 {allOpen ? '접기' : '펼치기'}
        </button>
      </div>

      {groups.map((group, gi) => (
        <div
          key={gi}
          style={{
            marginBottom: 12,
            borderRadius: 10,
            overflow: 'hidden',          /* ★ 헤더-테이블 분리 방지 핵심 */
            border: `1px solid ${C.blueBorder}`,
            boxShadow: '0 1px 4px rgba(0,82,204,0.07)',
          }}
        >
          {/* ── 그룹 헤더 ── */}
          <div
            onClick={() => setOpenMap(p => ({ ...p, [gi]: !p[gi] }))}
            style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'10px 14px',
              background:`linear-gradient(135deg,${C.blue1},${C.blue2})`,
              cursor:'pointer', userSelect:'none',
              margin: 0,                 /* ★ 헤더 아래 공백 제거 */
              borderBottom: 'none',      /* ★ 헤더-테이블 사이 선 제거 */
            }}
          >
            <span style={{ fontSize:13, fontWeight:500, color:'#fff', letterSpacing:'-0.2px' }}>
              {group.title}
            </span>
            {group.badge && (
              <span style={{
                fontSize:11, padding:'2px 8px', borderRadius:99,
                background:'rgba(255,255,255,0.22)', color:'#fff',
              }}>
                {group.badge}
              </span>
            )}
            <span style={{
              marginLeft:'auto', fontSize:10,
              color:'rgba(255,255,255,0.85)',
              display:'inline-block',
              transform: openMap[gi] ? 'rotate(180deg)' : 'rotate(0deg)',
              transition:'transform 0.2s',
            }}>▼</span>
          </div>

          {/* ── 그룹 바디 ── */}
          {openMap[gi] && (
            <div style={{ margin:0, padding:0 }}>   {/* ★ 바디 여백 제거 */}
              <table style={{
                width:'100%', borderCollapse:'collapse',
                fontSize:12, tableLayout:'fixed',
                margin:0, borderTop:'none',          /* ★ 테이블 위 선 제거 */
              }}>
                {/* colgroup */}
                {group.colWidths && (
                  <colgroup>
                    {group.colWidths.map((w, ci) => <col key={ci} style={{ width:w }} />)}
                  </colgroup>
                )}

                {/* thead */}
                <thead>
                  <tr>
                    {group.headers.map((h, hi) => (
                      <th key={hi} style={{
                        padding: hi===0 ? '7px 10px' : '7px 6px',
                        textAlign: hi===0 ? 'left' : 'center',
                        color: C.blue2, fontWeight:500, fontSize:11,
                        borderBottom:`1.5px solid ${C.blueBorder}`,
                        background: C.blueLight,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* tbody */}
                <tbody>
                  {(() => {
                    /* rowspan 처리: 이미 채워진 셀 위치 추적 */
                    const occupied = {}  // "row-col" → true
                    let visualRow = 0

                    return group.rows.map((row, ri) => {
                      const cells = []
                      let colCursor = 0

                      row.forEach((cell, ci) => {
                        /* occupied 칸 건너뛰기 */
                        while (occupied[`${ri}-${colCursor}`]) colCursor++

                        const isObj = cell && typeof cell === 'object'
                        const val   = isObj ? cell.v   : cell
                        const sub   = isObj ? cell.sub : undefined
                        const rs    = isObj ? (cell.rowspan || 1) : 1
                        const cs    = isObj ? (cell.colspan || 1) : 1
                        const vb    = isObj ? cell.vborder : false

                        /* occupied 마킹 */
                        for (let r = ri; r < ri + rs; r++) {
                          for (let c = colCursor; c < colCursor + cs; c++) {
                            if (r !== ri || c !== colCursor) occupied[`${r}-${c}`] = true
                          }
                        }

                        const isFirstCol = colCursor === 0
                        const isLastCol  = colCursor === group.headers.length - 1
                        const isLastRow  = ri === group.rows.length - 1
                        const bg = ri % 2 === 0 ? '#ffffff' : C.bluePale

                        const tdStyle = {
                          padding: isFirstCol ? '7px 10px' : '7px 6px',
                          textAlign: isFirstCol ? 'left' : 'center',
                          verticalAlign: 'middle',
                          borderBottom: isLastRow ? 'none' : `0.5px solid ${C.blueBorder}`,
                          borderRight: vb ? `1px solid ${C.blueBorder}` : undefined,
                          background: bg,
                          lineHeight: 1.4,
                          color: C.textMain,
                          fontSize: 12,
                        }

                        cells.push(
                          <td
                            key={colCursor}
                            rowSpan={rs > 1 ? rs : undefined}
                            colSpan={cs > 1 ? cs : undefined}
                            style={tdStyle}
                          >
                            {/* 합계 컬럼: 뱃지 렌더링 */}
                            {isLastCol && val && val !== '—' ? (
                              <span style={{
                                display:'inline-block', width:76,
                                textAlign:'center', padding:'3px 0',
                                borderRadius:5, fontSize:11, fontWeight:600,
                                whiteSpace:'nowrap',
                                background: badgeStyle(val).bg,
                                color: badgeStyle(val).tx,
                              }}>
                                {val}
                              </span>
                            ) : (
                              <>
                                <span style={{
                                  fontWeight: isFirstCol ? 500 : undefined,
                                  color: (!isFirstCol && !isLastCol && val && String(val).includes('%'))
                                    ? rateColor(val) : undefined,
                                }}>
                                  {val}
                                </span>
                                {sub !== undefined && (
                                  <span style={{
                                    display:'block', fontSize:10,
                                    color: C.textSub, marginTop:2, lineHeight:1.3,
                                  }}>
                                    {sub}
                                  </span>
                                )}
                              </>
                            )}
                          </td>
                        )
                        colCursor += cs
                      })

                      visualRow++
                      return <tr key={ri}>{cells}</tr>
                    })
                  })()}
                </tbody>
              </table>

              {/* 법령 근거 note */}
              {group.note && (
                <div
                  style={{
                    fontSize:11, color:'#2C5282',
                    padding:'6px 12px',
                    borderTop:`1px solid ${C.blueBorder}`,
                    background:'#EBF4FF',
                    lineHeight:1.7, margin:0,
                  }}
                  dangerouslySetInnerHTML={{ __html: group.note }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
