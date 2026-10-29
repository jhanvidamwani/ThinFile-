# ThinFile — Positioning & Competitive Landscape

Oct 29, 2026 · @Mehek Malhotra

The direction makes sense, and it's sharper than the general version. This space is crowded, but there is a real gap, and it's exactly the person we're designing for.

**ThinFile in three words: Explain. Prove. Coach.**

## Who we're serving: the "in-between" immigrant

The person: in the US for 1–3 years, pays rent and bills on time, maybe has one new credit card, and still gets turned down.

**Why existing tools miss them:**

- **Their home-country credit history often can't be used anymore.** Nova Credit can import foreign credit history, but NerdWallet notes that a US credit file you've already started could disqualify the international report, depending on the lender and product. Once someone opens even one US card, that route can close.
- **They're still too new to be scored.** Most top US lenders use traditional scoring models that need at least six months of credit history before a person can be scored.
- **Rent reporting has conditions.** Esusu works through partnerships with landlords and property managers. Bilt only reports rent paid through Bilt. Experian Boost is free but only shows up on your Experian report. All of these build a score slowly, going forward.

## The 3 problems we solve

| # | Problem | Who feels it | ThinFile's answer |
| --- | --- | --- | --- |
| 1 | **Explain:** "Reviewing a file with no credit score takes forever." | Underwriter at a credit union | An agent pipeline that turns bank history into a one-page Reliability Report, with every step visible |
| 2 | **Prove:** "Is this AI decision biased?" | Lender's compliance team, regulators | Agents never see the applicant's name or nationality, plus a live Twin Test showing identical outcomes |
| 3 | **Coach:** "Why was I declined, and what do I do now?" | The applicant | The smallest specific change that turns a "no" into a "yes," e.g. "0 overdrafts for 60 days" |

## Competitors

| Type | Who | What they do | What they miss |
| --- | --- | --- | --- |
| Rent reporting | Esusu, Bilt, Experian Boost, Self, Boom, RentReporters, Rental Kharma | Add rent and bills to your credit report | Slow; usually need landlord partners or specific apps; only nudge a score |
| Foreign credit | Nova Credit Passport | Brings your home-country credit report to US lenders | Limited countries; your new US file can block it |
| Bank-data lending | Petal, Prism Data, Nova Cash Atlas, Experian Cashflow Score, Plaid | Lenders read your bank transactions | Built for the lender; the applicant never sees the reasoning or a next step |
| AI underwriting agents | Taktile, plus "AI credit committee" hackathon projects | Agents automate loan review | No fair-lending proof, no applicant-facing view, no coaching |

**What this means for the pitch:** Chase, PayPal and Experian using cash-flow data proves the market exists. Nobody is proving fairness to the lender *and* giving the applicant a next step. That's our gap.

## How ThinFile is different

**Competitors say: "Build your credit over the next few months."** **ThinFile says: "You already have a track record. Here's the proof."**

ThinFile reads your existing bank history, up to 24 months, and finds all your reliable payments (rent, phone, utilities, insurance). It turns them into a one-page **Reliability Report** you can share with any lender or landlord as a link. No landlord partnership, no waiting, no switching how you pay rent.

**Tagline options:**

- "Don't build credit. Prove it."
- "Two years of on-time rent. One link."
- "You've been reliable. Now you can show it."

**Where to reach people:** university international student offices, immigrant community organizations, and credit unions that serve immigrant communities. The pitch is "proof you can show today," not a credit-score hack.

## The simplest version: 3 steps

**Applicant side:**

1. **Connect your bank** (1 tap; simulated for the demo, loads the sample CSV)
2. **We find your on-time payments.** For example: "18 of 18 rent payments on time. 52 of 52 bills on time."
3. **Share your Reliability Report** with any lender or landlord as a link

If the result is a counter-offer or decline, the applicant sees **"Your fastest path to approval"** (Coach) instead of a dead end.

**Lender side: one page**

- At the top, a big **"Reliable payer ✅"** badge
- 3 numbers: rent on-time rate, bills on-time rate, months of history
- 1 sentence: *"Paid $1,100 rent on the 1st for 18 straight months; never overdrawn."*
- A **"Fairness verified 🛡️"** badge: name, address and nationality were redacted before analysis
- A button: "See full analysis" — where the agent pipeline lives
- A button: "Download audit log" — a JSON record of every step, for the lender's model-risk team

## Under the hood: the agent architecture

```
"Connect bank" (simulated) / CSV
        │
  ① PII Redaction Guard ── strips name, address, nationality before ANY agent sees data
        │
  ② Intake Agent ── categorizes transactions, returns schema-validated JSON
        │
  ┌─────┼─────────────┐        run in parallel
  ③ Income   ④ Payments   ⑤ Risk
  Agent      Agent         Agent
  └─────┬─────────────┘
        │
  ⑥ Scoring Tool (deterministic code, not an LLM) + Policy-as-Code rules
        │
  ⑦ Compliance Agent ── Reg B adverse-action reasons (knowledge base)
        │
  ⑧ Counterfactual Coach ── smallest change that flips the decision
        │
  Score near a band edge? ──▶ "Needs human review"
        │
  Reliability Report + Audit Log
```

**What each upgrade proves on screen:**

| Upgrade | Problem | What judges see |
| --- | --- | --- |
| PII Redaction Guard | Prove | "Redacted: name, address, nationality ✔" before analysis starts |
| Twin Test ×5 | Prove | Same transactions under 5 names and backgrounds → identical score, "variance: 0" |
| Deterministic scoring tool + waterfall | Explain | "Base 50 → +18 rent history → −12 NSFs → +9 savings = 65" |
| Parallel agents + "View JSON" | Explain | Three specialist agents running side by side, with typed handoffs |
| Counterfactual Coach | Coach | "Your fastest path to approval: 0 overdrafts for 60 days" |
| Audit log export | Prove | Downloadable record of every step, rule version and timestamp |
| Human-review routing | Explain | Borderline cases flagged instead of auto-decided |

