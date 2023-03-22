
const { Keypair, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } = solanaWeb3;
const { Connection, LAMPORTS_PER_SOL, PublicKey } = solanaWeb3;

const transferSol=async (from,to,amount)=>{
    const conn=new Connection("https://api.devnet.solana.com","confirmed");
    const transaction=new Transaction();
    const instruction=SystemProgram.transfer({
        fromPubkey:from.publicKey,
        toPubkey:to,
        lamports:LAMPORTS_PER_SOL*amount
    });

    transaction.add(instruction);
    await sendAndConfirmTransaction(conn,transaction,[
        from
    ]);
    console.log("Done");
}


const airdrop=async (address,amount)=>{
  const publickey=new PublicKey(address);
  const conn=new Connection("https://api.devnet.solana.com","confirmed");
  const signature=await conn.requestAirdrop(publickey,amount*LAMPORTS_PER_SOL)
  const latestBlockHash = await conn.getLatestBlockhash();

  const confirmation=await conn.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: signature,
  });
  console.log(`AirDropped confirmation ${JSON.stringify(confirmation)}` );
  console.log(`AirDropped to ${address}` );
}

const calltransfersol=(amt,topublicKey)=>{
    const secret=Uint8Array.from([130,238,16,233,205,159,3,156,232,12,173,232,217,68,209,58,178,159,229,238,17,195,74,129,179,148,20,165,90,191,20,144,182,159,116,249,247,56,150,35,9,182,241,64,188,98,177,237,60,189,23,69,241,252,251,198,49,142,156,245,117,86,176,7]);
    const fromkeyPair=Keypair.fromSecretKey(secret);
   
    
    (async()=>{
        await airdrop(new PublicKey(fromkeyPair.publicKey),1);
       
        await transferSol(fromkeyPair,topublicKey,amt);
    
    })()
}



async function main() {
    var publicKey = document.getElementById("recipient").value;
    var amt = document.getElementById("amount").value;
    

    //const conn=new Connection("https://api.devnet.solana.com","confirmed");
    debugger;
    let txhash = await calltransfersol(amt,new PublicKey(publicKey));
    console.log(`txhash: ${txhash}`);
  }

  function submitbtn() {
    return new Promise(async(resolve, reject)=> {
          await main();
          console.log('last');
          resolve();    
      });
  }