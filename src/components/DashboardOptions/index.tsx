import React, { useState } from "react";
import { AccountContext, AccountDetails } from "../../utils/accountContext";
import "./style.css";

import {
  getMarriageTimeline,
} from "../../utils/marriageUtils";
import { ArweaveMarriage } from "../../arweave/arweave";

interface IDashboardOption1Props {
  account: AccountDetails;
  spouseAccountKey: string;
}

interface IDashboardOption2Props {
  account: AccountDetails;
  spouseAccountKey: string;
}

interface IDashboardTimelineProps {
  account: AccountDetails;
}

export const DashboardOptions: React.FunctionComponent<{}> = () => {

  return (
    <AccountContext.Consumer>
      {({ account, spouseAccountKey }) => (
        <>
          <DashboardOptions1
            account={account!}
            spouseAccountKey={spouseAccountKey}
          />
          <DashboardOptions2
            account={account!}
            spouseAccountKey={spouseAccountKey}
          />
          <DashboardTimeline account={account!} />
        </>
      )}
    </AccountContext.Consumer>
  );
};

export const DashboardOptions1: React.FunctionComponent<IDashboardOption1Props> =
  ({ account, spouseAccountKey }) => {
    const sendConsent = () => {
      console.log({ account, spouseAccountKey });

      // makeMarriageTrans(
      //   account.accountPubKey,
      //   spouseAccountKey,
      //   0,
      //   true,
      //   account.connection.current!,
      //   account.wallet
      // );
    };

    return (
      <div className="card-container">
        <div className="card">
          <div className="header-text">
            Looks like you are up for a Marriage, please enter your spouse's
            account key
          </div>

          <div className="body-text">
            Your wedding marks the beginning of your long journey together. Your
            wedding ring is a circle—a symbol of love never ending. It is the
            seal of the vows you have just taken to love each other without end.
          </div>

          <div className="caption">
            Will you accountkey1 take accountkey2 as your lawfully wedded
            spouse?
          </div>
          <button onClick={sendConsent}>I do</button>
        </div>
      </div>
    );
  };

export const DashboardOptions2: React.FunctionComponent<IDashboardOption2Props> =
  ({ account, spouseAccountKey }) => {
    const marry = () => {
      // makeMarriageTrans(
      //   account.accountPubKey,
      //   spouseAccountKey,
      //   1,
      //   true,
      //   account.connection.current!,
      //   account.wallet,
      // );
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
          <button onClick={marry}>Marry</button>
        </div>
      </div>
    );
  };

const DashboardTimeline: React.FunctionComponent<IDashboardTimelineProps> = ({
  account,
}) => {
  const [marriageHistory, setMarriageHistory] = useState<ArweaveMarriage[]>();

  const getMarriages = () => {
    getMarriageTimeline(
      account.connection.current!,
      account.accountPubKey
    ).then((history) => {
      setMarriageHistory(history);
    });
  };

  return (
    <div className="card">
      <button onClick={getMarriages}>Get Marriages</button>
      {marriageHistory &&
        marriageHistory.map((m: ArweaveMarriage) => {
          return (
            <div>
              {m.spouse1}
              {m.spouse2}
              {m.status}
            </div>
          );
        })}
    </div>
  );
};
