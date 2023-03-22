import { Keypair, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { airdrop } from "../airdrop";
import { showBalance } from "../showbalance";

export const transferSol=async (from:Keypair,to: PublicKey,amount:number)=>{
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


export const calltransfersol=(amt,topublicKey)=>{
    const secret=Uint8Array.from([130,238,16,233,205,159,3,156,232,12,173,232,217,68,209,58,178,159,229,238,17,195,74,129,179,148,20,165,90,191,20,144,182,159,116,249,247,56,150,35,9,182,241,64,188,98,177,237,60,189,23,69,241,252,251,198,49,142,156,245,117,86,176,7]);
    const fromkeyPair=Keypair.fromSecretKey(secret);
   
    
    (async()=>{
        await airdrop(new PublicKey(fromkeyPair.publicKey),1);
        console.log(`Initial balance of from wallet is ${await showBalance(fromkeyPair.publicKey)}`);
        const initbalaTo=await showBalance(topublicKey);
        console.log(`Initial balance of to wallet is ${initbalaTo}`);
        await transferSol(fromkeyPair,topublicKey,amt);
        console.log(`Updated balance of from wallet is ${await showBalance(fromkeyPair.publicKey)}`);
        const updatedbalto=await showBalance(topublicKey);
        console.log(`Updated balance of from wallet is ${updatedbalto}`);
    
    })()
}

const topublicKey=new PublicKey("DjaDrgmphwbQzre9GzPrnCtiJAjkqsErqPujAhQnnQbs");
calltransfersol(3,topublicKey);