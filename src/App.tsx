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
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Team from "./components/Team";
// import Certificate from "./components/Certificate";

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
        <Header />
        {/* <Certificate /> */}
        <Switch>

          <Route exact path="/">
            <Hero />
            <About />
            <Team />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="*">
            <p>404 | Page not Found</p>
          </Route>
        </Switch>
        <Footer />
        {/* <div>{accountInfo?.accountPubKey}</div> */}
        {/* <Dashboard /> */}

        {/* <div>
      <button onClick={connectSollet}>Connect wallet</button>
      </div>
     */}
      </div>

    </AccountContext.Provider >
  );
}

export default App;

