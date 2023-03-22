import {Connection, PublicKey,LAMPORTS_PER_SOL} from "@solana/web3.js";
export const airdrop=async (address:PublicKey,amount:number)=>{
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

//airdrop(new PublicKey("DHtE5eFRGqtjyExqW4t9DLPZex7xTXCYW9uyCAdBL4Wr"),1);
 //"DjaDrgmphwbQzre9GzPrnCtiJAjkqsErqPujAhQnnQbs"