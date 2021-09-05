import React, { useState } from "react";
import { AccountContext, AccountDetails } from "../../utils/accountContext";
import "./style.css";

import {
  getHistory,
  getMarriageTimeline,
  makeMarriageTrans,
} from "../../utils/marriageUtils";
import { ArweaveMarriage } from "../../arweave/arweave";

interface IDashboardOption1Props {
  account: AccountDetails;
  spouseAccountKey: string;

  setspouseMarriageHistory: React.Dispatch<
    React.SetStateAction<ArweaveMarriage[]>
  >;
  setMarriageHistory: React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>;
}

interface IDashboardOption2Props {
  account: AccountDetails;
  spouseAccountKey: string;
  marriageInfo: ArweaveMarriage;

  setspouseMarriageHistory: React.Dispatch<
    React.SetStateAction<ArweaveMarriage[]>
  >;
  setMarriageHistory: React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>;
}

interface IDashboardTimelineProps {
  account: AccountDetails;
}

// export const DashboardOptions: React.FunctionComponent<{}> = () => {
//   return (
//     <AccountContext.Consumer>
//       {({ account, spouseAccountKey }) => (
//         <>
//           <DashboardOptions1
//             account={account!}
//             spouseAccountKey={spouseAccountKey}
//           />
//           <DashboardOptions2
//             account={account!}
//             spouseAccountKey={spouseAccountKey}
//           />
//           <DashboardTimeline account={account!} />
//         </>
//       )}
//     </AccountContext.Consumer>
//   );
// };

export const DashboardOptions1: React.FunctionComponent<IDashboardOption1Props> =
  ({
    account,
    spouseAccountKey,
    setMarriageHistory,
    setspouseMarriageHistory,
  }) => {
    const [name, setName] = useState("");
    const [spouseName, setSpouseName] = useState("");
    const [spousePublicKey, setSpousePublicKey] = useState("");
    const sendConsent = async () => {
      console.log({ account, spouseAccountKey });

      makeMarriageTrans(
        account.accountPubKey,
        spouseAccountKey,
        name,
        spouseName,
        account.wallet.publicKey?.toBase58()!,
        spousePublicKey,
        0,
        true,
        account.connection.current!,
        account.wallet
      );

      await getHistory(
        account,
        spouseAccountKey,
        setspouseMarriageHistory,
        setMarriageHistory
      );
    };

    return (
      <div className="card-container">
        <div className="card">
          <div className="body-text">
            Your wedding marks the beginning of your long journey together. Your
            wedding ring is a circle—a symbol of love never ending. It is the
            seal of the vows you have just taken to love each other without end.
          </div>

          <div className="caption">Will you</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "80%",
            }}
            className="input-box"
          >
            <input
              className="spouse-acc-input"
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <div className="caption">take</div>
            <input
              className="spouse-acc-input"
              type="text"
              placeholder="Your Partner's Name"
              onChange={(e) => setSpouseName(e.target.value)}
            />
            <br />
            <input
              className="spouse-acc-input"
              type="text"
              placeholder="Your Partner's public key"
              onChange={(e) => setSpousePublicKey(e.target.value)}
            />
          </div>

          <div className="caption">as your lawfully wedded spouse?</div>
          <button onClick={async () => await sendConsent()}>I do</button>
        </div>
      </div>
    );
  };

export const DashboardOptions2: React.FunctionComponent<IDashboardOption2Props> =
  ({
    account,
    spouseAccountKey,
    marriageInfo,
    setMarriageHistory,
    setspouseMarriageHistory,
  }) => {
    const marry = async () => {
      makeMarriageTrans(
        account.accountPubKey,
        spouseAccountKey,
        marriageInfo.spouse1Name!,
        marriageInfo.spouse2Name!,
        marriageInfo.spouse1pubKey!,
        marriageInfo.spouse2pubKey!,
        1,
        true,
        account.connection.current!,
        account.wallet
      );

      await getHistory(
        account,
        spouseAccountKey,
        setspouseMarriageHistory,
        setMarriageHistory
      );
    };
    return (
      <div className="card-container">
        <div className="card">
          <div className="header-text"></div>
          <div className="body-text">
            Marriage is perhaps the greatest and most challenging adventure of
            human relationships. No ceremony can create your marriage; only you
            can do that—through love and patience; through dedication and
            perseverance; through talking and listening, helping and supporting
            and believing in each other; through tenderness and laughter;
            through learning to forgive, learning to appreciate your
            differences, and by learning to make the important things matter,
            and to let go of the rest. What this ceremony can do is to witness
            and affirm the choice you make to stand together as lifemates and
            partners.
          </div>

          <div className="caption">
            You may now sign the transaction to complete your marriage
          </div>
          <button onClick={async () => marry()}>Marry</button>
        </div>
      </div>
    );
  };
