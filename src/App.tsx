import React, { useState } from "react";
import "./App.css";
// import { initWallet, WalletAdapter } from "./solana/wallet";
// import { Connection } from "@solana/web3.js";
// import { getMarriageAccountPubkey } from "./solana/account";
// import marriageService from "./solana/marraige";
import { AccountContext, AccountDetails } from "./utils/accountContext";
import { Dashboard } from "./Pages/DashBoard";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {

  const [accountInfo, setAccount] = useState<AccountDetails>();

  // useEffect(() => { }, []);

  // const connectSollet = () => {
  //   initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
  //     conn.current = connection;
  //     console.log("wallet", wallet.publicKey);
  //     if (wallet.publicKey) {
  //       getMarriageAccountPubkey(
  //         connection,
  //         wallet,
  //         marriageService.MARRIAGE_SIZE
  //       ).then((acckey) => {
  //         console.log("acckey", acckey);
  //         setAccount({
  //           accountPubKey: acckey.toBase58(),
  //           wallet: wallet,
  //           connection: conn,
  //         });

  //         console.log("account", accountInfo);
  //       });
  //     }
  //   });
  // };

  return (
    <AccountContext.Provider value={{ account: accountInfo, setAccount }}>
      <div className="App">

        {/* <Dashboard /> */}
        <Hero />
        <About />
        <Footer />
        {/* <div>
      <div>{accountInfo?.accountPubKey}</div>
      <button onClick={connectSollet}>Connect wallet</button>
      </div>
     */}
      </div>
    </AccountContext.Provider >
  );
}

export default App;

