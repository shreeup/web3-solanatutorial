import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { airdrop } from "../airdrop";

export const showBalance=async (publickey:PublicKey)=>{
    const conn=new Connection("https://api.devnet.solana.com","confirmed");
    const response=await conn.getAccountInfo(publickey);
    return response.lamports/LAMPORTS_PER_SOL;
}

// (async()=>{
//     const pkey="DjaDrgmphwbQzre9GzPrnCtiJAjkqsErqPujAhQnnQbs";
//     const bal=await showBalance(new PublicKey(pkey))
//     console.log(`The balance for the key ${pkey} is ${bal}`);
//     await airdrop(pkey,3);
//     const updatedbal=await showBalance(new PublicKey(pkey));
//     console.log(`Updated balance is ${updatedbal}`);
// })();
