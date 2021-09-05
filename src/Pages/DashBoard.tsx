import React, { useContext, useEffect, useState } from "react";
import { ArweaveMarriage } from "../arweave/arweave";
import {
  DashboardOptions1,
  DashboardOptions2,
} from "../components/DashboardOptions";
import { Timeline } from "../components/Timeline";
import { AccountContext } from "../utils/accountContext";
import { getMarriageTimeline } from "../utils/marriageUtils";
interface IDashBoardProps {
  spouseAccountKey: string;
  setSpouseAccountKey: React.Dispatch<React.SetStateAction<string>>;
  marriageHistory: ArweaveMarriage[];
  spouseMarriageHistory: ArweaveMarriage[];
  setspouseMarriageHistory: React.Dispatch<
    React.SetStateAction<ArweaveMarriage[]>
  >;
  setMarriageHistory: React.Dispatch<React.SetStateAction<ArweaveMarriage[]>>;
}

export const Dashboard: React.FunctionComponent<IDashBoardProps> = ({
  spouseAccountKey,
  setSpouseAccountKey,
  marriageHistory,
  spouseMarriageHistory,
  setspouseMarriageHistory,
  setMarriageHistory,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  console.log({ marriageHistory, spouseMarriageHistory });
  // check whose trnsaction timestamp is earlier
  const showMarriage =
    marriageHistory[marriageHistory.length - 1]?.updated_at! <
    spouseMarriageHistory[spouseMarriageHistory.length - 1]?.updated_at!;

  // check the status
  const checkstatus = marriageHistory[marriageHistory.length - 1]?.status;
  const checkSpouseStatus =
    spouseMarriageHistory[spouseMarriageHistory.length - 1]?.status;

  if (checkstatus === 0 && checkSpouseStatus === 0 && showMarriage) {
    return (
      <AccountContext.Consumer>
        {({ account, spouseAccountKey }) => (
          <>
            <DashboardOptions2
              account={account!}
              spouseAccountKey={spouseAccountKey}
              marriageInfo={marriageHistory[marriageHistory.length - 1]}
              setspouseMarriageHistory={setspouseMarriageHistory}
              setMarriageHistory={setMarriageHistory}
            />
          </>
        )}
      </AccountContext.Consumer>
    );
  } else if (checkstatus === 1 || checkSpouseStatus === 1) {
    // show divorce, anulled
    return <Timeline marriages={marriageHistory} />;
  } else if (checkstatus === 2 || checkstatus === 3) {
    console.log("show new marriage");
  } else {
    return (
      <AccountContext.Consumer>
        {({ account, spouseAccountKey }) => (
          <DashboardOptions1
            account={account!}
            spouseAccountKey={spouseAccountKey}
            setMarriageHistory={setMarriageHistory}
            setspouseMarriageHistory={setspouseMarriageHistory}
          />
        )}
      </AccountContext.Consumer>
    );

    // whosever updated_ar is greater,
    // show consent
    // else
    // wait for consent
  }

  return <div></div>;
};

/*

 <DashboardOptions2
            account={account!}
            spouseAccountKey={spouseAccountKey}
          />
          
*/
