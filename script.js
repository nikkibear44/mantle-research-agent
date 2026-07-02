// ===============================
// Mantle AI Research Studio v2
// ===============================

const knowledgeBase = [
  {
    keywords: ["gas", "mnt", "token"],
    answer: `
<h2>MNT is the native gas token</h2>

<p>Mantle uses <strong>MNT</strong> instead of ETH to pay gas fees.</p>

<ul>
<li><strong>Gas Token:</strong> MNT</li>
<li><strong>Chain ID:</strong> 5000</li>
<li><strong>RPC:</strong> https://rpc.mantle.xyz</li>
</ul>
`
  },

  {
    keywords: ["chain", "rpc", "5000"],
    answer: `
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
    answer: `
<h2>Inclusion vs Settlement</h2>

<p>
<b>Inclusion</b> means the transaction was accepted by the Mantle sequencer.
<br><br>
<b>Settlement</b> means the batch has been finalized on Ethereum.
</p>
`
  },

  {
    keywords: ["graphql", "wallet"],
    answer: `
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
    answer: `
<h2>Data Availability via EigenDA</h2>

<p>
Mantle uses <strong>EigenDA</strong> as its data availability layer instead of
posting full transaction data directly to Ethereum L1.
</p>

<ul>
<li>Lowers data publishing costs significantly compared to posting to L1</li>
<li>Transaction data is still verifiable and available for fraud proofs</li>
<li>This is a major reason Mantle can offer lower gas fees than many L2s</li>
</ul>
`
  },

  {
    keywords: ["sequencer", "how does mantle work", "architecture"],
    answer: `
<h2>How the Sequencer Works</h2>

<p>
The <strong>sequencer</strong> is responsible for ordering and processing
transactions on Mantle before they are batched and settled on Ethereum.
</p>

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
    answer: `
<h2>Bridging Assets to Mantle</h2>

<p>
Assets move between Ethereum and Mantle through the official Mantle bridge,
which locks assets on L1 and mints/releases the equivalent on Mantle.
</p>

<ul>
<li><strong>Deposits</strong> (L1 → Mantle): Usually fast, minutes</li>
<li><strong>Withdrawals</strong> (Mantle → L1): Subject to a challenge/verification period, similar to other optimistic rollups</li>
<li>Third-party bridges also exist for faster withdrawals, at a small fee</li>
</ul>
`
  },

  {
    keywords: ["vs arbitrum", "vs optimism", "compare", "other l2", "difference"],
    answer: `
<h2>Mantle vs Other L2s</h2>

<p>
Mantle is a modular Layer 2, meaning it separates execution, data availability,
and settlement into distinct layers — unlike monolithic rollups such as Arbitrum
or Optimism, which handle DA and execution together.
</p>

<ul>
<li><strong>Gas Token:</strong> MNT (vs ETH on Arbitrum/Optimism)</li>
<li><strong>Data Availability:</strong> EigenDA (vs posting calldata to Ethereum)</li>
<li><strong>Result:</strong> Lower fees, at the cost of relying on an external DA layer</li>
</ul>
`
  },

  {
    keywords: ["ai skills", "mantle ai", "what are mantle ai skills"],
    answer: `
<h2>What Are Mantle AI Skills</h2>

<p>
Mantle AI Skills are structured knowledge modules that let AI assistants
accurately answer questions about Mantle's architecture, data, and tooling,
instead of relying on generic or outdated web knowledge.
</p>

<ul>
<li>Grounded in official Mantle documentation and data sources</li>
<li>Reduces hallucination on technical details like Chain ID, RPCs, and architecture</li>
<li>This project demonstrates a research workflow built on top of those Skills</li>
</ul>
`
  },

  {
    keywords: ["sql", "sql query", "sql example"],
    answer: `
<h2>Example SQL Query: Wallet Activity</h2>

<p>
A sample query for tracking transaction activity for a given wallet using
a Mantle-indexed dataset:
</p>

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
    answer: `
<h2>Mantle Block Explorer</h2>

<p>
You can inspect transactions, wallets, and contracts on Mantle using the
official explorer.
</p>

<ul>
<li><strong>Explorer:</strong> https://explorer.mantle.xyz</li>
<li>Search by wallet address, transaction hash, or contract address</li>
<li>Useful for verifying deployments and debugging failed transactions</li>
</ul>
`
  },

  {
    keywords: ["fees", "gas fees", "cost", "how much gas"],
    answer: `
<h2>Why Mantle Fees Are Lower</h2>

<p>
Mantle's lower fees mainly come from using EigenDA for data availability
instead of posting full data to Ethereum L1, which is typically the most
expensive part of a rollup's operating cost.
</p>

<ul>
<li>Data availability cost reduced significantly vs posting to L1 calldata</li>
<li>Execution still benefits from L2 batching</li>
<li>Gas paid in MNT, priced independently from ETH gas markets</li>
</ul>
`
  },

  {
    keywords: ["contract", "deploy", "smart contract", "solidity"],
    answer: `
<h2>Deploying Contracts on Mantle</h2>

<p>
Mantle is EVM-equivalent, so existing Solidity contracts and tooling work
with minimal changes.
</p>

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
    answer: `
<h2>Mantle's Security Model</h2>

<p>
Mantle inherits security guarantees from Ethereum through its settlement
layer, while relying on EigenDA (backed by EigenLayer restaking) for data
availability guarantees.
</p>

<ul>
<li>Fraud proofs / settlement finalized on Ethereum L1</li>
<li>Data availability secured by a decentralized restaking network</li>
<li>Sequencer decentralization is an ongoing roadmap item, as with most L2s today</li>
</ul>
`
  }
];

// ===============================

const question = document.getElementById("question");
const response = document.getElementById("response");
const askBtn = document.getElementById("askBtn");
const thinking = document.getElementById("thinking");

// Example chips

document.querySelectorAll(".chip").forEach(chip => {

    chip.addEventListener("click", () => {

        question.value = chip.innerText;

        question.focus();

    });

});

// Run button

askBtn.addEventListener("click", runAI);

// Press Enter

question.addEventListener("keydown", function(e){

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        runAI();

    }

});

// ===============================

function runAI(){

    const text = question.value.trim();

    if(text===""){

        return;

    }

    response.innerHTML="";

    thinking.classList.remove("hidden");

    askBtn.disabled=true;

    askBtn.textContent="Thinking...";

    setTimeout(()=>{

        thinking.classList.add("hidden");

        const answer=findAnswer(text);

        typeAnswer(answer);

        askBtn.disabled=false;

        askBtn.innerHTML="Run Query →";

    },2200);

}

// ===============================

function findAnswer(text){

    const lower=text.toLowerCase();

    for(const item of knowledgeBase){

        if(item.keywords.some(k=>lower.includes(k))){

            return item.answer;

        }

    }

    return `
<h2>No matching article</h2>

<p>
I couldn't find this topic in the local Mantle knowledge base yet.
</p>
`;

}

// ===============================

function typeAnswer(html){

    response.innerHTML="";

    let i=0;

    const speed=12;

    const timer=setInterval(()=>{

        response.innerHTML=html.slice(0,i);

        i++;

        if(i>html.length){

            clearInterval(timer);

        }

    },speed);

}