**ThinFile Score (0–100), fixed weights:** payment reliability 30 · income stability 25 · balance cushion 20 · overdraft/NSF history 15 · debt-to-income 10. Bands: 75+ Approve · 50–74 Counter-offer · <50 Decline.

**Lines for the pitch:**

- *"Our agents never see your name. Fairness isn't a check at the end, it's built into the architecture."*
- *"LLMs reason, code computes. The score is deterministic and auditable."*
- *"We don't just say no. We compute the smallest change that turns it into a yes."*

## Partners & integrations: Nova Credit

Nova Credit has two products, and they relate to us differently:

| Nova product | What it does | Relationship to ThinFile |
| --- | --- | --- |
| **Credit Passport** | Imports home-country credit history | **Complementary.** Use it as an extra input |
| **Cash Atlas** | Bank-data underwriting for lenders | **Direct competitor.** Don't integrate. Our edge is Prove + Coach |

**Why Credit Passport makes us stronger:**

1. **It covers the full in-between immigrant.** Opening a US file can block the Passport route, so ThinFile uses *both*: foreign credit history when it's available, plus US bank history always. *"Whatever proof you have, ThinFile uses it."*
2. **It answers the regulatory risk.** Nova is a licensed consumer reporting agency (Cash Atlas produces reports under the Fair Credit Reporting Act). Answer for judges: *"We'd launch on top of a licensed partner like Nova Credit."*

**Real integration (post-hackathon):** Nova has a public API with a sandbox. Applicants complete Nova's hosted flow (NovaConnect), then our server pulls the Credit Passport as JSON or PDF. Sandbox keys require a Nova business account, so this isn't possible tonight.

**Tonight: simulate it, clearly labeled.** Optional, and only after the core build, before the 7:05 freeze.

```text
Add an optional "Import home-country credit history" step to the applicant flow, labeled "Planned integration — simulated for demo". For Priya, it returns a mock report: "India — CIBIL score 782, 3 years of history, 0 missed payments". Feed this into the Payments Agent as an additional reliability signal, and show it on the lender Reliability Report as "International history: verified (simulated)". If the applicant has a US credit file that blocks the import, show: "International report unavailable — using US bank history only."
```

**Demo rules:** keep the "simulated" label on screen, no Nova logo, and never claim a partnership. Say *"planned integration with a provider like Nova Credit."*

## Honest risks

- **Lenders have to accept it.** The applicant can share the report, but the lender decides whether to trust it. The paying customer is still the credit union; the applicant is how we reach them.
- **Regulation:** if ThinFile sends consumer data to lenders for credit decisions, in real life it would likely count as a credit reporting agency — the same category Plaid created a separate company for. Answer for judges: "We'd partner with a licensed reporting agency rather than become one at launch."
- **Twin Test has limits.** It proves the model treats identical finances identically (no disparate treatment). It doesn't prove there's no disparate impact across a whole portfolio. Answer for judges: "Production adds portfolio-level disparate-impact testing."

## For tonight's build

The existing engine stays the same. Change the framing to **two screens**: the 3-step applicant flow and the one-page lender report. Rename Priya's card to *"18 months in the US, never missed rent."* That's the demo opener.

**Build order (feature freeze at 7:05):**

1. Core pipeline + three sample applicants (Priya, Marcus, Jordan)
2. Two screens: applicant flow + lender Reliability Report
3. PII Redaction Guard + deterministic score with waterfall
4. Twin Test + Counterfactual Coach
5. If time: audit log download, parallel agents, human-review routing

**Cut:** Advocate vs. Skeptic debate, Money Story, Credit Passport. They don't serve the 3 problems.

**Demo (3 minutes):** Priya → Reliability Report → Twin Test → Marcus's path to approval → Jordan, high salary but declined → close on *Explain, Prove, Coach*.

## Sources

- [NerdWallet — 5 Things to Know About Nova Credit](https://www.nerdwallet.com/credit-cards/learn/nova-credit)
- [Contrary Research — Nova Credit](https://research.contrary.com/report/nova-credit)
- [Nova Credit — Introducing Cash Atlas](https://novacredit.com/blog/nova-credit-introduces-cash-atlas)
- [Nova Credit — API v4 Reference](https://docs.novacredit.com/credit-passport/v4)
- [Nova Credit — Credit Passport Quickstart](https://docs.neednova.com/credit-passport-quickstart)
- [Experian Cashflow Score launch](https://finance.yahoo.com/news/experian-launches-cashflow-score-solution-230000060.html)
- [Taktile AI underwriting agents](https://business.mammothtimes.com/mammothtimes/article/bizwire-2025-9-10-taktile-unveils-ai-agents-enabling-banks-to-process-5x-more-smb-loans-without-extra-headcount)
- [lablab.ai — AI Credit Committee (hackathon project)](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/mandalorian/ai-credit-committee)
- [Gerald — Low-fee rent reporting services](https://joingerald.com/learn/debt--credit/low-fee-rent-reporting-services-emergency-expenses)
- [Bilt Credit Boost](https://pages.biltrewards.com/credit-boost)
- [Gerald — Top bill reporting services](https://joingerald.com/learn/debt--credit/top-rated-bill-reporting-services-credit-education)
- [Gerald — Top rent reporting services](https://joingerald.com/learn/debt--credit/top-rated-bill-reporting-services-for-rent-payments)
