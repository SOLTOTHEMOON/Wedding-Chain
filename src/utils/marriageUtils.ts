import { Connection } from "@solana/web3.js";
import { ArweaveMarriage, arweaveService } from "../arweave/arweave";
import marriageService from "../solana/marraige";
import { WalletAdapter } from "../solana/wallet";
import React,{useContext,createContext} from "react"; 

const makeMarriageTrans = async (
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
        destPubkeyStr,
        txid
      );
      console.log("Marriage Transaction sent successfully", result);
    };

const getMarriageSentHistory = async (connection: Connection) => {
    marriageService
      .getMarriageSentHistory(
        connection,
        "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15"
      )
      .then((marriages) => {
        marriageService.getArweaveMarriages(marriages).then((data) => {
          console.log("getArweaveMarriages", data);
          return data;
        });
      });
  };