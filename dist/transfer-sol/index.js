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
exports.calltransfersol = exports.transferSol = void 0;
const web3_js_1 = require("@solana/web3.js");
const web3_js_2 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const showbalance_1 = require("../showbalance");
const transferSol = (from, to, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = new web3_js_2.Connection("https://api.devnet.solana.com", "confirmed");
    const transaction = new web3_js_1.Transaction();
    const instruction = web3_js_1.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: web3_js_2.LAMPORTS_PER_SOL * amount
    });
    transaction.add(instruction);
    yield (0, web3_js_1.sendAndConfirmTransaction)(conn, transaction, [
        from
    ]);
    console.log("Done");
});
exports.transferSol = transferSol;
const calltransfersol = (amt, topublicKey) => {
    const secret = Uint8Array.from([130, 238, 16, 233, 205, 159, 3, 156, 232, 12, 173, 232, 217, 68, 209, 58, 178, 159, 229, 238, 17, 195, 74, 129, 179, 148, 20, 165, 90, 191, 20, 144, 182, 159, 116, 249, 247, 56, 150, 35, 9, 182, 241, 64, 188, 98, 177, 237, 60, 189, 23, 69, 241, 252, 251, 198, 49, 142, 156, 245, 117, 86, 176, 7]);
    const fromkeyPair = web3_js_1.Keypair.fromSecretKey(secret);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, airdrop_1.airdrop)(new web3_js_2.PublicKey(fromkeyPair.publicKey), 1);
        console.log(`Initial balance of from wallet is ${yield (0, showbalance_1.showBalance)(fromkeyPair.publicKey)}`);
        const initbalaTo = yield (0, showbalance_1.showBalance)(topublicKey);
        console.log(`Initial balance of to wallet is ${initbalaTo}`);
        yield (0, exports.transferSol)(fromkeyPair, topublicKey, amt);
        console.log(`Updated balance of from wallet is ${yield (0, showbalance_1.showBalance)(fromkeyPair.publicKey)}`);
        const updatedbalto = yield (0, showbalance_1.showBalance)(topublicKey);
        console.log(`Updated balance of from wallet is ${updatedbalto}`);
    }))();
};
exports.calltransfersol = calltransfersol;
const topublicKey = new web3_js_2.PublicKey("DjaDrgmphwbQzre9GzPrnCtiJAjkqsErqPujAhQnnQbs");
(0, exports.calltransfersol)(3, topublicKey);
//# sourceMappingURL=index.js.map