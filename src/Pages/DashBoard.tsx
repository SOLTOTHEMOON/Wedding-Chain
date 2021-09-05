import React, { useContext, useEffect, useState } from "react";
import { ArweaveMarriage } from "../arweave/arweave";
import { DashboardOptions } from "../components/DashboardOptions";
import { AccountContext } from "../utils/accountContext";
import { getMarriageTimeline } from "../utils/marriageUtils";

interface IDashBoardProps {
  spouseAccountKey: string;
  setSpouseAccountKey: React.Dispatch<React.SetStateAction<string>>;
}

export const Dashboard: React.FunctionComponent<IDashBoardProps> = ({
  spouseAccountKey,
  setSpouseAccountKey,
}) => {
  const [marriageHistory, setMarriageHistory] = useState<ArweaveMarriage[]>([]);
  const [spouseMarriageHistory, setspouseMarriageHistory] = useState<
    ArweaveMarriage[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const { account } = useContext(AccountContext);

  useEffect(() => {
    const getHistory = async () => {
      const result = await getMarriageTimeline(
        account?.connection.current!,
        account?.accountPubKey!
      );

      const spouseResult = await getMarriageTimeline(
        account?.connection.current!,
        spouseAccountKey
      );

      setMarriageHistory(result);
      setspouseMarriageHistory(spouseResult);

      console.log({ marriageHistory, spouseMarriageHistory });
    };

    getHistory();
  }, []);

  // check whose trnsaction timestamp is earlier
  const showMarriage =
    marriageHistory[marriageHistory.length - 1]?.updated_at! <
    spouseMarriageHistory[spouseMarriageHistory.length - 1]?.updated_at!;

  // check the status
  const checkstatus = marriageHistory[marriageHistory.length - 1]?.status;
  const checkSpouseStatus =
    spouseMarriageHistory[spouseMarriageHistory.length - 1]?.status;

  if (checkstatus == 0 && checkSpouseStatus == 0 && showMarriage) {
    console.log("show marry");
  } else if (checkstatus == 1) {
    // show divorce, anulled
    console.log("show divorce, anulled");
  } else if (checkstatus == 2 || checkstatus == 3) {
    console.log("show new marriage");
  } else if (showMarriage) {
    console.log("show consent");

    // whosever updated_ar is greater,
    // show consent
    // else
    // wait for consent
  }

  return (
    <div>
      <DashboardOptions />
    </div>
  );
};
