# ThinFile pitch script (about 3 minutes)

Matches the live app as of Oct 29, 2026. Lines marked **[click]** are things to do on screen.

## 1. The problem (30 sec)

"In the US, to get a loan, a credit card, or even an apartment, you need a credit score. But you only get a score after you've borrowed. So people who've never borrowed are invisible, even if they've paid every bill on time.

Meet Priya. She moved here 18 months ago and has never missed rent. Every bank still says no.

She's not alone: newcomers, students, gig and cash workers, people starting over after prison. Reliable people the system can't see."

## 2. The idea (30 sec)

"ThinFile looks at your bank account instead of your credit score. In the industry this is called cash-flow underwriting, and big banks like Chase already use it. But it's built for large lenders, and the applicant never sees why they were approved or rejected.

ThinFile makes it simple, clear and fair, for both sides."

## 3. How it works (20 sec)

"Three steps:
1. Connect your bank. In production that runs through Plaid, the same way you'd link it to Venmo. We never see your password and can't move your money. Today's demo uses sample accounts.
2. We find your on-time payments: rent, phone, electricity.
3. You get a Reliability Report you can share with any lender or landlord."

## 4. Demo (60 sec)

- **[click] Connect a bank (demo) → Priya → Allow read-only access.**
  "Five checks run in order. Her name is hidden first, then every transaction is labeled."
- **Priya's report:** "18 of 18 rent payments on time. Stamped **Reliable payer**, 99 out of 100." **[click] any green dot:** "Every dot is a real payment: date, amount, due date."
- **[click] All files → Marcus.** "Marcus drives for Uber and DoorDash and gets cash tips. ThinFile never counts cash on its own. He scores 55."
  **[click] Count as declared income.** "He declares his tips himself. They count, but lenders see them labeled as declared, not verified. He can attach his tax return as backup. Now he's at 62: **Not yet**, with a dated plan: **no overdrafts until December 27, 2026**, and he's a Reliable payer."
  **[click] See what a lender sees:** "The lender gets the same report, plus a suggestion: a smaller starter offer now, review on December 27."
- **[click] Jordan (optional, 10 sec):** "Jordan earns $5,500 a month and is **Not ready**. We judge habits, not paychecks."
- **[click] Run fair check:** "Same bank history under six different names. Same score, and the same report fingerprint. The agents never saw who he is."

## 5. Who it's for (20 sec)

"Whether you're paid in cash or have an ITIN instead of a Social Security number, if you have a bank account and pay your bills, ThinFile can show it. Lenders still run their own ID checks. We just make reliability visible."

## 6. Why lenders trust it (20 sec)

"In production, the data comes straight from the bank through Plaid, so it can't be edited. Every number links to the actual payments: tap any dot. The score is fixed math; the AI only labels unfamiliar merchants and writes the summary. And the lender always makes the final call. We don't ask banks to trust a new number. We show them the receipts."

## 7. Fair and legal (15 sec)

"ThinFile only looks at how you handle money. We never ask about immigration status or someone's past. We never delete or change transactions; we only hide names from our own scoring, so the bank's anti-money-laundering checks stay intact. Every connection is made with the applicant's permission. ThinFile makes reliable people visible; it never helps anyone get around the rules."

## 8. Business and close (15 sec)

"Free for applicants. Credit unions and community banks, including the ones that already lend to ITIN holders, pay per report and gain customers they were turning away. Next, we'll add home-country credit history through Nova Credit.

A credit score asks, 'Have you borrowed before?' ThinFile asks, 'Have you paid your bills?'

Don't build credit. Prove it."
