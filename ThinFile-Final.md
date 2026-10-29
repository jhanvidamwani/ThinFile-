# ThinFile — Final Plan

### Don't build credit. Prove it.

**Team:** Jhanvi (fintech) · Mehek (UX research)
**Event:** Lyzr × Plug and Play — AI Builders Speed Dating · Oct 29, 2026
**Finish line:** a live URL judges click and use.

---

## 1. The idea in one sentence

ThinFile turns your bank history into **proof you pay on time**, which you can share with any lender or landlord as a link.

---

## 2. The problem

**Priya** moved to the US 18 months ago for grad school. She has paid rent on time every month, plus her phone and electricity bills.

She applies for a credit card: **declined.** For an apartment: **declined.**
She has no credit score, so to the system she doesn't exist.

Millions of people are in the same spot: new immigrants, international students, gig workers, young adults. They're responsible with money, and nobody can see it.

---

## 3. What makes ThinFile unique

| | Everyone else | ThinFile |
| --- | --- | --- |
| **1. Proof, not a score** | "Wait 6 months and your score might go up." | "You already have a track record. Here it is." |
| **2. Fair by design** | "Trust our model." | Never sees your name or background. Proven live: 5 names, same result. |
| **3. "Not yet" instead of "no"** | A rejection letter. | "Avoid overdrafts for 60 days and you'll qualify." |

**The signature visual: the Reliability Wall.** Every on-time payment is a green dot, one row per bill and one dot per month. Anyone gets it in a second.

```
            May Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug Sep Oct
Rent         🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢
Phone        🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢
Electric     🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢  🟢
```

---

## 4. The app: 3 screens

**Screen 1 — Start**
"Don't build credit. Prove it." Pick Priya, Marcus or Jordan, or paste your own.

**Screen 2 — Checking (about 5 seconds)**
Five helpers light up one by one:

| Helper | Job |
| --- | --- |
| 🛡️ Privacy Guard | Hides name, address and country first |
| 🗂️ Sorter | Labels every payment: rent, bill, income, spending |
| ✅ Checker | Counts on-time payments and overdrafts |
| 🧮 Calculator | Fixed score in code, not AI. Same history, same score |
| 🧭 Coach | Finds the one easiest fix if you're not there yet |

**Screen 3 — Your Report**
- Verdict: **Reliable payer ✅** / **Not yet 🟡** / **Not ready ❌**
- The Reliability Wall
- 3 numbers: rent on time, bills on time, months of history
- 1 sentence: *"Paid $1,100 rent on the 1st for 18 straight months. Never overdrawn."*
- **Share my proof** (if reliable) or **Your fix** (if not)
- 🛡️ **Fair check passed → Prove it** (same data, 5 names, same score)

**Lender View** (from the share link): the same report on one plain page, readable in 10 seconds.

---

## 5. Three people, three outcomes

| Person | Story | Result |
| --- | --- | --- |
| **Priya** | 18 months in the US, never missed rent | ✅ **Reliable payer**, all-green wall |
| **Marcus** | Delivery driver, uneven pay, a few overdrafts | 🟡 **Not yet**: "Avoid overdrafts for 60 days and you'll qualify" |
| **Jordan** | Big salary, spends more than they earn | ❌ **Not ready**: we judge **habits, not paychecks** |

---

## 6. Build plan (90 minutes)

| Time | Jhanvi | Mehek | Checkpoint |
| --- | --- | --- | --- |
| **6:00–6:10** | Paste the Architect prompt | Sketch the 3 screens on paper | Architect building |
| **6:10–6:30** | Test all 3 people; fix wrong verdicts | Review every screen: is it obvious? | ✋ **All 3 people work** |
| **6:30–6:50** | Fair check + share link working | Polish the Reliability Wall and copy | Core features done |
| **6:50–7:05** | Fix bugs | Test on a phone like a stranger would | 🧊 **Feature freeze 7:05** |
| **7:05–7:15** | Deploy; test URL on hotspot | Screen-record a 60-sec backup video | Live URL works |
| **7:15–7:30** | Rehearse pitch ×2 | Rehearse pitch ×2 | 🚀 Submit |

**Rules:**
- If all 3 people don't work by **6:30**, stop adding and fix the core.
- Nothing new after **7:05**. Fixes only.
- One person drives Architect; the other tests and writes the next fix.

Prompts: see **ThinFile-Architect-Prompt.md**.

---

## 7. The demo (2 minutes)

| Time | What |
| --- | --- |
| 0:00–0:20 | **Story.** "Priya has paid rent on time for 18 months. Every bank says no. She has no credit score." |
| 0:20–0:50 | Tap **Priya** → helpers light up → **all-green wall** → *Reliable payer* → **Share my proof** opens the lender view |
| 0:50–1:10 | Tap **Prove it** → 5 names, same score. "It never sees her name. Fair by design." |
| 1:10–1:30 | Tap **Marcus** → *Not yet* → "One fix: no overdrafts for 60 days. A *no* becomes a *not yet*." |
| 1:30–1:45 | Tap **Jordan** → *Not ready* → "Big salary, still not ready. We judge habits, not paychecks." |
| 1:45–2:00 | **Close.** "Don't build credit. Prove it. That's ThinFile." Hand the laptop to a judge. |

---

## 8. The 30-second pitch

> "Priya has paid rent on time for 18 months. Every bank still says no, because she has no credit score.
> ThinFile turns her bank history into proof she can share in one link.
> It never sees her name, so it's fair by design. And if someone isn't ready, it tells them exactly how to get there.
> **Don't build credit. Prove it.**"

---

## 9. If judges ask…

| Question | Answer |
| --- | --- |
| *"Isn't this already done?"* | Banks like Chase use bank data now, but it's built for the bank. The applicant never sees why or what to fix. We're built for the person. |
| *"Can the AI make things up?"* | No. The AI sorts and explains; the score is fixed math. Same history, same result. |
| *"Is it really fair?"* | It never sees names or backgrounds. Watch: 5 names, 1 result. |
| *"Isn't this a credit bureau?"* | In real life we'd launch with a licensed partner, like Nova Credit, rather than become one. |
| *"Why would a lender trust it?"* | Every step is shown. Nothing is a black box. |
| *"How do you make money?"* | Lenders pay a small fee per report. Applicants use it free. |
| *"Why agents?"* | Each helper has one job you can check on its own, the way a real review team works. |

---

## 10. Backup plan

| If… | Then… |
| --- | --- |
| Architect is slow | Ship the 3 screens without the fair check; it's still a full demo |
| A verdict is wrong | Use the "wrong verdict" fix prompt; adjust the data, not the weights |
| Wi-Fi dies | Phone hotspot, then the backup video |
| The URL breaks | Screenshots of each screen saved on the desktop |

---

## 11. Final checklist (7:20 PM)

- [ ] Live URL opens on a phone over hotspot
- [ ] Priya ✅, Marcus 🟡, Jordan ❌
- [ ] Reliability Wall shows 18 months for Priya
- [ ] "Prove it" shows 5 identical scores
- [ ] Share link opens the lender view
- [ ] No jargon, no placeholder text
- [ ] Pitch rehearsed twice
- [ ] Backup video + screenshots saved
- [ ] URL submitted
