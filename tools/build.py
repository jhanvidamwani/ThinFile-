"""Build app/index.html from app/src/page.html, app/src/engine.js and data/*.csv."""
import json
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SAMPLES = {
    "priya": {"name": "Priya Patel", "from": "India", "tag": "18 months in the US, never missed rent",
              "dots": ["good"] * 8},
    "marcus": {"name": "Marcus Johnson", "from": "USA", "tag": "Delivery driver, uneven pay",
               "dots": ["good"] * 5 + ["warn", "good", "good"]},
    "jordan": {"name": "Jordan Lee", "from": "USA", "tag": "Big salary, bigger spending",
               "dots": ["good", "good", "good", "bad", "warn", "bad", "warn", "bad"]},
}

for key, s in SAMPLES.items():
    with open(os.path.join(ROOT, "data", f"{key}.csv")) as f:
        s["csv"] = f.read()

with open(os.path.join(ROOT, "app", "src", "page.html")) as f:
    page = f.read()
with open(os.path.join(ROOT, "app", "src", "engine.js")) as f:
    engine = f.read().replace('if (typeof module !== "undefined") module.exports = ThinFile;', "")

page = page.replace("/*ENGINE*/", engine).replace("/*DATA*/", json.dumps(SAMPLES).replace("</", "<\\/"))
with open(os.path.join(ROOT, "app", "index.html"), "w") as f:
    f.write(page)
print("built app/index.html", len(page), "bytes")
