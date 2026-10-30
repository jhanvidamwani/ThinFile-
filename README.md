# ThinFile

### Don't build credit. Prove it.

ThinFile turns your bank history into **proof you pay on time**, which you can share with any lender or landlord as a link. It's built for people with no credit score: new immigrants, international students, gig workers.

Built at the **Lyzr × Plug and Play AI Builders Speed Dating hackathon**, Jersey City, Oct 29, 2026.

**Team:** Jhanvi Damwani (fintech) · Mehek Malhotra (UX research)

## What makes it different

1. **Proof, not a score:** you already have a track record. ThinFile shows it.
2. **Fair by design:** it never sees your name or background. Proven live: 5 names, same result.
3. **"Not yet" instead of "no":** if you're not ready, it tells you the one thing to fix.

## How it works

Five AI helpers, each with one job:

| Helper | Job |
| --- | --- |
| 🛡️ Privacy Guard | Hides name, address and country first |
| 🗂️ Sorter | Labels every payment: rent, bill, income, spending |
| ✅ Checker | Counts on-time payments and overdrafts |
| 🧮 Calculator | Fixed score in code, not AI. Same history, same score |
| 🧭 Coach | Finds the one easiest fix |

The result is a **Reliability Report** with the **Reliability Wall**: one green dot for every on-time payment.

## Repo contents

| File | What it is |
| --- | --- |
| [ThinFile-Final.md](ThinFile-Final.md) | Final plan: app, demo script, pitch, judge Q&A |
| [ThinFile-Architect-Prompt.md](ThinFile-Architect-Prompt.md) | The prompt used to build the app in Lyzr Architect |
| [docs/ThinFile-Simple.md](docs/ThinFile-Simple.md) | Plain-language overview for any reader |
| [docs/Positioning-and-Competitive-Landscape.md](docs/Positioning-and-Competitive-Landscape.md) | Competitors, positioning, Nova Credit partnership |
| [docs/ThinFile-Playbook.md](docs/ThinFile-Playbook.md) | Earlier, more detailed playbook (archived) |
| [app/](app/) | The web app. Edit `app/src/`, then run `python3 tools/build.py` to rebuild `app/index.html` |
| [data/](data/) | 18 months of sample bank transactions for Priya, Marcus and Jordan (`python3 tools/gen_data.py` regenerates them) |

## Live demo

**Live app:** https://claude.ai/artifact/PzrjH43Egeh6CbNMYbuexf (source in [app/index.html](app/index.html))

> Demo with sample data. Not a credit decision.
