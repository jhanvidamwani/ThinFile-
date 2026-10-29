# ThinFile — Hackathon Playbook

> **"Your rent is your credit history."**
> An AI credit committee that underwrites the 45 million Americans credit scores miss — and shows its work.

**Team:** Jhanvi (fintech, domain + data + pitch) · Partner (UX research, flows + story + polish)
**Event:** Lyzr × Plug and Play — AI Builders Speed Dating · Oct 29, 2026 · Build 6:00–7:30 PM
**Finish line:** a live URL judges click and use.

---

## 1. The one-liner (memorize it)

> Lenders turn away millions of people who pay rent and bills on time, just because they don't have a FICO score. **ThinFile** reads 90 days of bank data, convenes an AI credit committee that debates the applicant, proves its decision isn't biased, and tells every declined applicant exactly how to get approved.

---

## 2. Why this wins (mapped to the 100-point rubric)

| Judging area | What judges will see | Our "wow" moment |
|---|---|---|
| **Problem clarity** | Three human personas, one real pain: no score = no credit | Opening line: "Priya has paid rent on time for 14 months. Every bank says no." |
| **Agentic complexity** | 7 agents incl. a live **Advocate vs. Skeptic debate** judged by a **Chair** agent | Agents visibly disagree, then resolve |
| **Live functionality** | 1-click sample applicants + paste-your-own; deterministic score | **Twin Test**: swap the name/nationality live → identical score |
| **Business impact** | Faster decisions, new market, fair-lending compliance built in | "Path to Approval" turns a *no* into a *not yet* (a future customer) |

---

## 3. The problem (facts for the pitch)

- **~26M** U.S. adults are "credit invisible" and **~19M** more are "unscorable" — **~45M** total (CFPB, *Data Point: Credit Invisibles*, 2015).
- Hit hardest: international students, recent grads, immigrants, gig workers.
- Cash-flow (bank transaction) data is increasingly used by lenders and regulators as an alternative to bureau scores — open-banking access (CFPB §1033) makes it easier to get.
- Small lenders & credit unions **want** this market but can't afford data-science teams or the fair-lending risk of a black box.

**Validation:** Nova Credit (international credit passports) and Experian Boost prove demand. **Our gap:** an *explainable, agentic* underwriter small lenders can run, with built-in fair-lending checks and applicant coaching.

---

## 4. The product — "The Credit Committee"

Instead of a black box, ThinFile runs your application through a committee of AI agents — like a real bank's loan committee.

```
  Bank CSV ──▶ ① Intake ──▶ ② Cash-Flow Analyst ──▶ ③ Policy
                                                       │
                       ┌───────────────────────────────┤
                       ▼                               ▼
               ④ Advocate  ◀── debate ──▶  ⑤ Skeptic
                       └───────────┬───────────┘
                                   ▼
                          ⑥ Fair Lending Guard  (+ Twin Test)
                                   ▼
                    ⑦ Committee Chair: Decision + Path to Approval
```

| # | Agent | Job | Output on screen |
|---|---|---|---|
| ① | **Intake** | Categorizes every transaction | Color-coded transaction table |
| ② | **Cash-Flow Analyst** | Income, volatility, balances, DTI, on-time %, NSFs | Metric cards |
| ③ | **Policy** | Applies lender rules | ✅ / ❌ checklist with evidence |
| ④ | **Advocate** | Builds the strongest case **for** the applicant | Green chat bubble |
| ⑤ | **Skeptic** | Builds the strongest case **against** | Red chat bubble |
| ⑥ | **Fair Lending Guard** | Confirms no protected attributes used; writes ECOA/Reg B adverse-action reasons | Shield badge "Fair-lending check passed" |
| ⑦ | **Committee Chair** | Weighs the debate, issues decision, limit, score, Path to Approval | Decision badge + summary |

### The ThinFile Score (deterministic — same input, same score, every time)

| Factor | Weight | Measures |
|---|---|---|
| Payment reliability | 30 | % of rent & bills paid on time |
| Income stability | 25 | Monthly income avg and volatility |
| Balance cushion | 20 | Avg & minimum balance vs. monthly expenses |
| Overdraft / NSF history | 15 | Events in last 90 days |
| Debt-to-income | 10 | Recurring debt ÷ income |

**Decision bands:** 75–100 Approve · 50–74 Counter-offer · 0–49 Decline

