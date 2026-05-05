---
title: "Mountaineering Preparation Assistant"
summary: "A conversational AI assistant for technical mountaineering preparation — route research, conditions, weather, and avalanche forecasts, grounded in real data sources."
tags: ["python", "AI", "LLM", "RAG", "mountaineering", "active"]
status: "active"
category: "personal"
order: 3
---

Technical mountaineering involves a lot of online preparation work: finding good routes, checking hut availability, reading conditions reports, cross-referencing topos from multiple sources. A bare LLM isn't capable of this — it has no access to the relevant information, and high-level mountaineering knowledge is largely tacit and rarely written down in a form that ends up in training data.

This app is a conversational assistant built on Claude (via the Anthropic API), empowered by a set of tools that give it structured access to the information that actually matters.

[View on GitHub →](https://github.com/Tom-Q/mountaineering_reco)

## Why an LLM isn't enough on its own

Even with tool access, the LLM needs to be constrained in what judgments it makes. The failure modes of LLMs on mountaineering questions are predictable:

- They treat nominal grades as ground truth. An AD in poor late-season shape can be more committing than a TD in perfect conditions. A 150m route graded TD+ due to one 6b move is incomparable to 1000m of sustained difficulties at AD where the hardest move is 4.
- They can't read between the lines of conditions reports.
- They don't know what they don't know — and in an alpine context, confident-sounding wrong advice has real consequences.

## Tools

- **Camptocamp** — route search by name or geographic area, full route details (description, approach, required gear, grades, images), trip report lists and full text, via API
- **Avalanche forecasts** — Météo-France BRA for French massifs; EAWS CAAMLv6 feeds for Switzerland, Italy, and Austria, via public API
- **Weather** — Open-Meteo: 7-day forecast, recent snowfall history, seasonal snow accumulation, re-freeze altitude; calibrated to snow-season windows per mountain range
- **RAG on route databases** — SummitPost (~2,300 mountaineering routes worldwide), SAC (Swiss Alpine Club, 800 routes); semantic search with geographic filtering via ChromaDB and a multilingual sentence-transformer model
- **Domain knowledge** — mountain range bounding boxes, French massif polygons, grade system encodings (French rock, UIAA, WI, M-grades, alpine commitment), snow season windows per range

## Stack

- **App:** Python, [Streamlit](https://streamlit.io)
- **LLM:** Claude via Anthropic API (Sonnet for chat)
- **Route data:** Camptocamp API; SummitPost and SAC (scraped, stored in SQLite)
- **RAG:** [ChromaDB](https://www.trychroma.com) + [sentence-transformers](https://www.sbert.net) (`paraphrase-multilingual-mpnet-base-v2`)
- **Weather:** [Open-Meteo](https://open-meteo.com)
- **Avalanche:** Météo-France BRA, EAWS CAAMLv6

## Status

Active development. The core loop — conversational route research with live weather and avalanche data — is working. Ongoing and planned work includes:

- Mountain hut info tool (capacity, booking, opening season, warden availability)
- Expanded route database coverage
- Better prompt engineering and grade reasoning
- Key-protected deployment on this site via FastAPI
