import { Connection } from "@solana/web3.js";
import { ArweaveMarriage, arweaveService } from "../arweave/arweave";
import marriageService from "../solana/marraige";
import { WalletAdapter } from "../solana/wallet";

export const makeMarriageTrans = async (
  myAccountKey: string,
  destPubkeyStr: string,
  status: number,
  consent: boolean,
  connection: Connection,
  wallet: WalletAdapter
) => {
  const txid = await arweaveService.saveData(
    new ArweaveMarriage(
      myAccountKey, // spouse1
      destPubkeyStr, // sposue 2
      status,
      consent,
      Date.now().toString(),
      Date.now().toString()
    )
  );
  console.log("saved txid", txid);

  const result = await marriageService.sendMarriage(
    connection,
    wallet,
    myAccountKey,
    txid
  );

  if (status === 0) {
    console.log("Consent Transaction sent successfully", result);
  } else if (status === 1) {
    console.log("Marriage Transaction sent successfully", result);
  }
};

export const getMarriageTimeline = async (
  connection: Connection,
  accountPubKey: string
): Promise<ArweaveMarriage[]> => {
  try {
    const marriages = await marriageService.getMarriageSentHistory(
      connection,
      accountPubKey
    );
    const data = await marriageService.getArweaveMarriages(marriages);

    return data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
