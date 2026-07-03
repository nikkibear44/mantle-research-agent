// ===============================
// Mantle AI Research Studio v3
// Local Mantle AI Skills + Live Data + Claude AI
// ===============================

const PROXY_URL = 'https://hizqil--9aee426e760711f196e81607ee4eb77e.web.val.run';

// ===============================
// LIVE DATA
// ===============================

let liveData = { mntPrice: null, tvl: null, topProtocol: null };

async function loadLiveData() {
  try {
    const geckoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=mantle&vs_currencies=usd');
    const gecko = await geckoRes.json();
    if (gecko.mantle) {
      liveData.mntPrice = '$' + gecko.mantle.usd.toFixed(3);
      const el = document.getElementById('mnt-price');
      if (el) el.textContent = liveData.mntPrice;
    }
  } catch(e) { console.log('CoinGecko error', e); }

  try {
    const llamaRes = await fetch('https://api.llama.fi/v2/chains');
    const llama = await llamaRes.json();
    const mantle = llama.find(c => c.name && c.name.toLowerCase() === 'mantle');
    if (mantle) {
      const tvl = mantle.tvl;
      liveData.tvl = tvl >= 1e9 ? '$' + (tvl/1e9).toFixed(2) + 'B' : '$' + (tvl/1e6).toFixed(0) + 'M';
      const el = document.getElementById('mantle-tvl');
      if (el) el.textContent = liveData.tvl;
    }
  } catch(e) { console.log('DeFiLlama error', e); }

  try {
    const protRes = await fetch('https://api.llama.fi/protocols');
    const protocols = await protRes.json();
    const mantleProtos = protocols
      .filter(p => p.chains && p.chains.includes('Mantle'))
      .sort((a, b) => b.tvl - a.tvl);
    if (mantleProtos.length > 0) {
      liveData.topProtocol = mantleProtos[0].name;
      const el = document.getElementById('top-protocol');
      if (el) el.textContent = liveData.topProtocol;
    }
  } catch(e) { console.log('Protocol error', e); }
}

loadLiveData();

// ===============================
// KNOWLEDGE BASE (local, instant)
// ===============================

