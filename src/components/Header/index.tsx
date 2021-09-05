import React, { useContext } from "react";
import { AccountContext } from "../../utils/accountContext";
import { useHistory, Link } from "react-router-dom"
import { initWallet, WalletAdapter } from "../../solana/wallet";
import { Connection } from "@solana/web3.js";
import { getMarriageAccountPubkey } from "../../solana/account";
import marriageService from "../../solana/marraige";
import { MdContentCopy } from "react-icons/md";
import './style.css'

export default function Header() {
    const conn = React.useRef<Connection>();



    const { account, setAccount } = useContext(AccountContext)
    let history = useHistory();

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
                    history.push("/get_spouse")
                });
            }
        });
    };
    return (
        <div className="header-container">
            <Link to={"/"}>

                <div className="logo-wrapper">
                    <h1>Chain-Marriage</h1>
                </div>

            </Link>
            <div>
                {account && account.accountPubKey ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="dashboard-link">
                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                        </div>
                        <div className="dashboard-link">

                            <Link to="/certificate">
                                Certificate
                            </Link>
                        </div>
                        <div className="pub-key">
                            <p>
                                {account.accountPubKey}
                            </p>
                            <div className="copy-icon"
                                onClick={() => navigator.clipboard.writeText(account.accountPubKey)}>
                                <MdContentCopy />
                            </div>
                        </div>
                    </div> :
                    <button onClick={connectSollet} className="pulse">
                        Get Started
                    </button>
                }
            </div>

        </div>
    )
}