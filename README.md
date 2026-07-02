Mantle AI Research Studio

Live demo: https://nikkibear44.github.io/mantle-research-agent/

Repo: https://github.com/nikkibear44/mantle-research-agent

Submitted for the Mantle Research Challenge — Track 2: The Research Agent


What it does

Mantle AI Research Studio is a research assistant for developers, traders, and builders who need fast, accurate answers about Mantle Network — without digging through scattered documentation.

Ask it things like:


What token is used for gas on Mantle, and why?
What is EigenDA and how does Mantle use it for data availability?
How does the sequencer work?
How do I bridge assets to Mantle?
How does Mantle compare to Arbitrum or Optimism?
Generate a GraphQL query for wallet activity
Generate a SQL query for wallet activity
How do I deploy a smart contract on Mantle?


The interface mimics a modern AI chat experience — a "thinking" state followed by a typed-out answer — but the underlying knowledge is a curated, verified knowledge base rather than a live LLM call. That was a deliberate architecture decision, explained below.

Why it's useful

Generic AI chatbots often give vague or outdated answers about specific L2s like Mantle — mixing up chain IDs, gas tokens, or architecture details from other rollups. This tool is scoped narrowly and grounded specifically in verified Mantle facts, so the answers are accurate every time, not just plausible-sounding.

It's built for the moment a developer or researcher needs a quick, reliable answer instead of searching multiple doc pages.

How I built it


Research phase: I used a Claude Project configured with Mantle's AI Agent Skills to research Mantle's architecture — gas token (MNT), Chain ID (5000), EigenDA for data availability, the sequencer/settlement flow, bridging, and common developer query patterns (GraphQL/SQL). The Skills grounded the research in Mantle's actual documentation rather than general web knowledge, which reduced the risk of inaccurate or hallucinated details.
Curation phase: I converted the verified research into a structured knowledge base — a set of question-keyword-answer entries covering the topics above.
Interface phase: I built a static frontend (HTML/CSS/JS) hosted on GitHub Pages that presents this knowledge base as an interactive research assistant, complete with a chat-style conversation view, a "thinking" animation, and clickable example questions.


Why no live API call?

An earlier version of this project attempted to call the Anthropic API directly from the browser. That approach doesn't work for a public static site for two reasons:


Security: An API key embedded in client-side JavaScript is visible to anyone who opens developer tools, and can be copied and misused.
Reliability: A public demo that depends on a live paid API is vulnerable to rate limits, cost overruns from spam/abuse, or outages — all things that could make the demo fail during judging.


Instead, I chose to ship a curated, reliable demo now, with the answers grounded in real Mantle AI Skills research, and designed the frontend so it can be pointed at a live backend (e.g. a Cloudflare Worker proxying the Claude API, keeping the key server-side) in a future iteration without changing the UI.

Tech stack


Frontend: HTML, CSS, vanilla JavaScript
Hosting: GitHub Pages (free, static)
Research: Claude Project + Mantle AI Agent Skills
Planned next step: Cloudflare Worker as a secure backend proxy to Claude API, for open-ended live Q&A beyond the curated set


Live example

Visit the live site, click any of the 12 example questions (or type your own using similar keywords), and watch the assistant "think" and respond:

👉 https://nikkibear44.github.io/mantle-research-agent/

Roadmap


 Cloudflare Worker backend for live, open-ended Q&A
 Expand knowledge base with more Mantle topics (staking, governance, ecosystem apps)
 Source citations linking directly to official Mantle docs
 Copy-to-clipboard buttons for GraphQL/SQL code blocks

Other Resource

Mantle skills docs: https://github.com/mantle-xyz/mantle-skills
scaffold and docs: https://mantle-xyz.github.io/mantle-agent-scaffold/

Built for the Mantle AI Skills Bounty.