const knowledgeBase = [
  {
    keywords: ["price", "mnt price", "how much is mnt", "mnt worth", "mnt value"],
    answer: () => `
<h2>MNT Live Price</h2>
<p>Current MNT price (live from CoinGecko): <strong>${liveData.mntPrice || 'loading...'}</strong></p>
<p>MNT is Mantle's native gas token, used to pay transaction fees on the network.</p>
`
  },
  {
    keywords: ["tvl", "total value locked", "how much is locked", "mantle tvl"],
    answer: () => `
<h2>Mantle TVL (Live)</h2>
<p>Current Total Value Locked on Mantle: <strong>${liveData.tvl || 'loading...'}</strong></p>
<p>Source: DeFiLlama — updated in real time.</p>
`
  },
  {
    keywords: ["top protocol", "best protocol", "biggest protocol", "top defi", "largest protocol"],
    answer: () => `
<h2>Top Protocol on Mantle</h2>
<p>The largest protocol by TVL on Mantle right now: <strong>${liveData.topProtocol || 'loading...'}</strong></p>
<p>Source: DeFiLlama — ranked by total value locked.</p>
`
  },
  {
    keywords: ["gas", "mnt", "token"],
    answer: () => `
<h2>MNT is the native gas token</h2>
<p>Mantle uses <strong>MNT</strong> instead of ETH to pay gas fees.</p>
<ul>
<li><strong>Gas Token:</strong> MNT</li>
<li><strong>Current Price:</strong> ${liveData.mntPrice || 'loading...'}</li>
<li><strong>Chain ID:</strong> 5000</li>
<li><strong>RPC:</strong> https://rpc.mantle.xyz</li>
</ul>
`
  },
  {
    keywords: ["chain", "rpc", "5000"],
    answer: () => `
<h2>Mantle Mainnet</h2>
<ul>
<li><strong>Chain ID:</strong> 5000</li>
<li><strong>RPC:</strong> https://rpc.mantle.xyz</li>
<li><strong>Explorer:</strong> https://explorer.mantle.xyz</li>
</ul>
`
  },
  {
    keywords: ["settlement", "inclusion"],
    answer: () => `
<h2>Inclusion vs Settlement</h2>
<p><b>Inclusion</b> means the transaction was accepted by the Mantle sequencer.<br><br>
<b>Settlement</b> means the batch has been finalized on Ethereum.</p>
`
  },
  {
    keywords: ["graphql query", "show graphql", "example graphql"],
    answer: () => `
<h2>Example GraphQL Query</h2>
<pre>{
  transactions(
    where:{
      wallet:"0xADDRESS"
    }
  )
}</pre>
`
  },
  {
    keywords: ["eigenda", "data availability", "da layer"],
    answer: () => `
<h2>Data Availability via EigenDA</h2>
<p>Mantle uses <strong>EigenDA</strong> as its data availability layer instead of posting full transaction data directly to Ethereum L1.</p>
<ul>
<li>Lowers data publishing costs significantly</li>
<li>Transaction data is still verifiable and available for fraud proofs</li>
<li>Major reason Mantle can offer lower gas fees than many L2s</li>
</ul>
`
  },
  {
    keywords: ["sequencer", "how does mantle work", "architecture"],
    answer: () => `
<h2>How the Sequencer Works</h2>
<p>The <strong>sequencer</strong> orders and processes transactions on Mantle before they are batched and settled on Ethereum.</p>
<ul>
<li>Receives transactions from users</li>
<li>Orders and executes them off-chain (fast, low cost)</li>
<li>Batches results and posts data via EigenDA</li>
<li>Settlement is finalized back on Ethereum L1</li>
</ul>
`
  },
  {
    keywords: ["bridge", "bridging", "deposit", "withdraw"],
    answer: () => `
<h2>Bridging Assets to Mantle</h2>
<p>Assets move between Ethereum and Mantle through the official Mantle bridge.</p>
<ul>
<li><strong>Deposits</strong> (L1 → Mantle): Usually fast, minutes</li>
<li><strong>Withdrawals</strong> (Mantle → L1): Subject to a challenge/verification period</li>
<li>Third-party bridges also exist for faster withdrawals</li>
</ul>
`
  },
  {
    keywords: ["vs arbitrum", "vs optimism", "compare", "other l2", "difference"],
    answer: () => `
<h2>Mantle vs Other L2s</h2>
<p>Mantle is a modular Layer 2 — separates execution, data availability, and settlement.</p>
<ul>
<li><strong>Gas Token:</strong> MNT (vs ETH on Arbitrum/Optimism)</li>
<li><strong>Data Availability:</strong> EigenDA (vs posting calldata to Ethereum)</li>
<li><strong>Current TVL:</strong> ${liveData.tvl || 'loading...'}</li>
<li><strong>Result:</strong> Lower fees, modular architecture</li>
</ul>
`
  },
  {
    keywords: ["ai skills", "mantle ai", "what are mantle ai skills"],
    answer: () => `
<h2>What Are Mantle AI Skills</h2>
<p>Mantle AI Skills are structured knowledge modules that let AI assistants accurately answer questions about Mantle's architecture, data, and tooling.</p>
<ul>
<li>Grounded in official Mantle documentation and data sources</li>
<li>Reduces hallucination on technical details like Chain ID, RPCs, and architecture</li>
<li>This project demonstrates a research workflow built on top of those Skills</li>
</ul>
`
  },
  {
    keywords: ["sql", "sql query", "sql example"],
    answer: () => `
<h2>Example SQL Query: Wallet Activity</h2>
<pre>SELECT
  tx_hash,
  block_number,
  from_address,
  to_address,
  value,
  timestamp
FROM mantle_transactions
WHERE from_address = '0xADDRESS'
   OR to_address = '0xADDRESS'
ORDER BY timestamp DESC
LIMIT 50;</pre>
`
  },
  {
    keywords: ["explorer", "block explorer", "check transaction"],
    answer: () => `
<h2>Mantle Block Explorer</h2>
<ul>
<li><strong>Explorer:</strong> https://explorer.mantle.xyz</li>
<li>Search by wallet address, transaction hash, or contract address</li>
<li>Useful for verifying deployments and debugging failed transactions</li>
</ul>
`
  },
  {
    keywords: ["fees", "gas fees", "cost", "how much gas"],
    answer: () => `
<h2>Why Mantle Fees Are Lower</h2>
<p>Mantle's lower fees come from using EigenDA for data availability instead of posting full data to Ethereum L1.</p>
<ul>
<li>Data availability cost reduced significantly vs posting to L1 calldata</li>
<li>Execution still benefits from L2 batching</li>
<li>Gas paid in MNT, priced independently from ETH gas markets</li>
</ul>
`
  },
  {
    keywords: ["contract", "deploy", "smart contract", "solidity"],
    answer: () => `
<h2>Deploying Contracts on Mantle</h2>
<p>Mantle is EVM-equivalent, so existing Solidity contracts and tooling work with minimal changes.</p>
<ul>
<li>Use Hardhat, Foundry, or Remix as normal</li>
<li>Point your RPC to <strong>https://rpc.mantle.xyz</strong></li>
<li>Set Chain ID to <strong>5000</strong> in your network config</li>
<li>Fund your deployer wallet with MNT for gas</li>
</ul>
`
  },
  {
    keywords: ["security", "is mantle secure", "trust"],
    answer: () => `
<h2>Mantle's Security Model</h2>
<p>Mantle inherits security guarantees from Ethereum through its settlement layer.</p>
<ul>
<li>Fraud proofs / settlement finalized on Ethereum L1</li>
<li>Data availability secured by EigenDA (backed by EigenLayer restaking)</li>
<li>Sequencer decentralization is an ongoing roadmap item</li>
</ul>
`
  }
];

