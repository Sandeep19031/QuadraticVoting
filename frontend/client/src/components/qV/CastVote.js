import React, { useState, useEffect } from "react";
import "./CastVote.css";
import useEth from "../../contexts/EthContext/useEth";

export default function CastVote() {
  const [proposalID, setProposalID] = useState(0);
  const [description, setDescription] = useState();
  const {
    state: { contract, accounts },
  } = useEth();

  const [voteBool, setVoteBool] = useState();
  const [yesVote, setYesVote] = useState(0);
  const [noVote, setNoVote] = useState(0);

  async function handleProposalIDSubmitButton() {
    const res = await contract.methods
      .getDetails(proposalID)
      .send({ from: accounts[0] });

    console.log("res from getDetails()", res);
  }
  const handleRadioButton = (e) => {
    setVoteBool(e.target.value);
  };

  const handleVoteInputYes = (e) => {
    setYesVote(e.target.value);
  };

  const handleVoteInputNo = (e) => {
    //setNoVote(e.target.value);
  };

  const handleCasteButton = async () => {
    const mint = await contract.methods
      .mint(accounts[0], 1000)
      .send({ from: accounts[0] });
    console.log("mint res", mint);
    if (voteBool == "Yes") {
      const res = await contract.methods
        .castVote(proposalID, yesVote, true)
        .send({ from: accounts[0] });

      console.log("castvote res", res);
    } else if (voteBool == "No") {
      const res = await contract.methods
        .castVote(proposalID, noVote, false)
        .send({ from: accounts[0] });
    }
  };

  const CastVoteContainer = () => {
    return (
      <div className="castVote" id={proposalID}>
        <br />
        <div className="proposalInfo">
          <div className="proposalStatus"></div>
        </div>

        <div className="button-container">
          <div className="castButton" onClick={handleCasteButton}>
            <p>CAST</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="proposaIDInput">
        <div>
          <p>Enter ProposalID</p>
        </div>
        <div className="proposalIDInputBox">
          <div className="wrapper">
            <input
              type="number"
              name="proposalIDInput-input"
              className="proposalID-input"
              value={proposalID}
              onChange={(e) => setProposalID(e.target.value)}
            />
          </div>
        </div>
        <div className="proposalIDButton-container">
          <div
            className="proposalIDSubmitButton"
            onClick={handleProposalIDSubmitButton}
          >
            <p>SUBMIT</p>
          </div>
        </div>
      </div>

      {proposalID && description ? <CastVoteContainer /> : <></>}
    </div>
  );
}