> Why deterministic? So the live demo never surprises us, and so the **Twin Test** can prove fairness. The LLM agents *explain and debate*; the score math is fixed.

---

## 5. Signature "wow" features (build in this priority order)

1. **🗣️ Committee Debate** — Advocate vs. Skeptic as a chat thread, Chair rules. *This is the agentic-complexity showpiece.*
2. **👯 Twin Test** — one button: "Re-run with a different name & country of origin." Score stays identical. Fair lending proven live in 5 seconds. *Judges will remember this.*
3. **🧭 Path to Approval + What-If slider** — "If Marcus has 0 overdrafts for 60 days → score 64 → 78 → **Approved**." Turns rejection into a roadmap.
4. **📖 Money Story** — the 90 days told as a 3-sentence human story + a balance sparkline. ("Priya's stipend lands on the 1st, rent leaves the same day, and she still saves $250 every month.")
5. **🎫 Credit Passport** *(stretch)* — a shareable card summarizing the applicant's verified cash-flow strengths, to bring to any lender.
6. **👁️ Dual view toggle** — *Underwriter view* (dense, technical) vs. *Applicant view* (friendly, plain language). Partner's domain — this is where UX research shines.

---

## 6. Personas & sample data

Data files are in this folder — 90 days (Aug 1 – Oct 28, 2026), with running balances:

| Persona | File | Story | Expected |
|---|---|---|---|
| **Priya**, 24 — int'l grad student, Stevens Institute | `priya.csv` | $2,400 stipend, $1,100 rent on the 1st every month, saves $250/mo, zero overdrafts | ✅ **Approve** (score ~80–90) |
| **Marcus**, 31 — Uber/DoorDash driver | `marcus.csv` | Income swings $1,800 → $3,900 → $2,700; rent always paid; 3 NSF fees | 🟡 **Counter-offer** (~55–70) + coaching |
| **Jordan**, 28 — salaried $5,500/mo | `jordan.csv` | Income is fine, but spending (BNPL, dining, Airbnb) exceeds it; 7 overdraft fees; balance ends negative | ❌ **Decline** (<50) with clear reasons |

> Jordan is the twist: **high income, declined.** It shows ThinFile judges *behavior*, not paychecks — a great line for the pitch.

### Persona cards (partner: refine the copy)
- **Priya** — "Moved from Ahmedabad 14 months ago. Never missed rent. Still invisible to every bureau."
- **Marcus** — "Drives 50 hours a week. Some weeks are great, some aren't. Rent never late."
- **Jordan** — "Great salary. Spending tells a different story."

---

## 7. Execution plan (90 minutes)

### Before 6:00 PM (allowed: ideas, research, data — no pre-built app)
- [ ] Read this playbook together (10 min) — agree on ThinFile, agree on roles
- [ ] Get Lyzr Architect credits & login working on **both** laptops
- [ ] Phone hotspot charged and tested
- [ ] CSV files open and ready to paste

### Build session

| Time | Jhanvi (fintech) | Partner (UX) | Checkpoint |
|---|---|---|---|
| **6:00–6:10** | Paste **Prompt 1** into Architect | Sketch the 3 screens on paper: landing → results → applicant view | Architect generating |
| **6:10–6:30** | Paste sample CSVs; check agent outputs & score math against expected outcomes | Write persona-card copy, headline, Applicant-view language | **All 3 personas run end-to-end** ✋ |
| **6:30–6:50** | **Prompt 2** (Debate) → **Prompt 3** (Twin Test) | Review every screen for clarity; list UI fixes | Debate + Twin Test working |
| **6:50–7:05** | **Prompt 4** (Path to Approval / What-If) | **Prompt 5** (UI polish) with your fix list | Feature freeze at **7:05** 🧊 |
| **7:05–7:15** | Deploy. Test the URL on a phone over hotspot | Run all 3 personas as a stranger would; note any breakage | Live URL works on mobile |
| **7:15–7:25** | Rehearse pitch ×2 (timed) | Screen-record a 60-sec backup demo video | Backup video saved |
| **7:25–7:30** | Submit URL | Breathe | 🚀 |

**Rules:**
- ✋ If all 3 personas don't work by **6:30**, skip the wow features and polish the core.
- 🧊 Nothing new after **7:05**. Only fixes.
- One driver in Architect at a time — the other reviews and writes the next prompt.

---

## 8. Architect prompts (paste in order)

### Prompt 1 — Core app

