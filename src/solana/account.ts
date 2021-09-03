import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { programId } from "./program";
import {
  setPayerAndBlockhashTransaction,
  signAndSendTransaction,
  WalletAdapter,
} from "./wallet";

export async function getMarriageAccountPubkey(
  connection: Connection,
  wallet: WalletAdapter,
  space: number,
  reset: boolean = false
): Promise<PublicKey> {
  if (!wallet.publicKey) {
    throw Error("Wallet has no PublicKey");
  }
  let marriageAccountPubkey: PublicKey | null = null;
  if (!reset) {
    const existingPubkeyStr = localStorage.getItem(
      wallet.publicKey.toBase58() ?? ""
    );
    if (existingPubkeyStr) {
      marriageAccountPubkey = new PublicKey(existingPubkeyStr);
      console.log("Marriage Account not found");
      return marriageAccountPubkey;
    }
  }
  console.log("start creating new Marriage account");
  const MARRIAGE_SEED = "marriage" + Math.random().toString();
  marriageAccountPubkey = await PublicKey.createWithSeed(
    wallet.publicKey,
    MARRIAGE_SEED,
    programId
  );
  console.log("new marriage account pubkey", marriageAccountPubkey.toBase58());
  const lamports = await connection.getMinimumBalanceForRentExemption(space);
  console.log("minimum lamports for rent exemption", lamports);
  const instruction = SystemProgram.createAccountWithSeed({
    fromPubkey: wallet.publicKey,
    basePubkey: wallet.publicKey,
    seed: MARRIAGE_SEED,
    newAccountPubkey: marriageAccountPubkey,
    lamports,
    space,
    programId,
  });
  console.log("instruction", instruction);
  let trans = await setPayerAndBlockhashTransaction(wallet, instruction);
  console.log("setPayerAndBlockhashTransaction", trans);
  let signature = await signAndSendTransaction(wallet, trans);
  console.log("signAndSendTransaction", signature);
  let result = await connection.confirmTransaction(signature, "confirmed");
  console.log("new marraige account created", result);
  localStorage.setItem(
    wallet.publicKey.toBase58(),
    marriageAccountPubkey.toBase58()
  );
  return marriageAccountPubkey;
}
