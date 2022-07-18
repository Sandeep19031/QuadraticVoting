import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEth } from "../../contexts/EthContext";
import CastVote from "./CastVote";
import "./ProposalList.css";
import toast from "cogo-toast";
import Countdown, { zeroPad } from "react-countdown";

export default function ProposalList() {
  const [proposalCount, setProposalCount] = useState(Number(0));
  const [proposalList, setProposalList] = useState(
    Array.from(new Array(proposalCount))
  );
  const [refresh, setRefresh] = useState(false);

  const {
    state: { contract, accounts },
  } = useEth();

  useEffect(() => {
    const ProposalCount = async () => {
      try {
        const pC = await contract?.methods
          .getProposalCount()
          .call({ from: accounts[0] });
        setProposalCount(pC);
        console.log("res from pC", pC);
      } catch (err) {
        toast.error("Error while fetching proposals!!");
      }
    };

    const fetProposalInfo = async (pID) => {
      let res;
      try {
        res = await contract?.methods
          .getDetails(pID)
          .call({ from: accounts[0] });
        let pInfoObject = {
          description: res[0],
          optionsList: res[1],
          noOfOptions: res[1].length,
          expirationTime: res[2],
          status: res[3],
        };
        return pInfoObject;
      } catch (err) {
        toast.error("Error in fetching proposal info!!");
      }
    };

    const Fetching = async () => {
      for (let i = 1; i <= proposalCount; i++) {
        const infoObj = await fetProposalInfo(i);
        proposalList[i] = infoObj;
        setProposalList(proposalList);
      }
    };

    const updateState = () => {
      if (proposalCount > 0 && refresh === false) {
        setRefresh(true);
      }
    };
    const getData = async () => {
      await ProposalCount();
      await Fetching();
      updateState();
    };
    getData();
  });

  return (
    <div className="proposalList">
      {proposalCount == 0 && <p>No proposals..</p>}
      {proposalCount > 0 &&
        proposalList?.map((proposal, index) => {
          if (index === 0) return;
          return (
            <div className="votingContainer">
              <Link
                to={`/castVote/${index}`}
                state={{
                  proposalID: index,
                  description: proposal.description,
                  optionsList: proposal.optionsList,
                  noOfOptions: proposal.noOfOptions,
                  expirationTime: proposal.expirationTime,
                  proposalStatus: proposal.status,
                }}
                style={{ textDecoration: "none" }}
              >
                <div key={index} className="card">
                  <p>Proposal Number: {index}</p>
                  <p>Description: {proposal.description}</p>
                  <p>
                    Time-Left:{" "}
                    {
                      <Countdown
                        date={proposal.expirationTime * 1000}
                        renderer={({ hours, minutes, seconds }) => (
                          <span>
                            {zeroPad(hours)}:{zeroPad(minutes)}:
                            {zeroPad(seconds)}
                          </span>
                        )}
                      />
                    }
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