```text
Build a web app called "ThinFile" — tagline "Your rent is your credit history." It helps small lenders and credit unions underwrite applicants with no or thin credit history (international students, recent grads, gig workers, immigrants) using 90 days of bank cash-flow data instead of a FICO score.

MULTI-AGENT WORKFLOW (run in sequence; show each agent's output as a step in a visible timeline):
1. Intake Agent: Parses pasted CSV bank transactions (date, description, amount, balance). Categorizes each as income, rent, utilities/bills, debt payment, subscriptions, discretionary, savings transfer, or overdraft/NSF fee. Flags anything uncategorized.
2. Cash-Flow Analyst Agent: Computes average monthly income, income volatility (stable / variable / irregular), average and minimum balance, debt-to-income ratio (recurring debt payments ÷ income), on-time rent & bill payment rate, and count of NSF/overdraft fees in the last 90 days.
3. Policy Agent: Applies lender rules — minimum monthly income $1,500; max 2 NSF/overdraft events in 90 days; DTI under 40%; at least 3 months of history; ending balance not negative. Shows pass/fail per rule with the specific evidence.
4. Fair Lending Agent: Confirms the decision uses only financial behavior and never protected attributes (race, color, religion, national origin, sex, marital status, age, receipt of public assistance). Names are ignored. Generates ECOA / Regulation B compliant adverse action reasons in plain language.
5. Decision & Coaching Agent: Outputs Approve / Counter-offer / Decline, a recommended credit limit, a one-paragraph underwriter summary, and for counter-offers and declines a "Path to Approval" with 2–3 specific measurable actions (e.g. "Keep your balance above $500 for the next 60 days").

THINFILE SCORE (0–100) — compute deterministically with fixed weights so the same data always gives the same score:
- Payment reliability (on-time rent & bills): 30
- Income stability: 25
- Balance cushion (avg & min balance vs monthly expenses): 20
- Overdraft/NSF history: 15
- Debt-to-income: 10
Bands: 75–100 Approve, 50–74 Counter-offer, 0–49 Decline.

UI:
- Landing page: headline "Underwrite the 45 million Americans credit scores miss", subhead "Your rent is your credit history.", three "Try a sample applicant" cards (Priya, Marcus, Jordan) each with a one-line persona, plus a "Paste your own transactions" text box.
- Results page: agent timeline with each step's reasoning, a score gauge, a factor breakdown bar chart, a rule pass/fail checklist, a large decision badge, adverse action reasons, and the Path to Approval.
- Clean, trustworthy fintech design: lots of white space, deep navy and emerald green accents, rounded cards, accessible contrast, mobile responsive.

SAMPLE APPLICANTS — I will paste three CSVs next. Preload them on the sample cards:
- Priya (24, international grad student, steady stipend, rent always on time, saves monthly) — should Approve.
- Marcus (31, rideshare/delivery driver, volatile income, 3 NSF fees, rent on time) — should Counter-offer.
- Jordan (28, salaried $5,500/mo, spending exceeds income, 7 overdraft fees, negative ending balance) — should Decline.
```

*Then paste `priya.csv`, `marcus.csv`, `jordan.csv` with: "Here is the sample data for Priya / Marcus / Jordan."*

### Prompt 2 — The Credit Committee debate

```text
Add a "Credit Committee" step after the Policy Agent. Two new agents debate the applicant:
- Advocate Agent: makes the strongest evidence-based case FOR approving (cites specific transactions and metrics).
- Skeptic Agent: makes the strongest evidence-based case AGAINST (cites specific risks).
Show them as a chat thread — Advocate in green bubbles, Skeptic in red, 2 rounds each, short and punchy. Then a "Committee Chair" agent summarizes who made the stronger case and passes that to the Decision Agent. The final decision must still respect the deterministic ThinFile Score band.
```

### Prompt 3 — Twin Test (fairness proof)

```text
Add a "Run Twin Test" button on the results page. It re-runs the full analysis with the applicant's name and any country-of-origin or demographic hints swapped to a different identity (e.g. "Priya Patel, India" → "Emily Johnson, USA"), using the exact same transactions. Display both results side by side with the score, decision, and a big "✅ Identical outcome — no demographic bias detected" banner when they match.
```

### Prompt 4 — Path to Approval + What-If

