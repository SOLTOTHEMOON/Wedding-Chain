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
import { ArweaveMarriage, arweaveService } from "../arweave/arweave";

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

  /// compute the size of the vector of [Marriage] that will be stored in the solana account
  setMarriageDataSize() {
    const sampleMarriage: Array<Marriage> = this.getDefaultMarriage();

    let length = 0;
    for (let i = 0; i < sampleMarriage.length; i++) {
      length += serialize(MarriageSchema, sampleMarriage[i]).length;
    }
    this.MARRIAGE_SIZE = length + 4;
  }

  constructor() {
    this.setMarriageDataSize();
  }

  /// generate a array of dummy marriage data to compute size
  private getDefaultMarriage(): Array<Marriage> {
    const marriages: Array<Marriage> = [];
    for (let i = 0; i < MARRIAGE_COUNT; i++) {
      marriages.push(new Marriage());
    }

    return marriages;
  }

  /// get marriage history from solana account
  async getAccountMarriageHistory(
    connection: Connection,
    accountKey: string
  ): Promise<Array<Marriage>> {
    const marriageAccountKey = new PublicKey(accountKey);
    const sentAccount = await connection.getAccountInfo(marriageAccountKey);
    
    if (!sentAccount) {
      throw Error(`Account ${accountKey} does not exist`);
    }

    // get and deserialize solana account data and receive txid
    // go to arweave and query using these txid
    // parse json and return ChatMessages
    const archive_id = lo.cstr("archive_id");
    const dataStruct = lo.struct([archive_id, lo.seq(lo.u8(), 2)], "Marriage");
    const ds = lo.seq(dataStruct, MARRIAGE_COUNT);
    const marriages = ds.decode(sentAccount.data);
    return marriages;
  }
  
  async getMarriageSentHistory(
    connection: Connection,
    destPubkeyStr: string
  ): Promise<Array<Marriage>> {
    const marriages = await this.getAccountMarriageHistory(
      connection,
      destPubkeyStr
    );
    console.log("getSentMarriageHistory", marriages);
    return marriages;
  }

  async getMarriageReceivedHistory(
    connection: Connection,
    walletChatPubkeyStr: string
  ): Promise<Array<Marriage>> {
    const marriages = await this.getAccountMarriageHistory(
      connection,
      walletChatPubkeyStr
    );
    console.log("getMarriageReceivedHistory", marriages);
    return marriages;
  }

  /// store the arvweave txid in the solana account 
  async sendMarriage(
    connection: Connection,
    wallet: WalletAdapter,
    destPubkeyStr: string,
    txid: string
  ): Promise<RpcResponseAndContext<SignatureResult>> {
    console.log("start sendMarriage");
    const destPubkey = new PublicKey(destPubkeyStr);

    const marriageObj = new Marriage();
    marriageObj.archive_id = this.getTxIdFromArweave(txid);

    const marriageInstruction = new TransactionInstruction({
      keys: [{ pubkey: destPubkey, isSigner: false, isWritable: true }],
      programId,
      data: Buffer.from(serialize(MarriageSchema, marriageObj)),
    });
    const trans = await setPayerAndBlockhashTransaction(
      wallet,
      marriageInstruction
    );
    const signature = await signAndSendTransaction(wallet, trans);
    const result = await connection.confirmTransaction(signature, "confirmed");
    console.log("end sendMarriage", result);
    return result;
  }

  /// add padding to the txid
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

  /// get arweave data from txid
  async getArweaveMarriages(
    marriages: Array<Marriage>,
  ): Promise<Array<ArweaveMarriage>> {

    marriages.forEach((msg) => {
      msg.archive_id = msg.archive_id.replace("+", "");
      msg.archive_id = msg.archive_id.replace(/[\u0010]/g, "");
    });
    const filteredmarriages = marriages.filter(
      (msg) => msg.archive_id && !this.isAllZero(msg.archive_id)
    );

    console.log("filteredmarriages", filteredmarriages);
    const arweaveData = await arweaveService.getData(filteredmarriages);

    console.log("arweaveData", arweaveData);

    const arweaveMarriages = arweaveData.map((msg) => {
      return new ArweaveMarriage(
        msg.spouse1,
        msg.spouse2,
        msg.status,
        msg.consent,
        msg.created_at,
        msg.updated_at
      );
    });

    console.log("arweaveMarriages", arweaveMarriages);

    return arweaveMarriages;
  }

  isAllZero(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== "0") {
        return false;
      }
    }
    return true;
  }
}
const marriageService = new MarriageService();
export default marriageService;
