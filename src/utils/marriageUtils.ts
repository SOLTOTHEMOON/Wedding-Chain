import { Connection } from "@solana/web3.js";
import { ArweaveMarriage, arweaveService } from "../arweave/arweave";
import marriageService from "../solana/marraige";
import { WalletAdapter } from "../solana/wallet";
import { AccountDetails } from "./accountContext";
export const makeMarriageTrans = async (
  myAccountKey: string,
  destPubkeyStr: string,
  spouse1Name: string,
  spouse2Name: string,
  spouse1pubKey: string,
  spouse2pubKey: string,
  status: number,
  consent: boolean,
  connection: Connection,
  wallet: WalletAdapter
) => {
  const txid = await arweaveService.saveData(
    new ArweaveMarriage(
      myAccountKey, // spouse1
      destPubkeyStr, // sposue 2
      spouse1Name,
      spouse2Name,
      spouse1pubKey,
      spouse2pubKey,
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

export const getHistory = async (account:AccountDetails,spouseAccountKey:string, setspouseMarriageHistory:React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>, setMarriageHistory:React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>) => {
  const result = await getMarriageTimeline(
    account?.connection.current!,
    account?.accountPubKey!
  );

  const spouseResult = await getMarriageTimeline(
    account?.connection.current!,
    spouseAccountKey
  );

  setMarriageHistory(result);
  setspouseMarriageHistory(spouseResult);

};