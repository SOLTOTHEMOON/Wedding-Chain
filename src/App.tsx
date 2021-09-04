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
import AccountContext from "./utils/accountContext";

function App() {
  const conn = React.useRef<Connection>();
  const [marriageHistory, setMarriageHistory] = useState<ArweaveMarriage[]>();
  const {setAccount} = useContext(AccountContext);

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
            account : {
              accountPubKey: acckey.toBase58(),
              wallet: wallet,
              connection: conn
            }
          })!;
        });
      }
    });
  };

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

  const getMarriageSentHistory = async () => {
    marriageService
      .getMarriageSentHistory(
        conn.current!,
        "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15"
      )
      .then((marriages) => {
        marriageService.getArweaveMarriages(marriages).then((data) => {
          console.log("getArweaveMarriages", data);
          setMarriageHistory(data);
        });
      });
  };

  return (
    <div className="App">
      <div className="content">
        <div className="header">
          <header className="App-header">Get Married on the Chain</header>
          <img className="peacock-img" src={Peacock} alt={"Peacock"} />
        </div>
        {  (
          <button
            type="submit"
            style={{ width: 200, alignSelf: "center" }}
            onClick={connectSollet}
          >
            Get Started
          </button>
        )}
        { <div> Your public key is </div>}
    </div>
    </div>
  );
}

export default App;


{/* <div>
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
      </div> */}

      {/* <form>
        <div className="input-box">
          <input type="text" name="naeeme" required />
          <label htmlFor="ee">Name</label>
        </div>

        <button type="submit">Submit</button>
      </form> */}

      {/* <DownloadCertificate /> */}