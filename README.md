# Mantle AI Research Studio

Live demo: https://nikkibear44.github.io/mantle-research-agent/

Repo: https://github.com/nikkibear44/mantle-research-agent

Submitted for the Mantle Research Challenge — Track 2: The Research Agent

---

## What it does

Mantle AI Research Studio is a research assistant for developers, traders, and builders who need fast, accurate answers about Mantle Network — without digging through scattered documentation.

It combines three layers of intelligence:

**1. Mantle AI Agent Skills (local knowledge base)**
Instant answers to known Mantle questions, grounded in Mantle's official skill files (mantle-network-primer v0.1.18 + mantle-data-indexer v0.1.18). No API call needed, no hallucination risk.

**2. Claude AI via secure proxy (unknown questions)**
For anything outside the local knowledge base, the agent sends the question to Claude (claude-sonnet-4-6) via a secure Val Town proxy — with live Mantle data injected into the context so answers are current, not just generic.

**3. Live onchain data (CoinGecko + DeFiLlama)**
Every page load fetches:
- MNT price (live, CoinGecko)
- Mantle TVL (live, DeFiLlama)
- Top protocol by TVL on Mantle (live, DeFiLlama)

This live data is shown in the header bar and injected into Claude's context so it can answer questions like "what's Mantle's TVL right now?" with real numbers.

---

## Example questions it can answer

**From local knowledge base (instant):**
- What token is used for gas on Mantle?
- What is EigenDA and how does Mantle use it?
- How does the sequencer work?
- How do I bridge assets to Mantle?
- How does Mantle compare to Arbitrum or Optimism?
- Generate a GraphQL query for wallet activity
- How do I deploy a smart contract on Mantle?

**From Claude AI (live, open-ended):**
- Where can I trade Mantle? *(returns live price + CEX/DEX breakdown)*
- Can you track this wallet? 0x...
- What is Fluxion on Mantle?
- What projects are building RWA on Mantle?
- What is ERC-8004?
- What is the best DEX on Mantle right now?

---

## Why it's useful

Generic AI chatbots often give vague or outdated answers about specific L2s like Mantle — mixing up chain IDs, gas tokens, or architecture details. This tool is:

- **Accurate** — local answers come from verified Mantle skill files, not general web knowledge
- **Current** — live price and TVL data injected on every session
- **Open-ended** — Claude handles anything the local KB doesn't cover
- **Free to use** — no login, no wallet, no cost to the user

---

## How I built it

**Research phase:**
Used a Claude Project configured with Mantle's official AI Agent Skills (cloned from `https://github.com/mantle-xyz/mantle-skills`) to research Mantle's architecture. The Skills grounded the research in Mantle's actual documentation rather than general web knowledge.

**Build phase:**
- Curated a local knowledge base from the skill research (keyword → verified answer)
- Built a static frontend (HTML/CSS/JS) with a terminal-style chat interface
- Added live data fetching from CoinGecko and DeFiLlama
- Set up a Val Town HTTP worker as a secure proxy to the Claude API (keeps API key server-side, not exposed in client JS)
- Deployed on GitHub Pages

**Architecture decision — why two layers:**
Known questions get instant local answers (fast, reliable, no API cost). Unknown questions fall through to Claude with live data context (intelligent, open-ended). This means the agent is both fast for common queries and smart for edge cases.

---

## Tech stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Hosting:** GitHub Pages
- **AI proxy:** Val Town HTTP worker (secure Claude API relay)
- **Live data:** CoinGecko API (MNT price), DeFiLlama API (TVL, protocols)
- **Research grounding:** Claude Project + Mantle AI Agent Skills v0.1.18
- **AI model:** claude-sonnet-4-6

---

## Live example

Visit the live site and try:
1. Click any example chip — instant answer from local skills
2. Type "where can I trade Mantle?" — Claude answers with live price data
3. Type "what is Fluxion on Mantle?" — Claude answers with ecosystem context

👉 https://nikkibear44.github.io/mantle-research-agent/

---

## Resources

- Mantle AI Skills repo: https://github.com/mantle-xyz/mantle-skills
- Agent scaffold docs: https://mantle-xyz.github.io/mantle-agent-scaffold/
- Eval results: https://github.com/mantle-xyz/mantle-skills/blob/main/evals/results/RESULT.md

---

Built for everyone researching Mantle Network · Open source · Free to use
