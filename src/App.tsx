import React, { useEffect, useState } from "react";
import Peacock from "./assets/peacock.svg";
import "./App.css";
import DownloadCertificate from "./components/Certificate/DownloadCertificate";
import { initWallet, WalletAdapter } from "./solana/wallet";
import { Connection } from "@solana/web3.js";
import { getMarriageAccountPubkey } from "./solana/account";
import marriageServiceService from "./solana/marraige";
import marriageService from "./solana/marraige";
import { ArweaveMarriage, arweaveService } from "./arweave/arweave";
function App() {
  const conn = React.useRef<Connection>();
  const [myWallet, setMyWallet] = useState<WalletAdapter | undefined>();
  const [myAccountKey, setmyAccountKey] = useState("");
  const [marriageHistory, setMarriageHistory] = useState<ArweaveMarriage[]>();

  useEffect(() => {}, []);

  const connectSollet = () => {
    initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
      conn.current = connection;
      setMyWallet(wallet);
      console.log("wallet", wallet.publicKey);
      if (wallet.publicKey) {
        getMarriageAccountPubkey(
          connection,
          wallet,
          marriageService.MARRIAGE_SIZE
        ).then((acckey) => {
          console.log("acckey", acckey);
          setmyAccountKey(acckey.toBase58());
        });
      }
    });
  };

  const sendConsent = async (
    destPubkeyStr: string,
    connection: Connection,
    wallet: WalletAdapter
  ) => {
    const txid = await arweaveService.saveData(
      new ArweaveMarriage(
        "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15", // spouse1
        "A46mgicXCK4quAzKyhJJi6Q77SY1uaFPaBYQBaasq213", // sposue 2
        0,
        true,
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
    console.log("consent  sent successfully", result);
  };

  const marry = async (
    destPubkeyStr: string,
    connection: Connection,
    wallet: WalletAdapter
  ) => {
    const txid = await arweaveService.saveData(
      new ArweaveMarriage(
        "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15", // spouse1
        "A46mgicXCK4quAzKyhJJi6Q77SY1uaFPaBYQBaasq213", // sposue 2
        1,
        true,
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
    console.log("Married successfully", result);
  };

  const getMarriageHistory = async () => {
    marriageServiceService
      .getMarriageHistory(
        conn.current!,
        "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15"
      )
      .then((marriages) => {
        marriageServiceService.getArweaveMarriages(marriages).then((data) => {
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
        {!myAccountKey && (
          <button
            type="submit"
            style={{ width: 200, alignSelf: "center" }}
            onClick={connectSollet}
          >
            Get Started
          </button>
        )}
        {myAccountKey && <div> Your public key is {myAccountKey}</div>}

        <div>
          <button
            onClick={() =>
              sendConsent(
                "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15",
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
            marry(
              "6euonXTCCPFkbbFatigvmPxBVuZpnmEF1BbYrTJJvG15",
              conn.current!,
              myWallet!
            )
          }
        >
          Marry your love
        </button>

        <button onClick={() => getMarriageHistory()}>
          Get Marriage History
        </button>
      </div>

      {/* <form>
        <div className="input-box">
          <input type="text" name="naeeme" required />
          <label htmlFor="ee">Name</label>
        </div>

        <button type="submit">Submit</button>
      </form> */}

      {/* <DownloadCertificate /> */}
    </div>
  );
}

export default App;