// ===============================
// UI ELEMENTS
// ===============================

const question = document.getElementById("question");
const response = document.getElementById("response");
const askBtn = document.getElementById("askBtn");
const thinking = document.getElementById("thinking");

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    question.value = chip.innerText;
    question.focus();
  });
});

askBtn.addEventListener("click", runAI);

question.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    runAI();
  }
});

// ===============================
// MAIN FUNCTION
// ===============================

async function runAI() {
  const text = question.value.trim();
  if (text === "") return;

  response.innerHTML = "";
  thinking.classList.remove("hidden");
  askBtn.disabled = true;
  askBtn.textContent = "Thinking...";

  // Step 1: check local knowledge base first
  const localAnswer = findAnswer(text);

  if (localAnswer) {
    // found in local KB — answer instantly
    setTimeout(() => {
      thinking.classList.add("hidden");
      typeAnswer(localAnswer);
      askBtn.disabled = false;
      askBtn.innerHTML = "Run Query →";
    }, 2200);
  } else {
    // not found — call Claude API via Val Town
    try {
      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are a Mantle Network research agent grounded in Mantle's official AI Agent Skills (mantle-network-primer v0.1.18 and mantle-data-indexer v0.1.18).

LIVE DATA (fetched this session):
- MNT Price: ${liveData.mntPrice || 'unavailable'}
- Mantle TVL: ${liveData.tvl || 'unavailable'}
- Top Protocol by TVL: ${liveData.topProtocol || 'unavailable'}

Key facts:
- Chain ID: 5000, RPC: https://rpc.mantle.xyz
- Gas token: MNT (not ETH)
- DA layer: EigenDA
- Inclusion = sequencer accepts tx. Settlement = finalized on Ethereum L1.
- Never fabricate contract addresses or endpoint URLs.
- Be specific, accurate, and use the live data above when relevant.`,
          messages: [{ role: 'user', content: text }]
        })
      });

      const data = await res.json();
      thinking.classList.add("hidden");

      if (data.error) {
        response.innerHTML = '<p style="color:#f06060">Error: ' + data.error.message + '</p>';
      } else {
        const answer = data.content.map(b => b.text || '').join('');
        typeAnswer(formatClaudeResponse(answer));
      }
    } catch(err) {
      thinking.classList.add("hidden");
      response.innerHTML = '<p style="color:#f06060">Request failed: ' + err.message + '</p>';
    }

    askBtn.disabled = false;
    askBtn.innerHTML = "Run Query →";
  }
}

// ===============================
// FIND IN LOCAL KB
// ===============================

function findAnswer(text) {
  const lower = text.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.keywords.some(k => lower.includes(k))) {
      return typeof item.answer === 'function' ? item.answer() : item.answer;
    }
  }
  return null; // not found — will fall through to Claude
}

// ===============================
// FORMAT + TYPE
// ===============================

function formatClaudeResponse(t) {
  t = t.replace(/```(\w+)?\n([\s\S]*?)```/g, function(_, l, c) {
    return '<pre>' + esc(c.trim()) + '</pre>';
  });
  t = t.replace(/`([^`]+)`/g, function(_, c) { return '<code>' + esc(c) + '</code>'; });
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\n/g, '<br>');
  return t;
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function typeAnswer(html) {
  response.innerHTML = "";
  let i = 0;
  const speed = 12;
  const timer = setInterval(() => {
    response.innerHTML = html.slice(0, i);
    i++;
    if (i > html.length) clearInterval(timer);
  }, speed);
}
