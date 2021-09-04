import React, { useContext, useEffect, useState } from "react";
import Peacock from "./assets/peacock.svg";
import "./App.css";
import DownloadCertificate from "./components/Certificate/DownloadCertificate";
import { initWallet, WalletAdapter } from "./solana/wallet";
import { Connection } from "@solana/web3.js";
import { getMarriageAccountPubkey } from "./solana/account";
import marriageServiceService from "./solana/marraige";
import marriageService from "./solana/marraige";
import { ArweaveMarriage, arweaveService } from "./arweave/arweave";
import { AccountContext, AccountDetails } from "./utils/accountContext";
import { Dashboard } from "./Pages/DashBoard";

function App() {
  const conn = React.useRef<Connection>();
  
  const [accountInfo, setAccount] = useState<AccountDetails>();

  useEffect(() => {}, []);

  const connectSollet = () => {
    initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
      conn.current = connection;
      console.log("wallet", wallet.publicKey);
      if (wallet.publicKey) {
        getMarriageAccountPubkey(
          connection,
          wallet,
          marriageService.MARRIAGE_SIZE
        ).then((acckey) => {
          console.log("acckey", acckey);
          setAccount({
            accountPubKey: acckey.toBase58(),
            wallet: wallet,
            connection: conn,
          });

          console.log("account", accountInfo);
        });
      }
    });
  };

  return (
    <AccountContext.Provider value={{ account: accountInfo, setAccount }}>
      <div className="">
        <div>
          <div>{accountInfo?.accountPubKey}</div>
          <button onClick={connectSollet}>Connect wallet</button>
        </div>
        <Dashboard />
      </div>
    </AccountContext.Provider>
  );
}

export default App;

{
  /* <div>
          <button
            onClick={() =>
              makeMarriageTrans(
                myAccountKey,
                "A46mgicXCK4quAzKyhJJi6Q77SY1uaFPaBYQBaasq213",
                0,
                true,
                conn.current!,
                myWallet!
              )
            }
          >
            Send consent
          </button>
        </div>

        <button
          onClick={() =>
            makeMarriageTrans(
              myAccountKey,
              "A46mgicXCK4quAzKyhJJi6Q77SY1uaFPaBYQBaasq213",
              1,
              true,
              conn.current!,
              myWallet!
            )
          }
        >
          Marry your love
        </button>

        <button onClick={() => getMarriageSentHistory()}>
          Get Marriage History
        </button>
      </div> */
}

{
  /* <form>
        <div className="input-box">
          <input type="text" name="naeeme" required />
          <label htmlFor="ee">Name</label>
        </div>

        <button type="submit">Submit</button>
      </form> */
}

{
  /* <DownloadCertificate /> */
}
