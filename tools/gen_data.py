"""Generate 18 months (May 2025 - Oct 2026) of sample bank transactions for the three demo applicants.

Writes data/<name>.csv with columns date,description,amount,balance.
"""
import calendar
import os
import random
import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "data")
MONTHS = [(2025, m) for m in range(5, 13)] + [(2026, m) for m in range(1, 11)]
LAST_DAY = {(2026, 10): 28}


def day(ym, d):
    y, m = ym
    last = LAST_DAY.get(ym, calendar.monthrange(y, m)[1])
    return f"{y}-{m:02d}-{min(d, last):02d}"


def write(name, start, txns):
    txns.sort(key=lambda t: t[0])
    bal = start
    lines = ["date,description,amount,balance"]
    for d, desc, amt in txns:
        bal = round(bal + amt, 2)
        lines.append(f"{d},{desc},{amt:.2f},{bal:.2f}")
    with open(os.path.join(OUT, f"{name}.csv"), "w") as f:
        f.write("\n".join(lines) + "\n")
    print(name, len(txns), "rows, ending balance", bal)


def split(total, parts, rng):
    w = [rng.uniform(0.7, 1.3) for _ in range(parts)]
    s = sum(w)
    return [round(total * x / s, 2) for x in w]


def priya():
    rng = random.Random(1)
    t = []
    for i, ym in enumerate(MONTHS):
        t += [
            (day(ym, 1), "STEVENS INST OF TECH STIPEND DIRECT DEP", 2400),
            (day(ym, 1), "ZELLE TO HUDSON PROPERTY MGMT RENT", -1100),
            (day(ym, 3), "NJ TRANSIT MONTHLY PASS", -64),
            (day(ym, 5), "PSEG UTILITY AUTOPAY", -round(rng.uniform(48, 78), 2)),
            (day(ym, 6), "MINT MOBILE", -30),
            (day(ym, 8), "SPOTIFY STUDENT", -5.99),
            (day(ym, 10), "OPTIMUM INTERNET", -50),
            (day(ym, 12), "ACH DEBIT LEMONADE INC", -12),
            (day(ym, 20), "TRANSFER TO SAVINGS", -250),
        ]
        for d, g in zip((9, 16, 24), split(235, 3, rng)):
            t.append((day(ym, d), rng.choice(["TRADER JOES #612", "PATEL BROTHERS GROCERY", "SQ *HUDSON GREENS"]), -g))
        t.append((day(ym, 13), "CHIPOTLE JERSEY CITY", -round(rng.uniform(11, 16), 2)))
        t.append((day(ym, 18), rng.choice(["TARGET HOBOKEN", "AMAZON MKTPL", "POS 4471 KWIK MART"]), -round(rng.uniform(20, 70), 2)))
        if i % 4 == 2:
            t.append((day(ym, 14), "WISE TRANSFER FROM S PATEL", 300))
    write("priya", 1840, t)


def marcus():
    rng = random.Random(2)
    income = [2650, 3100, 1800, 2400, 3900, 2900, 2200, 1850, 3300, 2750, 2500, 3600, 2100, 3050, 1800, 1800, 3900, 2700]
    spend = [2400, 2700, 1950, 2250, 3300, 2600, 2150, 1990, 2900, 2500, 2350, 3150, 2050, 2700, 1990, 1950, 3300, 2600]
    t = []
    for i, ym in enumerate(MONTHS):
        # About a fifth of his pay is cash tips, deposited at the ATM twice a month.
        cash = round(income[i] * 0.2, 2)
        for d, p in zip((6, 13, 20, 27), split(income[i] - cash, 4, rng)):
            t.append((day(ym, d), rng.choice(["UBER DRIVER WEEKLY PAYOUT", "DOORDASH DASHER PAYOUT"]), p))
        for d, p in zip((10, 24), split(cash, 2, rng)):
            t.append((day(ym, d), "ATM CASH DEPOSIT 0417", p))
        fixed = [
            (day(ym, 1), "ZELLE TO R GOMEZ RENT", -950),
            (day(ym, 18 if i == 6 else 8), "T-MOBILE", -65),
            (day(ym, 22 if i == 11 else 5), "PROGRESSIVE AUTO INS", -168),
            (day(ym, 12), "PSEG UTILITY AUTOPAY", -80),
            (day(ym, 15), "TOYOTA FINANCIAL CAR PMT", -342),
        ]
        t += fixed
        rest = spend[i] - 1605
        for d, a in zip((4, 9, 14, 19, 24, 28), split(rest, 6, rng)):
            t.append((day(ym, d), rng.choice(["SHELL OIL 5741", "SHOPRITE #221", "SHELL OIL 5741", "POPEYES #1192", "SQ *LAUNDROMAT JC"]), -a))
    for d in ("2026-08-10", "2026-09-03", "2026-10-24"):
        t.append((d, "NSF FEE RETURNED ITEM", -35))
    write("marcus", 900, t)


def jordan():
    rng = random.Random(3)
    spend = [5780, 5900, 6020, 5850, 6100, 6000, 5950, 6080, 6150, 6020, 5990, 6110, 6200, 6080, 6150, 6300, 6250, 6180]
    t = []
    for i, ym in enumerate(MONTHS):
        t.append((day(ym, 15), "ACME CORP PAYROLL DIRECT DEP", 2750))
        t.append((day(ym, 31), "ACME CORP PAYROLL DIRECT DEP", 2750))
        fixed = 0
        t.append((day(ym, 9 if i in (13, 15, 17) else 1), "AVALON NEWPORT RENT ACH", -2450)); fixed += 2450
        t.append((day(ym, 12 if i in (14, 16) else 3), "BMW FINANCIAL LEASE", -589)); fixed += 589
        if i not in (15, 17):
            t.append((day(ym, 6), "VERIZON WIRELESS", -85)); fixed += 85
        t.append((day(ym, 15 if i in (12, 13, 14, 16) else 7), "CHASE CARD MIN PMT", -185)); fixed += 185
        if i not in (12, 14, 15, 16, 17):
            t.append((day(ym, 10), "AFFIRM PAY LATER", -212.5)); fixed += 212.5
        t.append((day(ym, 4), "EQUINOX MEMBERSHIP", -260)); fixed += 260
        rest = spend[i] - fixed
        for d, a in zip((2, 5, 8, 11, 13, 17, 19, 21, 23, 25, 27, 29), split(rest, 12, rng)):
            t.append((day(ym, d), rng.choice(["UBER EATS", "AMAZON.COM", "NOBU NYC", "SEPHORA", "TICKETMASTER", "AIRBNB", "THE PRESS LOUNGE", "VENMO PAYMENT"]), -a))
    for d in ("2025-11-02", "2026-02-03", "2026-04-02", "2026-08-02", "2026-08-12", "2026-08-28", "2026-09-02", "2026-09-11", "2026-10-02", "2026-10-13"):
        t.append((d, "OVERDRAFT FEE", -34))
    write("jordan", 2600, t)


priya()
marcus()
jordan()
