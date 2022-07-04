import React, { useEffect, useState } from "react";
import { actions, useEth } from "../../contexts/EthContext";
import "./AccountDetails.css";
export default function AccountDetails() {
  const {
    state: { contract, accounts },
    dispatch,
  } = useEth();

  const [credits, setCredits] = useState();
  useEffect(() => {
    fetchAccountBalance();
  });
  return (
    <div className="accountDetails">
      <div className="credits">
        <p>Credits: {credits}</p>
      </div>
    </div>
  );
}
