import { Connection } from "@solana/web3.js";
import React, { createContext } from "react";
import { WalletAdapter } from "../solana/wallet";

interface Account {
  accountPubKey: string;
  connection: React.MutableRefObject<Connection | undefined>;
  wallet: WalletAdapter;
}

const AccountContext = createContext<{
  account?: Account;
  setAccount: Function;
  spouseAccountKey: string ;
}>({
  account: undefined,
  spouseAccountKey: "",
  setAccount: () => { },
});

export { AccountContext };
export type AccountDetails = Account;
