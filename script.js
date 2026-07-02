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
