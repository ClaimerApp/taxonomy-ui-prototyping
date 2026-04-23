export function colLetter(i) {
  let n = i
  let s = ''
  while (n >= 0) {
    s = String.fromCharCode((n % 26) + 65) + s
    n = Math.floor(n / 26) - 1
  }
  return s
}

export function cellRef(r, c) {
  return `${colLetter(c)}${r + 1}`
}

// Inverse of cellRef — parses "B7" or "AA13" into { r, c } (0-indexed).
// Returns null on malformed input.
export function parseCellRef(ref) {
  if (typeof ref !== 'string') return null
  const m = /^([A-Z]+)(\d+)$/.exec(ref.trim())
  if (!m) return null
  const letters = m[1]
  const row = parseInt(m[2], 10) - 1
  let col = 0
  for (const ch of letters) col = col * 26 + (ch.charCodeAt(0) - 64)
  return { r: row, c: col - 1 }
}

const gbpWhole = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
const gbpPennies = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const num0 = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 })
const num2 = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatCell(raw, format) {
  if (raw === null || raw === undefined || raw === '') return ''
  if (format === 'currency' || format === 'currency2') {
    const n = typeof raw === 'number' ? raw : parseFloat(raw)
    if (Number.isNaN(n)) return String(raw)
    return gbpPennies.format(n)
  }
  if (format === 'currency0') {
    const n = typeof raw === 'number' ? raw : parseFloat(raw)
    if (Number.isNaN(n)) return String(raw)
    return gbpWhole.format(n)
  }
  if (format === 'percent') {
    const n = typeof raw === 'number' ? raw : parseFloat(raw)
    if (Number.isNaN(n)) return String(raw)
    return `${num0.format(n)}%`
  }
  if (format === 'integer') {
    const n = typeof raw === 'number' ? raw : parseFloat(raw)
    if (Number.isNaN(n)) return String(raw)
    return num0.format(n)
  }
  if (format === 'number' || format === 'number2') {
    const n = typeof raw === 'number' ? raw : parseFloat(raw)
    if (Number.isNaN(n)) return String(raw)
    return num2.format(n)
  }
  if (format === 'date') {
    const d = raw instanceof Date ? raw : new Date(raw)
    if (Number.isNaN(d.getTime())) return String(raw)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }
  return String(raw)
}

export function isNumericFormat(fmt) {
  return ['currency', 'currency2', 'currency0', 'percent', 'integer', 'number', 'number2'].includes(fmt)
}
