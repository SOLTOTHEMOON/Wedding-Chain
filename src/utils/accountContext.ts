import { Connection } from "@solana/web3.js";
import React, { useContext, createContext } from "react";
import { WalletAdapter } from "../solana/wallet";

interface Account {
  accountPubKey: string;
  connection: React.MutableRefObject<Connection | undefined>;
  wallet: WalletAdapter;
}

const AccountContext = createContext<{
  account?: Account;
  setAccount: Function;
}>({
  account: undefined,
  setAccount: () => {},
});

export { AccountContext };
export type AccountDetails = Account;
