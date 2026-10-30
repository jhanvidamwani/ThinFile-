// ThinFile engine: parse -> redact -> sort -> check -> score -> coach.
// Pure functions, no DOM, so the same code runs in the page and in tests.
const ThinFile = (() => {
  // ---------- 1. Parse ----------
  function parseCSV(text) {
    const lines = String(text).replace(/\r/g, "").split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("Add a header row and at least one transaction.");
    const split = l => {
      const out = []; let cur = "", q = false;
      for (const ch of l) {
        if (ch === '"') q = !q;
        else if (ch === "," && !q) { out.push(cur); cur = ""; }
        else cur += ch;
      }
      out.push(cur);
      return out.map(s => s.trim());
    };
    const head = split(lines[0]).map(h => h.toLowerCase());
    const col = names => head.findIndex(h => names.includes(h));
    const di = col(["date", "posted", "transaction date"]);
    const si = col(["description", "desc", "memo", "name", "details"]);
    const ai = col(["amount", "amt"]);
    const bi = col(["balance", "running balance"]);
    if (di < 0 || si < 0 || ai < 0) throw new Error("The first row must name the columns: date, description, amount (balance is optional).");
    const rows = [];
    lines.slice(1).forEach((l, n) => {
      const c = split(l);
      const date = normDate(c[di]);
      const amount = Number(String(c[ai]).replace(/[$,\s]/g, ""));
      if (!date || !isFinite(amount)) throw new Error(`Row ${n + 2} has an unreadable date or amount: "${l.slice(0, 60)}"`);
      rows.push({ date, desc: String(c[si] || "").toUpperCase(), amount, balance: bi >= 0 ? Number(c[bi]) : null });
    });
    rows.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
    return rows;
  }
  function normDate(s) {
    s = String(s || "").trim();
    let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
    if (m) { const y = m[3].length === 2 ? "20" + m[3] : m[3]; return `${y}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`; }
    return null;
  }

  // ---------- 2. Privacy Guard ----------
  // Removes people's names from person-to-person transfers. The applicant's own
  // name and background are never passed to any later step.
  const P2P = /^(ZELLE (?:TO|FROM)|VENMO (?:TO|FROM)|WISE TRANSFER (?:TO|FROM)|CASH APP (?:TO|FROM)|PAYPAL (?:TO|FROM))\s+(.+?)(\s+RENT)?$/;
  function redact(rows, applicant) {
    let names = 0;
    const words = applicant ? String(applicant.name || "").toUpperCase().split(/\s+/).filter(w => w.length > 1) : [];
    const out = rows.map(r => {
      let desc = r.desc;
      const m = desc.match(P2P);
      if (m) { desc = `${m[1]} •••${m[3] || ""}`; names++; }
      for (const w of words) if (desc.includes(w)) { desc = desc.split(w).join("•••"); names++; }
      return { date: r.date, desc, amount: r.amount, balance: r.balance };
    });
    return { rows: out, names };
  }

  // ---------- 3. Sorter ----------
  const RULES = [
    ["fee", null, /\bNSF\b|OVERDRAFT|RETURNED ITEM|INSUFFICIENT/],
    ["savings", null, /TRANSFER TO SAVINGS|TO SAVINGS|SAVINGS DEPOSIT/],
    ["income", null, /PAYROLL|DIRECT DEP|STIPEND|SALARY|DASHER PAYOUT|DRIVER .*PAYOUT|INSTACART SHOPPER|GRUBHUB DRIVER/],
    ["transfer_in", null, /^(ZELLE|VENMO|WISE TRANSFER|CASH APP|PAYPAL) FROM/],
    ["rent", "Rent", /\bRENT\b/],
    ["bill", "Electric", /PSEG|CON ?ED|ELECTRIC|UTILITY|NATIONAL GRID|DUKE ENERGY/],
    ["bill", "Phone", /MOBILE|WIRELESS|VERIZON|AT&T|SPRINT/],
    ["bill", "Internet", /INTERNET|OPTIMUM|XFINITY|COMCAST|FIOS|SPECTRUM/],
    ["bill", "Car insurance", /AUTO INS|PROGRESSIVE|GEICO|STATE FARM|ALLSTATE/],
    ["debt", "Car payment", /CAR PMT|AUTO LOAN|TOYOTA FINANCIAL|HONDA FINANCIAL/],
    ["debt", "Car lease", /LEASE/],
    ["debt", "Credit card", /CARD MIN PMT|CREDIT CARD|CARD PAYMENT|AMEX PMT|DISCOVER PMT/],
    ["debt", "Pay later", /AFFIRM|KLARNA|AFTERPAY|PAY LATER/],
    ["debt", "Student loan", /STUDENT LOAN|NAVIENT|NELNET|SALLIE MAE/],
    ["subscription", null, /SPOTIFY|NETFLIX|HULU|APPLE\.COM|EQUINOX|PLANET FITNESS|YOUTUBE/],
    ["spending", null, /TRADER JOE|SHOPRITE|WHOLE FOODS|TARGET|AMAZON|WALMART|UBER EATS|DOORDASH(?! DASHER)|GRUBHUB(?! DRIVER)|CHIPOTLE|SHELL|EXXON|BP |NJ TRANSIT|MTA|NOBU|SEPHORA|AIRBNB|TICKETMASTER|LOUNGE|VENMO PAYMENT|UBER TRIP|LYFT|STARBUCKS|POPEYES|MCDONALD|PATEL BROTHERS|GROCERY|CVS|WALGREENS/],
  ];
  const CATS = ["income", "transfer_in", "rent", "bill", "debt", "subscription", "spending", "savings", "fee"];
  function merchantKey(desc) {
    return desc.replace(/[#*]/g, " ").replace(/\d+/g, " ").replace(/\s+/g, " ").trim().split(" ").slice(0, 3).join(" ");
  }
  function sortRules(rows) {
    const unknown = new Map();
    const sorted = rows.map(r => {
      for (const [cat, label, re] of RULES) if (re.test(r.desc)) return { ...r, cat, label, by: "rules" };
      const key = merchantKey(r.desc);
      unknown.set(key, r.amount);
      return { ...r, cat: null, label: null, key, by: null };
    });
    return { sorted, unknown: [...unknown.entries()].map(([key, amount]) => ({ key, amount })) };
  }
  // aiMap: { [merchantKey]: {cat, label} } from the AI Sorter; anything missing becomes spending.
  function applySort(sorted, aiMap) {
    return sorted.map(r => {
      if (r.cat) return r;
      const hit = aiMap && aiMap[r.key];
      if (hit && CATS.includes(hit.cat)) {
        const label = ["bill", "debt", "rent"].includes(hit.cat) ? (hit.label || r.key) : null;
        return { ...r, cat: hit.cat, label, by: "ai" };
      }
      return { ...r, cat: r.amount > 0 ? "transfer_in" : "spending", label: null, by: "default" };
    });
  }

  // ---------- 4. Checker ----------
  const ym = d => d.slice(0, 7);
  function monthRange(a, b) {
    const out = []; let [y, m] = a.split("-").map(Number); const [by, bm] = b.split("-").map(Number);
    while (y < by || (y === by && m <= bm)) { out.push(`${y}-${String(m).padStart(2, "0")}`); m++; if (m > 12) { m = 1; y++; } }
    return out;
  }
  function check(rows) {
    const first = rows[0].date, last = rows[rows.length - 1].date;
    const months = monthRange(ym(first), ym(last));
    // Recurring payments: rent, bills and debts seen in 3+ different months.
    const groups = {};
    for (const r of rows) if (["rent", "bill", "debt"].includes(r.cat) && r.amount < 0) (groups[r.label] ||= []).push(r);
    const wall = {};
    for (const [label, list] of Object.entries(groups)) {
      const byMonth = {};
      for (const r of list) (byMonth[ym(r.date)] ||= []).push(Number(r.date.slice(8)));
      if (Object.keys(byMonth).length < 3) continue;
      const days = Object.values(byMonth).map(d => Math.min(...d));
      const freq = {}; days.forEach(d => freq[d] = (freq[d] || 0) + 1);
      const due = Number(Object.entries(freq).sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0]);
      const start = ym(list[0].date);
      wall[label] = months.map((mo, i) => {
        if (mo < start) return "none";
        if (byMonth[mo]) return Math.min(...byMonth[mo]) - due <= 3 ? "g" : "y";
        // The last month may be incomplete: only call it missed once the due day has passed.
        if (i === months.length - 1 && Number(last.slice(8)) < due + 4) return "none";
        return "r";
      });
    }
    // Monthly income and spending (savings transfers are not spending).
    const inc = {}, out = {};
    months.forEach(m => { inc[m] = 0; out[m] = 0; });
    for (const r of rows) {
      if (r.cat === "income") inc[ym(r.date)] += r.amount;
      else if (r.amount < 0 && r.cat !== "savings") out[ym(r.date)] -= r.amount;
    }
    const cutoff = new Date(new Date(last).getTime() - 90 * 864e5).toISOString().slice(0, 10);
    const overdrafts90 = rows.filter(r => r.cat === "fee" && r.date > cutoff).length;
    const cells = Object.values(wall).flat().filter(s => s !== "none");
    const rate = arr => arr.length ? arr.filter(s => s === "g").length / arr.length : null;
    const billCells = Object.entries(wall).filter(([k]) => k !== "Rent").flatMap(([, v]) => v).filter(s => s !== "none");
    const income = months.map(m => inc[m]);
    const spend = months.map(m => out[m]);
    const paidMonths = months.filter(m => inc[m] > 0);
    const mean = paidMonths.length ? paidMonths.reduce((a, m) => a + inc[m], 0) / paidMonths.length : 0;
    const sd = paidMonths.length ? Math.sqrt(paidMonths.reduce((a, m) => a + (inc[m] - mean) ** 2, 0) / paidMonths.length) : 0;
    const left = paidMonths.length ? paidMonths.reduce((a, m) => a + (inc[m] - out[m]) / inc[m], 0) / paidMonths.length : -1;
    const rentRow = wall.Rent ? wall.Rent.filter(s => s !== "none") : [];
    return {
      months, wall, income, spend, overdrafts90,
      onTime: rate(cells) ?? 0, rentOn: rate(rentRow), billsOn: rate(billCells),
      late: cells.filter(s => s === "y").length, missed: cells.filter(s => s === "r").length,
      payments: cells.length, mean, cv: mean ? sd / mean : 1, left,
      rentStreak: (() => { let n = 0; for (let i = rentRow.length - 1; i >= 0 && rentRow[i] === "g"; i--) n++; return n; })(),
      rentAmount: groups.Rent ? Math.round(-groups.Rent[groups.Rent.length - 1].amount) : null,
      first, last,
    };
  }

  // ---------- 5. Calculator ----------
  // Fixed weights in plain code. Same history in, same score out.
  const clamp = x => Math.max(0, Math.min(1, x));
  function score(m) {
    const factors = [
      { key: "onTime", name: "On-time payments", max: 40, pts: 40 * clamp((m.onTime - 0.6) / 0.4) },
      { key: "income", name: "Steady income", max: 25, pts: 25 * clamp(1 - (m.cv - 0.1) / 0.5) },
      { key: "left", name: "Money left over", max: 20, pts: 20 * clamp((m.left + 0.1) / 0.45) },
      { key: "od", name: "No overdrafts", max: 15, pts: 15 * clamp(1 - m.overdrafts90 / 3) },
    ];
    const total = Math.round(factors.reduce((a, f) => a + f.pts, 0));
    return { factors, total, band: total >= 75 ? "good" : total >= 50 ? "warn" : "bad" };
  }

  // ---------- 6. Coach ----------
  // Searches for the smallest set of realistic changes that reaches 75.
  function coach(m) {
    const now = score(m);
    if (now.total >= 75) return { needed: false, steps: [], final: now.total };
    const moves = [
      { key: "od", say: "Avoid overdrafts for the next 60 days", apply: x => ({ ...x, overdrafts90: 0 }) },
      { key: "left", say: "Spend less than you earn for the next 3 months, keeping about 15% left over", apply: x => ({ ...x, left: Math.max(x.left, 0.15) }) },
      { key: "onTime", say: "Pay every bill on or before its due date for the next 3 months", apply: x => ({ ...x, onTime: Math.max(x.onTime, 0.97) }) },
    ];
    let cur = m; const steps = []; const used = new Set();
    while (score(cur).total < 75 && used.size < moves.length) {
      const best = moves.filter(mv => !used.has(mv.key))
        .map(mv => ({ mv, gain: score(mv.apply(cur)).total - score(cur).total }))
        .sort((a, b) => b.gain - a.gain)[0];
      if (!best || best.gain <= 0) break;
      used.add(best.mv.key); cur = best.mv.apply(cur);
      steps.push({ key: best.mv.key, say: best.mv.say, gain: best.gain, after: score(cur).total });
    }
    return { needed: true, steps, final: score(cur).total };
  }

  return { parseCSV, redact, sortRules, applySort, check, score, coach, merchantKey, CATS };
})();
if (typeof module !== "undefined") module.exports = ThinFile;
