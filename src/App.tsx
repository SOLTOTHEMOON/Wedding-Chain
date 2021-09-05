import React, { useEffect, useState } from "react";
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
import { ArweaveMarriage } from "./arweave/arweave";
function App() {
  const [accountInfo, setAccount] = useState<AccountDetails>();
  const [spouseAccountKey, setSpouseAccountKey] = useState<string>("H4ZZgB1oKRMgZpGrXEC1SyBmwrxqNG2q1xNLixwqCanh");

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
        <Switch>
          <Route exact path="/">
            <Hero />
            <About />
          </Route>

          <Route path="/dashboard">
            <Dashboard
              spouseAccountKey={spouseAccountKey}
              setSpouseAccountKey={setSpouseAccountKey}
            />
          </Route>

          <Route path="*">
            <p>Page not Found</p>
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
    </AccountContext.Provider>
  );
}

export default App;

/*

already registered account


getMarriagehistory 

if history is empty show consent 

if (history == 0) show marry card 

if (history == 1)  show divorce, anulled options 

if (history == 2, 3)  show new marriage



new account 

inputs - account key of the spouse, 


listen to the account key, get the archive data,

if( archive_data.status == 0) then show marry card



if (their partner doesn't exist) then show consent

if (theier partner exists ) then we will wait consent


status = 0

if  ( arwaeve.updated_at < arweave.updated_at )


account 1{
archive_id1 : consent asas
archive_id2 : marriage assdss
}

account 2 {
archive_id1 : consent assxs
archive_id2 :marriage assdss
}


Arweave
asas = sp10 - today
assxs = sp2 =0 - tommorow
assdss = sp1 =1
asdasda
*/
