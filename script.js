const knowledgeBase = [
{
keywords:["gas","mnt","token"],
answer:`
<h2>MNT is the native gas token</h2>

<p>
Mantle is different from most Ethereum Layer 2 networks because it uses
<strong>MNT</strong> instead of ETH to pay gas fees.
</p>

<ul>
<li>Gas Token: <strong>MNT</strong></li>
<li>Chain ID: <strong>5000</strong></li>
<li>RPC: https://rpc.mantle.xyz</li>
</ul>
`
},

{
keywords:["chain","rpc","5000"],
answer:`
<h2>Mantle Mainnet</h2>

<ul>
<li>Chain ID: <strong>5000</strong></li>
<li>RPC: https://rpc.mantle.xyz</li>
<li>Explorer: https://explorer.mantle.xyz</li>
</ul>
`
},

{
keywords:["settlement","inclusion"],
answer:`
<h2>Inclusion vs Settlement</h2>

<p>
<b>Inclusion</b> means your transaction has been accepted by the Mantle sequencer.

<br><br>

<b>Settlement</b> means the batch has been finalized on Ethereum L1,
providing Ethereum-level security.
</p>
`
},

{
keywords:["graphql","wallet"],
answer:`
<h2>Example GraphQL Query</h2>

<pre>
{
 transactions(
   where:{
      wallet:"0xADDRESS"
   }
 )
}
</pre>
`
}
];

const question = document.getElementById("question");
const response = document.getElementById("response");
const askBtn = document.getElementById("askBtn");

askBtn.onclick = searchKnowledge;

document.querySelectorAll(".chip").forEach(chip=>{

chip.onclick=()=>{

question.value=chip.innerText;

searchKnowledge();

};

});

function searchKnowledge(){

const text=question.value.toLowerCase();

for(const item of knowledgeBase){

if(item.keywords.some(word=>text.includes(word))){

response.innerHTML=item.answer;

return;

}

}

response.innerHTML=`
<h2>No matching article</h2>

<p>
This topic hasn't been added yet.

We'll add more Mantle knowledge in the next step.
</p>
`;

}
