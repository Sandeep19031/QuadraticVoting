import React, { useState } from "react";
import "./CastVote.css";
import useEth from "../../contexts/EthContext/useEth";
import { toast } from "react-toastify/dist/react-toastify";
import Countdown, { zeroPad } from "react-countdown";
import Winner from "./Winner";
import { ToastBar } from "react-hot-toast";

export default function CastVote() {
  const [proposalID, setProposalID] = useState(0);
  const [description, setDescription] = useState();
  const [noOfOptions, setNoOfOptions] = useState();
  const [optionsList, setOptionsList] = useState([]);
  const [expTime, setExpTime] = useState();
  const [proposalStatus, setProposalStatus] = useState();

  const {
    state: { contract, accounts },
  } = useEth();

  const [remainingCredits, setRemainingCredits] = useState();
  const [totalCredits, setTotalCredits] = useState();
  const [subQuantity, setSubQuantity] = useState(Number(0));
  const [isComplete, setIsComplete] = useState(false);

  const [votesList, setVotesList] = useState(
    Array.from(new Array(noOfOptions))
  );

  let arr = [];
  for (let i = 1; i <= noOfOptions; i++) {
    arr.push(i);
  }
  async function handleProposalIDSubmitButton() {
    try {
      const res = await contract.methods
        .getDetails(proposalID)
        .call({ from: accounts[0] });
      console.log("getDetails()", res);
      setDescription(res[0]);
      setOptionsList(res[1]);
      setNoOfOptions(res[1].length);

      const getExpTime = await contract.methods
        .getProposalExpirationTime(proposalID)
        .call();
      setExpTime(getExpTime);
      console.log("exp time", getExpTime);

      const getProposalStatus = await contract.methods
        .getProposalStatus(proposalID)
        .call();
      setProposalStatus(getProposalStatus);
      console.log("proposal status", getProposalStatus);

      const credits = await contract.methods.balanceOf(accounts[0]).call();
      console.log("res from balanceOf", credits);
      setRemainingCredits(Number(credits));
      setTotalCredits(Number(credits));
    } catch (err) {
      console.log("error in fetching proposal!");
    }
  }
  const handleCasteButton = async () => {
    console.log("votesList", votesList);

    if (votesList.length !== noOfOptions) {
      return toast.error("Please vote to all the candidates. ");
    }
    try {
      const res = await contract.methods
        .castVote(proposalID, votesList)
        .send({ from: accounts[0] });

      console.log("res from castVote", res);
      if (res) {
        toast.success("Your votes are successfully casted ...");
      }
    } catch (err) {
      //toast.err("Error in Vote Casting !!");
      console.log("Proposal has expired");
      toast.error("There is some error in casting your vote!!");
    }
  };

  const handleVoteInput = (e, index) => {
    let name = e.target.name;
    let newValue = e.target.value;
    let sQ = newValue * newValue;

    let rc = remainingCredits + subQuantity - sQ;
    console.log(
      "subQuantity",
      subQuantity,
      "sQ",
      sQ,
      "remaing credit",
      remainingCredits
    );
    if (totalCredits === 0) {
      toast.error("You don't have credits to vote..");
      return (e.target.value = null);
    }
    if (rc < 0) {
      return toast.error(
        "You'll exceed the remaining credits, you can't vote more"
      );
    }

    votesList[index] = Number(newValue);

    setVotesList(votesList);
    setRemainingCredits(rc);
    setSubQuantity(sQ);
  };

  const VoteContainer = ({ key, index, optionName }) => {
    return (
      <div className="voteContainer" key={key}>
        <div className="descriptionContainer">
          <h3>{optionName}</h3>
        </div>

        <div className="voteToCandidate">
          <div className="voteInputBox" id={index}>
            <input
              type="number"
              value={votesList[index]}
              placeholder="Vote"
              min={0}
              name={index}
              onFocus={(e) => setSubQuantity(e.target.value * e.target.value)}
              onChange={(e) => {
                return handleVoteInput(e, index);
              }}
            />
          </div>
        </div>

        <div className="usedCreditContainer">
          <div className="usedCredit">
            <p>Credits Used: {votesList[index] * votesList[index]}</p>
          </div>
        </div>
      </div>
    );
  };

  const VoteContainerList = arr.map((number) => {
    let index = number - 1;
    let optionName = optionsList[index];
    return VoteContainer({ key: number, index: index, optionName: optionName });
  });

  const CastVoteContainer = () => {
    return (
      <div className="castVote" id={proposalID}>
        <br />
        <div className="proposalInfo">
          <h2>{description}</h2>
        </div>
        {VoteContainerList}
        <div className="button-container">
          <div className="castButton" onClick={handleCasteButton}>
            <p>CAST</p>
          </div>
        </div>
      </div>
    );
  };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setIsComplete(true);
      return;
    } else {
      // Render a countdown
      return (
        <span>
          Timme-Left {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
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

      <div className="proposalStatus">
        <p>Proposal Status: {proposalStatus}</p>
      </div>
      <div className="creditsLeft">
        <p>Remaining credits: {remainingCredits}</p>
      </div>

      {expTime ? (
        <Countdown date={expTime * 1000} renderer={renderer} />
      ) : (
        <></>
      )}

      {proposalID && description ? CastVoteContainer() : <></>}

      {isComplete && (
        <Winner proposaID={proposalID} optionsList={optionsList} />
      )}
    </div>
  );
}