```text
For Counter-offer and Decline results, add an interactive "What-If" panel with sliders: overdrafts in next 60 days (0–5), minimum balance ($0–$2,000), monthly discretionary spending change (−50% to +20%). As the user moves sliders, recalculate the ThinFile Score live using the same weights and show the projected score and decision (e.g. "64 → 78: Approved"). Highlight the single action with the biggest score impact as "Your #1 move".
```

### Prompt 5 — UX polish & Applicant view

```text
Polish the experience:
1. Add a toggle at the top of results: "Underwriter view" (all metrics, rules, agent reasoning) vs "Applicant view" (friendly plain-English summary, decision, why, and Path to Approval — no jargon).
2. Add a "Money Story" card: a 3-sentence human-readable story of the applicant's 90 days plus a balance-over-time sparkline.
3. Animate the agent timeline so each agent lights up in sequence as it completes.
4. Make sure every page works well on a phone screen.
```

**Stretch (only if ahead of schedule):** *"Add a 'Credit Passport' — a shareable card with the applicant's name, ThinFile Score, top 3 verified strengths, and a QR code / share link."*

---

## 9. Demo choreography (3 minutes)

| Time | Who | What |
|---|---|---|
| 0:00–0:20 | Jhanvi | **Hook.** "Priya moved here 14 months ago. She's never missed rent. Every bank says no — she has no credit score. She's one of 45 million Americans like this." |
| 0:20–0:30 | Partner | "We interviewed this problem from both sides — the underwriter drowning in manual reviews, and the applicant who never learns why they were declined." |
| 0:30–1:15 | Jhanvi drives | Click **Priya** → watch agents light up → Committee debate → **Approved, 8X** |
| 1:15–1:35 | Jhanvi | Click **Twin Test** → "Same money, different name. Same answer. Fair lending, proven." |
| 1:35–2:15 | Partner drives | Click **Marcus** → Counter-offer → switch to **Applicant view** → drag the What-If slider → "Zero overdrafts for 60 days and he's approved. A *no* becomes a *not yet*." |
| 2:15–2:35 | Jhanvi | Click **Jordan** → "$5,500 salary — **declined**. ThinFile judges behavior, not paychecks." |
| 2:35–3:00 | Jhanvi | **Impact close.** "Faster underwriting for small lenders, a 45-million-person market, fair-lending compliance built in. That's ThinFile." |

> Hand the laptop to a judge: "Try pasting your own — or pick any applicant."

---

## 10. Judge Q&A cheat sheet

| Question | Answer |
|---|---|
| *"Can't the LLM hallucinate a decision?"* | The score is deterministic math with fixed weights. The agents categorize, explain, and debate — they never invent the number. That's also why the Twin Test works. |
| *"Where does the data come from in real life?"* | Open-banking aggregators (Plaid, MX, Finicity) with applicant consent; §1033 open-banking rules support consumer data access. |
| *"Isn't this what Nova Credit does?"* | Nova imports foreign bureau files. We underwrite from cash flow — works even with no file anywhere — and add explainability, debate, and coaching. |
| *"Fair-lending risk?"* | The Fair Lending Guard excludes protected attributes, generates Reg B adverse-action reasons, and the Twin Test is a built-in disparate-treatment check. A production version would add disparate-impact testing across portfolios. |
| *"Business model?"* | SaaS for credit unions & community lenders, priced per decision. Upsell: Credit Passport for applicants, portfolio monitoring. |
| *"Why agents and not one prompt?"* | Each step is auditable on its own — the way regulators and model-risk teams want it. Disagreement between Advocate and Skeptic surfaces risk a single prompt would hide. |

---

## 11. Risk & fallback plan

| Risk | Fallback |
|---|---|
| Architect is slow / errors | Ship Prompt 1 only — it's already a complete, judge-able app |
| Score doesn't match expected outcome | Tweak weights or tell Architect: "Priya must Approve; adjust the balance-cushion calculation" |
| CSV parsing flaky | Hard-code the 3 sample applicants; keep paste-your-own as secondary |
| Wi-Fi dies during demo | Phone hotspot; then the backup screen recording |
| Live URL breaks | Screenshots of each screen saved on the laptop desktop |

---

## 12. Final checklist (7:20 PM)

- [ ] Live URL opens on a phone over hotspot
- [ ] All 3 sample applicants give the expected decision
- [ ] Twin Test shows identical outcome
- [ ] No placeholder / lorem ipsum text anywhere
- [ ] Pitch rehearsed twice, under 3 minutes
- [ ] Backup video + screenshots saved
- [ ] URL submitted
