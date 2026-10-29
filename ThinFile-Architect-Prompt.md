# ThinFile — Prompt for Lyzr Architect

Copy everything inside the box below and paste it into Architect as your first message.

```text
Build a simple, beautiful web app called "ThinFile" with the tagline "Don't build credit. Prove it."

WHO IT'S FOR: people with no credit score (new immigrants, international students, gig workers) who pay rent and bills on time but still get declined. ThinFile turns their bank history into proof they can share with any lender or landlord.

SCREEN 1 — START
- Big headline "Don't build credit. Prove it." and one line underneath: "Turn your bank history into proof you pay on time."
- Three large tappable cards:
  • "Priya — 18 months in the US, never missed rent"
  • "Marcus — delivery driver, uneven pay"
  • "Jordan — big salary, big spending"
- A small "Paste your own bank transactions" option (CSV with date, description, amount, balance).

SCREEN 2 — CHECKING (about 5 seconds, animated)
Five helper agents light up one at a time, each showing a one-line result:
1. Privacy Guard — "Name, address and country hidden ✔". No later step may see these fields.
2. Sorter — labels every transaction as rent, bill, income, spending, savings, or overdraft fee.
3. Checker — counts on-time rent and bill payments per month, and overdraft fees.
4. Calculator — computes a 0–100 Reliability Score in code, not with AI, so the same data always gives the same score. Weights: on-time payments 40, steady income 25, money left over each month 20, no overdrafts 15.
5. Coach — if the score is under 75, finds the single easiest change that would push it over 75.

SCREEN 3 — YOUR REPORT
- Big verdict at the top: "Reliable payer ✅" (75+), "Not yet 🟡" (50–74), or "Not ready ❌" (under 50).
- THE RELIABILITY WALL (hero visual, make it large and satisfying): a grid of dots, one row per recurring payment (Rent, Phone, Electric, Internet, Insurance), one dot per month. Green = paid on time, yellow = late, red = missed or overdrawn that month. Animate the dots filling in left to right.
- Three big numbers: rent on time %, bills on time %, months of history.
- One plain-English sentence, e.g. "Paid $1,100 rent on the 1st for 18 straight months. Never overdrawn."
- If Reliable: a big "Share my proof" button that creates a link to the Lender View of this report.
- If Not yet or Not ready: a "Your fix" card with one specific action, e.g. "Avoid overdrafts for the next 60 days and you'll qualify."
- A small badge "🛡️ Fair check passed" with a "Prove it" button. It re-runs the same transactions under 5 different names and backgrounds (e.g. Priya Patel, Emily Johnson, Wei Chen, Carlos Rivera, Amara Okafor) and shows the identical score 5 times with "Same history. Same result."
- A small "See how we decided" link that expands each helper's reasoning.

LENDER VIEW (opened from the share link)
The same report on one clean page: verdict, Reliability Wall, three numbers, one sentence, fair-check badge. Readable in 10 seconds. No buttons except "See how we decided".

DESIGN
- Very simple and friendly, like a modern consumer app, not a bank.
- Lots of white space, one clean font, deep navy text, emerald green for good, soft amber and red for warnings.
- Big tap targets. Must work perfectly on a phone.
- No jargon anywhere. Never say DTI, NSF, underwriting, or FICO in the UI.
- Small footer: "Demo with sample data. Not a credit decision."

SAMPLE DATA — generate 18 months of realistic bank transactions (May 2025 – Oct 2026) for each person and preload them on the cards:
- Priya Patel, 24, international grad student in Jersey City. $2,400 university stipend on the 1st. $1,100 rent paid on the 1st every month. Phone $30, electric ~$60, internet $50, all on time. Moves $250 to savings monthly. Zero overdrafts. Expected: Reliable payer, score 85–95, all-green wall.
- Marcus Johnson, 31, rideshare and delivery driver. Weekly payouts, monthly income swings between $1,800 and $3,900. $950 rent always on time. Car insurance and phone usually on time, but 2 late months. 3 overdraft fees in the last 90 days. Expected: Not yet, score 55–70, mostly green with some yellow/red. Fix: "Avoid overdrafts for the next 60 days and you'll qualify."
- Jordan Lee, 28, salaried $5,500/month. Rent $2,450. Spends more than they earn every month (dining, shopping, buy-now-pay-later). 7 overdraft fees in the last 90 days, balance trending down. Expected: Not ready, score under 50, red dots on recent months. Message: "Strong income, but spending is higher than earnings."
```

---

## Follow-up prompts (only if needed)

**If a sample gets the wrong verdict:**
```text
Priya must be "Reliable payer" (85–95), Marcus "Not yet" (55–70), and Jordan "Not ready" (under 50). Adjust the sample data, not the score weights, so each lands in its range.
```

**If the Reliability Wall looks weak:**
```text
Make the Reliability Wall the biggest element on the report. Use large round dots with spacing, month labels along the top, payment names on the left, and animate the dots filling in left to right over 1.5 seconds.
```

**If the Fair Check is missing or slow:**
```text
The "Prove it" button must show 5 rows (5 different names) with the identical score and verdict, then a green banner: "Same history. Same result. Fair by design."
```

**Final polish (around 6:55):**
```text
Check every screen on a phone-sized viewport. Remove any jargon. Make sure the Start screen loads instantly and each sample card works with one tap.
```
