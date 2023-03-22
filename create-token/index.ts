// import {createMint,TOKEN_PROGRAM_ID} from "@solana/spl-token";
// import { Keypair, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// const createMinter=async (mintWallet)=>{
//     const conn=new Connection("https://api.devnet.solana.com","confirmed");
//     const creatorToken= await createMint(conn,mintWallet,mintWallet.publicKey,null,8,null,null,TOKEN_PROGRAM_ID);
//     return new PublicKey(creatorToken);
// }

// const transferToken=async(tokenAddress:PublicKey,mintWallet:Keypair,receiver:PublicKey)=>{
//     const conn=new Connection("https://api.devnet.solana.com","confirmed");
//     const creatorToken= new Token()
// }