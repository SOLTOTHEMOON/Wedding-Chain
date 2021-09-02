import {
  setPayerAndBlockhashTransaction,
  signAndSendTransaction,
  WalletAdapter,
} from "./wallet";
import { serialize } from "borsh";
// @ts-ignore
import lo from "buffer-layout";
import {
  Connection,
  PublicKey,
  RpcResponseAndContext,
  SignatureResult,
  TransactionInstruction,
} from "@solana/web3.js";
import { programId } from "./program";

const MARRIAGE_COUNT = 20;
export const DUMMY_TX_ID = "0000000000000000000000000000000000000000000";
export const DUMMY_CREATED_ON = "0000000000000000";
export class Marriage {
  archive_id: string = DUMMY_TX_ID;
  constructor(fields: { archive_id: string } | undefined = undefined) {
    if (fields) {
      this.archive_id = fields.archive_id;
    }
  }
}

const MarriageSchema = new Map([
  [
    Marriage,
    {
      kind: "struct",
      fields: [["archive_id", "String"]],
    },
  ],
]);

class MarriageService {
    MARRIAGE_SIZE: number = 0;
  setMarriageDataSize() {
    const sampleMarriage: Array<Marriage> =
      this.getDefaultMarriage();

    let length = 0;
    for (let i = 0; i < sampleMarriage.length; i++) {
      length += serialize(MarriageSchema, sampleMarriage[i]).length;
    }
    this.MARRIAGE_SIZE = length + 4;
  }

  constructor() {
    this.setMarriageDataSize();
  }

  private getDefaultMarriage(): Array<Marriage> {
    const marriages: Array<Marriage> = [];
    for (let i = 0; i < MARRIAGE_COUNT; i++) {
      marriages.push(new Marriage());
    }

    return marriages;
  }

  async getAccountMarriageHistory(
    connection: Connection,
    pubKeyStr: string
  ): Promise<Array<Marriage>> {
    const sentPubkey = new PublicKey(pubKeyStr);
    const sentAccount = await connection.getAccountInfo(sentPubkey);
    // get and deserialize solana account data and receive txid
    // go to arweave and query using these txid
    // parse json and return ChatMessages
    if (!sentAccount) {
      throw Error(`Account ${pubKeyStr} does not exist`);
    }
    const archive_id = lo.cstr("archive_id");
    const dataStruct = lo.struct(
      [archive_id, lo.seq(lo.u8(), 2)],
      "Marriage"
    );
    const ds = lo.seq(dataStruct, MARRIAGE_COUNT);
    const messages = ds.decode(sentAccount.data);
    return messages;
  }

  async getMarriageHistory(
    connection: Connection,
    sentChatPubkeyStr: string
  ): Promise<Array<Marriage>> {
    const messages = await this.getAccountMarriageHistory(
      connection,
      sentChatPubkeyStr
    );
    console.log("getMarriageHistory", messages);
    return messages;
  }

  async getMarriageReceivedHistory(
    connection: Connection,
    walletChatPubkeyStr: string
  ): Promise<Array<Marriage>> {
    const messages = await this.getAccountMarriageHistory(
      connection,
      walletChatPubkeyStr
    );
    console.log("getMarriageReceivedHistory", messages);
    return messages;
  }

  async sendMarriage(
    connection: Connection,
    wallet: WalletAdapter,
    destPubkeyStr: string,
    txid: string
  ): Promise<RpcResponseAndContext<SignatureResult>> {
    console.log("start sendMarriage");
    const destPubkey = new PublicKey(destPubkeyStr);

    const messageObj = new Marriage();
    messageObj.archive_id = this.getTxIdFromArweave(txid);

    const messageInstruction = new TransactionInstruction({
      keys: [{ pubkey: destPubkey, isSigner: false, isWritable: true }],
      programId,
      data: Buffer.from(serialize(MarriageSchema, messageObj)),
    });
    const trans = await setPayerAndBlockhashTransaction(
      wallet,
      messageInstruction
    );
    const signature = await signAndSendTransaction(wallet, trans);
    const result = await connection.confirmTransaction(
      signature,
      "singleGossip"
    );
    console.log("end sendMessage", result);
    return result;
  }

  private getTxIdFromArweave(newTxId: string): string {
    // save message to arweave and get back txid;
    let txid = "";
    const dummyLength = DUMMY_TX_ID.length - newTxId.length;
    for (let i = 0; i < dummyLength; i++) {
      txid += "0";
    }
    txid += newTxId;
    console.log("getTxIdFromArweave", txid);
    return txid;
  }

  // get value and add dummy values
  private getCreatedOn(): string {
    const now = Date.now().toString();
    console.log("now", now);
    const total = DUMMY_CREATED_ON.length;
    const diff = total - now.length;
    let prefix = "";
    for (let i = 0; i < diff; i++) {
      prefix += "0";
    }
    const created_on = prefix + now;
    console.log("created_on", created_on);
    return created_on;
  }
}

const marriageServiceService = new MarriageService();
export default marriageServiceService;
