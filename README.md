# Mantle AI Research Studio

> The fastest way to research Mantle Network — powered by Mantle AI Agent Skills, live onchain data, and Claude AI.

**Live demo:** https://nikkibear44.github.io/mantle-research-agent/

**Repo:** https://github.com/nikkibear44/mantle-research-agent

Submitted for the Mantle Research Challenge — Track 2: The Research Agent

---

## What it does

Mantle AI Research Studio is a free research assistant for developers, traders, and builders who need fast, accurate answers about Mantle Network — without digging through scattered documentation.

It combines three layers of intelligence:

**Layer 1 — Mantle AI Agent Skills (instant answers)**
Known Mantle questions are answered instantly from a curated knowledge base grounded in Mantle's official skill files (mantle-network-primer v0.1.18 + mantle-data-indexer v0.1.18). No API call, no hallucination risk, no wait.

**Layer 2 — Claude AI for unknown questions**
Anything outside the local knowledge base gets sent to Claude (claude-sonnet-4-6) via a secure proxy — with live Mantle data injected into context so answers are current, not generic.

**Layer 3 — Live onchain data**
Every session fetches live data automatically:
- MNT price (CoinGecko)
- Mantle TVL (DeFiLlama)
- Top protocol by TVL on Mantle (DeFiLlama)

This data is shown in the live bar at the top and injected into Claude's context so it answers price/TVL questions with real numbers.

---

## Example questions

**Answered instantly from Mantle AI Skills:**
- What token is used for gas on Mantle?
- What is EigenDA and how does Mantle use it?
- How does the sequencer work?
- How do I bridge assets to Mantle?
- How does Mantle compare to Arbitrum or Optimism?
- Generate a GraphQL query for wallet activity
- Generate a SQL query for wallet activity
- How do I deploy a smart contract on Mantle?

**Answered by Claude AI with live data:**
- Where can I trade Mantle? *(returns live price + full CEX/DEX breakdown)*
- Can you track this wallet? 0x...
- What is Fluxion on Mantle?
- What projects are building RWA on Mantle?
- What is ERC-8004?
- What is the best DEX on Mantle right now?
- Is Mantle good for beginners?

---

## Why it's useful

Generic AI chatbots give vague or outdated answers about specific L2s — mixing up chain IDs, gas tokens, or architecture details. This tool is:

- **Accurate** — local answers grounded in verified Mantle skill files
- **Current** — live price and TVL data on every session
- **Open-ended** — Claude handles anything outside the local knowledge base
- **Free** — no login, no wallet, no cost to the user

---

## How I built it

**Step 1 — Research with Mantle AI Skills**
Cloned `mantle-xyz/mantle-skills` and set up a Claude Project using `mantle-network-primer` and `mantle-data-indexer` skill files as project knowledge. Used it to research Mantle's architecture, gas model, data availability layer, and onchain query patterns.

**Step 2 — Build the knowledge base**
Converted the verified skill research into a structured local knowledge base (keyword → verified answer) covering 15+ Mantle topics.

**Step 3 — Build the interface**
Static frontend (HTML/CSS/JS) with a terminal-style chat interface, thinking animation, and clickable example chips.

**Step 4 — Add live data**
Connected CoinGecko and DeFiLlama APIs to fetch live MNT price, Mantle TVL, and top protocols on every page load.

**Step 5 — Add Claude AI fallback**
Set up a Val Town HTTP worker as a secure proxy to the Claude API. Unknown questions fall through from the local KB to Claude, with live data injected into the system prompt.

**Step 6 — Deploy**
Hosted on GitHub Pages (free, static, instant updates on commit).

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, vanilla JavaScript |
| Hosting | GitHub Pages |
| AI proxy | Val Town HTTP worker |
| AI model | Claude Sonnet 4.6 (via Anthropic API) |
| Live price | CoinGecko API |
| Live TVL | DeFiLlama API |
| Research grounding | Mantle AI Agent Skills v0.1.18 |

---

## Roadmap

### ✅ Done
- [x] Local knowledge base grounded in Mantle AI Agent Skills
- [x] Terminal-style chat interface
- [x] Live MNT price from CoinGecko
- [x] Live Mantle TVL from DeFiLlama
- [x] Top protocol tracker
- [x] Claude AI fallback for unknown questions via Val Town proxy
- [x] Deployed on GitHub Pages

### 🔜 Next 
- [ ] Custom domain — move from GitHub Pages to a real domain (e.g. `mantleresearch.xyz`)
- [ ] Expand knowledge base with more topics (staking, governance, ecosystem apps, ERC-8004)
- [ ] Add more Mantle AI Skills (mantle-risk-evaluator, mantle-portfolio-analyst, mantle-defi-operator)
- [ ] Source citations linking directly to official Mantle docs
- [ ] Copy-to-clipboard buttons for GraphQL/SQL code blocks
- [ ] Wallet tracker — paste a wallet address and get a real activity summary

### 🔭 Future 
- [ ] Real wallet activity queries using a live Mantle subgraph endpoint
- [ ] Protocol comparison dashboard (side-by-side TVL, APY, volume)
- [ ] ERC-8004 agent registry lookup — verify agent identity and reputation onchain
- [ ] Multi-language support (for the wider Mantle community)
- [ ] Mobile-optimized version

---

## Resources

- Mantle AI Skills repo: https://github.com/mantle-xyz/mantle-skills
- Agent scaffold docs: https://mantle-xyz.github.io/mantle-agent-scaffold/
- Eval results: https://github.com/mantle-xyz/mantle-skills/blob/main/evals/results/RESULT.md
- Mantle explorer: https://explorer.mantle.xyz
- Mantle bridge: https://bridge.mantle.xyz

---

Built for everyone researching Mantle Network · Open source · Free to use
