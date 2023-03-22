"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop = (address, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const publickey = new web3_js_1.PublicKey(address);
    const conn = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
    const signature = yield conn.requestAirdrop(publickey, amount * web3_js_1.LAMPORTS_PER_SOL);
    const latestBlockHash = yield conn.getLatestBlockhash();
    const confirmation = yield conn.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
    });
    console.log(`AirDropped confirmation ${JSON.stringify(confirmation)}`);
    console.log(`AirDropped to ${address}`);
});
exports.airdrop = airdrop;
//airdrop(new PublicKey("DHtE5eFRGqtjyExqW4t9DLPZex7xTXCYW9uyCAdBL4Wr"),1);
//"DjaDrgmphwbQzre9GzPrnCtiJAjkqsErqPujAhQnnQbs"
//# sourceMappingURL=index.js.map