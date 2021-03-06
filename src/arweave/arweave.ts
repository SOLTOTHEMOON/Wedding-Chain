import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import TestWeave from "testweave-sdk";
import { Marriage } from "../solana/marraige";

class ArweaveMarriage {
  spouse1: string | undefined;
  spouse2: string | undefined;
  spouse1Name: string | undefined;
  spouse2Name: string | undefined;
  spouse1pubKey: string | undefined;
  spouse2pubKey: string | undefined;
  status: number | undefined;
  consent: boolean | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;

  constructor(
    spouse1?: string | undefined,
    spouse2?: string | undefined,
    spouse1Name?: string | undefined,
    spouse2Name?: string | undefined,
    spouse1pubKey?: string | undefined,
    spouse2pubKey?: string | undefined,
    status?: number | undefined,
    consent?: boolean | undefined,
    created_at?: string | undefined,
    updated_at?: string | undefined
  ) {
    this.spouse1 = spouse1;
    this.spouse2 = spouse2;
    this.spouse1Name = spouse1Name;
    this.spouse2Name = spouse2Name;
    this.spouse1pubKey = spouse1pubKey;
    this.spouse2pubKey = spouse2pubKey;
    this.status = status;
    this.consent = consent;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

class ArweaveService {
  arweave: Arweave;
  testWeave?: TestWeave;
  walletKey?: JWKInterface;

  constructor() {
    this.arweave = Arweave.init({
      host: "localhost",
      port: 1984,
      protocol: "http",
    });

    TestWeave.init(this.arweave).then((testWeave) => {
      this.testWeave = testWeave;
      this.walletKey = this.testWeave.rootJWK;
    });
  }

  async saveData(arweaveMarriage: ArweaveMarriage): Promise<string> {
    console.log("start saveData");
    const transaction = await this.arweave.createTransaction(
      { data: JSON.stringify(arweaveMarriage) },
      this.walletKey!
    );
    transaction.addTag("Content-Type", "text/plain");
    await this.arweave.transactions.sign(transaction, this.walletKey!);
    await this.arweave.transactions.post(transaction);
    console.log("posted transaction");
    await this.testWeave!.mine(); // need this to force immediate mine of related block
    console.log("forced mine");
    const status = await this.arweave.transactions.getStatus(transaction.id);
    console.log("saveData status", status);
    return transaction.id;
  }

  async getData(marraiges: Array<Marriage>): Promise<Array<ArweaveMarriage>> {
    const arweaveMarriageData: Array<ArweaveMarriage> = [];
    for (let i = 0; i < marraiges.length; i++) {
      try {
        const marraige = marraiges[i];
        console.log("marraige", marraige);
        console.log("marriage archive", marraige.archive_id.length);
        const transaction = await this.arweave.transactions.getData(
          marraige.archive_id,
          { decode: true, string: true }
        );
        console.log("transaction", transaction);
        //@ts-ignore
        const marraigeData: ArweaveMarriage = JSON.parse(transaction);
        console.log("marraigeData", marraigeData);
        arweaveMarriageData.push(marraigeData);
      } catch (err) {
        console.log("getData error", err);
      }
    }

    return arweaveMarriageData;
  }
}

const arweaveService = new ArweaveService();
export { ArweaveMarriage, arweaveService };
