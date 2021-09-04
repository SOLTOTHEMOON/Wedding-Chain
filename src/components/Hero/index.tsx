import React, { useContext } from "react";
import { AccountContext } from "../../utils/accountContext";
import Peacock from '../../assets/peacock'
import { initWallet, WalletAdapter } from "../../solana/wallet";
import { Connection } from "@solana/web3.js";
import { getMarriageAccountPubkey } from "../../solana/account";
import marriageService from "../../solana/marraige";
import './style.css'

export default function Hero() {
    const conn = React.useRef<Connection>();

    const { account, setAccount } = useContext(AccountContext)

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

                    console.log("account", account);
                });
            }
        });
    };
    return (
        <div>
            <div className="logo-wrapper">
                <h1>Chain-Marriage</h1>
            </div>

            <div className="hero-wrapper">

                <div className="hero">
                    <h1 className="hero-text">
                        Get Married <br />
                        on Chain
                    </h1>
                    <button onClick={connectSollet}>
                        Get Started
                    </button>

                    <p>already have a account ?</p>
                </div>

                <div className="peacock-wrapper">
                    <Peacock />
                </div>

            </div>
        </div>
    )
}
